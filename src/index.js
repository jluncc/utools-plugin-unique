import React from 'react';
import ReactDOM from 'react-dom/client';
import style from './index.css';
import MyUtil from './util';
import { Input, Button } from 'antd';
import 'antd/dist/reset.css';

const { TextArea } = Input;

class SourceTextArea extends React.Component {
  constructor(props) {
    super(props);
    this.state = { lineHeight: '20px' };
    this.handleChange = this.handleChange.bind(this);
    this.handleRef = this.handleRef.bind(this);
  }

  handleChange(event) {
    this.props.handleSourceTextChange(event.target.value);
  }

  handleRef(ref) {
    this.textAreaRef = ref;
  }

  render() {
    const { sourceText } = this.props;
    const { lineHeight } = this.state;
    const linesToShow = Math.max(30, sourceText.split('\n').length);
    // console.log("linesToShow: ", linesToShow);

    return (
      <div className={style.textareaContainer}>
        <div className={style.lineNumbers} style={{ height: `${parseFloat(lineHeight) * linesToShow}px` }}>
          {Array.from({ length: linesToShow }, (_, i) => <div key={i}>{i + 1}</div>)}
        </div>
        <div className={style.textareaWithLineNumbers}>
          <TextArea
            placeholder="请在该输入框粘贴待去重的文本"
            value={sourceText} onChange={this.handleChange}
            ref={this.handleRef}
          />
        </div>
      </div>
    );
  }
}

class ResultTextArea extends React.Component {
  constructor(props) {
    super(props);
    this.state = { lineHeight: '20px' };
    this.handleRef = this.handleRef.bind(this);
  }

  handleRef(ref) {
    this.textAreaRef = ref;
  }

  render() {
    const { resultText } = this.props;
    const { lineHeight } = this.state;
    const resultTextLines = Math.max(30, resultText.split('\n').length);

    return (
      <div className={style.textareaContainer}>
        <div className={style.lineNumbers} style={{ height: `${parseFloat(lineHeight) * resultTextLines}px` }}>
          {Array.from({ length: resultTextLines }, (_, i) => <div key={i}>{i + 1}</div>)}
        </div>
        <div className={style.textareaWithLineNumbers}>
          <TextArea
            placeholder="去重后的结果"
            value={resultText}
            ref={this.handleRef} 
          />
        </div>
      </div>
    );
  }
}

class CopyBtn extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className={style.sbtnline}>
        <div className={style.sbtnword}>
          <p>复制文本</p>
        </div>
        <div>
          <Button onClick={() => navigator.clipboard.writeText(this.props.sourceText)}>左</Button>
          <Button onClick={() => navigator.clipboard.writeText(this.props.resultText)}>右</Button>
        </div>
      </div>
    )
  }
}

class SortBtn extends React.Component {
  constructor(props) {
    super(props);
    this.handleSort = this.handleSort.bind(this)
  }
  handleSort(stype, stext) {
    this.props.handleSortText(stype, stext);
  }

  render() {
    return (
      <div className={style.sbtnline}>
        <div className={style.sbtnword}>
          <p>排序文本</p>
        </div>
        <div className={style.sbtn}>
            <Button onClick={() => this.handleSort('asc', this.props.sourceText)}>升</Button>
            <Button onClick={() => this.handleSort('desc', this.props.sourceText)}>降</Button>
        </div>
      </div>
    )
  }
}

class BtnArea extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className={style.center}>
        <CopyBtn sourceText={this.props.sourceText} resultText={this.props.resultText} />
        <SortBtn sourceText={this.props.sourceText} handleSortText={this.props.handleSortText} />
      </div>
    )
  }
}

class Wrapper extends React.Component {
  constructor(props) {
    super(props);
    this.handleSourceTextChange = this.handleSourceTextChange.bind(this);
    this.handleSortText = this.handleSortText.bind(this);
    this.state = {
      sourceText: '',
      resultText: ''
    }
  }

  componentDidMount() {
    window.utools.onPluginEnter(enter => {
      let payload = enter.payload;
      if (enter.type == 'over' && (payload !== null || payload !== undefined || payload !== '')) {
        this.handleSourceTextChange(payload);
      }
    })
  }

  handleSourceTextChange = (sourceText) => {
    this.setState({
      sourceText: sourceText,
      resultText: MyUtil.removeDuplicateLines(sourceText)
    })
  }

  handleSortText = (type, sourceText) => {
    let afterSortText = MyUtil.sortText(type, sourceText);
    this.setState({
      sourceText: afterSortText,
      resultText: MyUtil.removeDuplicateLines(afterSortText)
    })
  }

  render() {
    return (
      <div className={style.wrapper}>
        <SourceTextArea sourceText={this.state.sourceText}
          handleSourceTextChange={this.handleSourceTextChange} />
        <BtnArea sourceText={this.state.sourceText} resultText={this.state.resultText} 
          handleSortText={this.handleSortText} />
        <ResultTextArea resultText={this.state.resultText} />
      </div>
    )
  }
}

const root = ReactDOM.createRoot(document.getElementById('wrapper'));
root.render(<Wrapper />);
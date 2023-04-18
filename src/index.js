import React from 'react';
import ReactDOM from 'react-dom/client';
import style from './index.css';
import MyUtil from './util';


class SourceTextArea extends React.Component {
  constructor(props) {
    super(props);
    this.state = { lineHeight: '20px', linesToShow: 30 };
    this.handleChange = this.handleChange.bind(this);
    this.handleRef = this.handleRef.bind(this);
    this.calculateLinesToShow = this.calculateLinesToShow.bind(this);
  }

  componentDidMount() {
    const textArea = this.textAreaRef;
    const lineHeight = window.getComputedStyle(textArea).getPropertyValue('line-height');
    this.setState({ lineHeight });
  }

  handleChange(event) {
    const textArea = event.target;
    const lines = textArea.value.split('\n').length;
    const newLinesToShow = Math.max(this.state.linesToShow, lines);
    if (newLinesToShow !== this.state.linesToShow) {
      this.setState({ linesToShow: newLinesToShow });
    }
    this.props.handleSourceTextChange(event.target.value);
  }

  handleRef(ref) {
    this.textAreaRef = ref;
  }

  calculateLinesToShow() {
    const textArea = this.textAreaRef;
    const lineHeight = window.getComputedStyle(textArea).getPropertyValue('line-height');
    const height = parseInt(window.getComputedStyle(textArea).getPropertyValue('height'));
    const scrollbarWidth = textArea.offsetWidth - textArea.clientWidth;
    return Math.floor((height - scrollbarWidth) / parseFloat(lineHeight));
  }

  render() {
    const { sourceText } = this.props;
    const { lineHeight, linesToShow } = this.state;

    return (
      <div className={style.textareaContainer}>
        <div className={style.lineNumbers} style={{ height: `${parseFloat(lineHeight) * linesToShow}px`, position: 'relative' }}>
          {Array.from({ length: linesToShow }, (_, i) => <div key={i}>{i + 1}</div>)}
        </div>
        <div className={style.textareaWithLineNumbers} style={{ position: 'relative', display: 'inline-block' }}>
          <textarea
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

  componentDidMount() {
    const textArea = this.textAreaRef;
    const lineHeight = window.getComputedStyle(textArea).getPropertyValue('line-height');
    this.setState({ lineHeight });
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
        <div className={style.lineNumbers} style={{ height: `${parseFloat(lineHeight) * resultTextLines}px`, position: 'relative' }}>
          {Array.from({ length: resultTextLines }, (_, i) => <div key={i}>{i + 1}</div>)}
        </div>
        <div className={style.textareaWithLineNumbers} style={{ position: 'relative', display: 'inline-block' }}>
          <textarea
            placeholder="去重后的结果"
            defaultValue={resultText}
            // onChange={this.handleChange}
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
        <div>
          <p>复制文本</p>
        </div>
        <div>
          <button onClick={() => navigator.clipboard.writeText(this.props.sourceText)}>左</button>
          <button onClick={() => navigator.clipboard.writeText(this.props.resultText)}>右</button>
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
  handleSort(e) {
    this.props.handleSortText(e.target.getAttribute('stype'), e.target.getAttribute('stext'));
  }

  render() {
    return (
      <div className={style.sbtnline}>
        <div>
          <p>排序文本</p>
        </div>
        <div>
          <div>
            <button stype="asc" stext={this.props.sourceText} onClick={this.handleSort}>升</button>
            <button stype="desc" stext={this.props.sourceText} onClick={this.handleSort}>降</button>
          </div>
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
    // window.utools.onPluginEnter(enter => {
    //   // console.log("enter: ", enter);
    //   let payload = enter.payload;
    //   if (enter.type == 'over' && (payload !== null || payload !== undefined || payload !== '')) {
    //     this.setState({
    //       sourceText: payload,
    //       resultText: MyUtil.removeDuplicateLines(payload)
    //     })
    //   }
    // })
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
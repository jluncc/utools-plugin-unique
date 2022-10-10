import React from 'react';
import ReactDOM from 'react-dom/client';
import style from './index.css';
import MyUtil from './util';

class SourceTextArea extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this)
  }
  handleChange(event) {
    this.props.handleSourceTextChange(event.target.value);
  }

  render() {
    return (
      <div className={style.left}>
        <textarea rows="30" cols="45" placeholder="请在该输入框粘贴待去重的文本" 
          value={this.props.sourceText} onChange={this.handleChange}>
        </textarea>
      </div>
    )
  }
}

class ResultTextArea extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className={style.right}>
        <textarea rows="30" cols="45" placeholder="去重后的结果" defaultValue={this.props.resultText}>
        </textarea>
      </div>
    )
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
    window.utools.onPluginEnter(enter => {
      // console.log("enter: ", enter);
      let payload = enter.payload;
      if (enter.type == 'over' && (payload !== null || payload !== undefined || payload !== '')) {
        this.setState({
          sourceText: payload,
          resultText: MyUtil.removeDuplicateLines(payload)
        })
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
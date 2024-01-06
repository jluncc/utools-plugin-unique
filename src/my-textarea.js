import React from 'react';
import style from './index.css';
import { Input } from 'antd';

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
    const linesToShow = Math.max(30, sourceText.split('\n').length);

    return (
      <div className={style.textareaContainer}>
        <div className={style.lineNumbers}>
          {Array.from({ length: linesToShow }, (_, i) => <div key={i}>{i + 1}</div>)}
        </div>
        <div className={style.textareaWithLineNumbers}>
          <TextArea
            placeholder="请在该输入框粘贴待去重的文本"
            rows={30}
            value={sourceText} 
            onChange={this.handleChange}
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
    const resultTextLines = Math.max(30, resultText.split('\n').length);

    return (
      <div className={style.textareaContainer}>
        <div className={style.lineNumbers}>
          {Array.from({ length: resultTextLines }, (_, i) => <div key={i}>{i + 1}</div>)}
        </div>
        <div className={style.textareaWithLineNumbers}>
          <TextArea
            placeholder="去重后的结果"
            rows={30}
            value={resultText}
            ref={this.handleRef} 
          />
        </div>
      </div>
    );
  }
}

export {SourceTextArea, ResultTextArea};
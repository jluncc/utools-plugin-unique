import React from 'react';
import ReactDOM from 'react-dom/client';
import { Col, Row } from 'antd';
import MyUtil from './util';
import {SourceTextArea, ResultTextArea} from './my-textarea';
import {BtnArea} from './my-button';

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
  // 本地测试需注释utools函数 
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
      <div>
        <Row>
          <Col span={10} style={{padding: '1% 2%'}}>
            <SourceTextArea 
              sourceText={this.state.sourceText}
              handleSourceTextChange={this.handleSourceTextChange} 
            />
          </Col>
          <Col span={4} style={{padding: '1% 0%'}}>
            <BtnArea 
              sourceText={this.state.sourceText} 
              resultText={this.state.resultText} 
              handleSortText={this.handleSortText} 
            />
          </Col>
          <Col span={10} style={{padding: '1% 2%'}}>
            <ResultTextArea resultText={this.state.resultText} />
          </Col>
        </Row>
      </div>
    )
  }
}

const root = ReactDOM.createRoot(document.getElementById('wrapper'));
root.render(<Wrapper />);
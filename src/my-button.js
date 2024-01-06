import React from 'react';
import { Button, Col, Row } from 'antd';

class CopyBtn extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div 
        style={{ width: '100%' }}
        align="center"
      >
        <Row align="center">
          <p>复制文本</p>
        </Row>
        <Row>
          <Col span={12}>
            <Button onClick={() => navigator.clipboard.writeText(this.props.sourceText)}>左</Button>
          </Col>
          <Col span={12}>
            <Button onClick={() => navigator.clipboard.writeText(this.props.resultText)}>右</Button>
          </Col>
        </Row>
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
      <div         
        style={{ width: '100%' }}
        align="center"
      >
        <Row align="center">
          <p>排序文本</p>
        </Row>
        <Row>
          <Col span={12}>
            <Button onClick={() => this.handleSort('asc', this.props.sourceText)}>升</Button>
          </Col>
          <Col span={12}>
            <Button onClick={() => this.handleSort('desc', this.props.sourceText)}>降</Button>
          </Col>  
        </Row>
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
      <div>
        <Row style={{padding: '0% 2% 25% 2%'}}>
          <CopyBtn sourceText={this.props.sourceText} resultText={this.props.resultText} />
        </Row>
        <Row style={{padding: '0% 2% 25% 2%'}}>
          <SortBtn sourceText={this.props.sourceText} handleSortText={this.props.handleSortText} />
        </Row>
      </div>
    )
  }
}

export {BtnArea};
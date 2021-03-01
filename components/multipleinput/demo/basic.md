---
order: 0
title:
  zh-CN: 基本
  en-US: Basic
---

## zh-CN

输入多个，下拉显示输入的数据

## en-US

Enter multiple, drag to display the entered data

````jsx
import { MultipleInput,Button,Col,Row } from 'wmstool';

class App extends React.Component {
  state = { value: "aaa,bbb,ccc,aaa" }
  onChange=(value)=>{
     console.log('value',value)
    this.setState({value})
  }
  onClick=()=>{
  console.log('ddd',this.state.value)
  }
  render() {
    return (
      <Row>
      <Col span={16}> <MultipleInput value={this.state.value} onChange={this.onChange}/></Col>
      <Col span={6}><Button  type="primary" onClick={this.onClick}>查询</Button></Col>
      </Row>
    );
  }
}

ReactDOM.render(<App />, mountNode);
````



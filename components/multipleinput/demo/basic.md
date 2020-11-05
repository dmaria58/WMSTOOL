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
import { MultipleInput } from 'wmstool';

class App extends React.Component {
  state = { value: "aaa,bbb,ccc,aaa" }
  onChange=(value)=>{
    this.setState({value})
  }
  render() {
    return (
      <div>
        <MultipleInput value={this.state.value} onChange={this.onChange}/>
      </div>
    );
  }
}

ReactDOM.render(<App />, mountNode);
````



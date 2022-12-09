---
order: 1
title:
  zh-CN: 可以拖拽
  en-US: resizable
---

## zh-CN

右下角拖拽，使宽高同时变换

## en-US

右下角拖拽，使宽高同时变换

````jsx
import {ResizableCell,Input } from 'wmstool';

class App extends React.Component {
  state = {
     dataSource:[
       {width:100,height:100,content:<div>{'div'}</div>},
       {width:120,height:100,content:<Input  value={'Input'} />},
       {width:140,height:100,content:'string'}
       ]
  }
  onChange=(data)=>{
     this.setState({dataSource:data})
  }
  render() {
    return (
      <ResizableCell resize={'lower-right'} onChange={this.onChange} dataSource={this.state.dataSource} />
    );
  }
}

ReactDOM.render(<App />, mountNode);
````



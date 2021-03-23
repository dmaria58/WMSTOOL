---
order: 2
title:
  zh-CN: 拖拽底部
  en-US: resizable bottom
---

## zh-CN

拖拽底部边框，是容器变高

## en-US

拖拽底部边框，是容器变高

````jsx
import {ResizableCell,Input } from 'wmstool';

class App extends React.Component {
  state = {
     dataSource:[
       {height:100,content:<div>{'div'}</div>},
       {height:100,content:<Input  value={'Input输入框'} />},
       {height:100,content:'string'}
       ]
  }
  onChange=(data)=>{
     this.setState({dataSource:data})
  }
 
  render() {
    return (
      <ResizableCell resize={'bottom'} onChange={this.onChange} dataSource={this.state.dataSource} />
    );
  }
}

ReactDOM.render(<App />, mountNode);
````



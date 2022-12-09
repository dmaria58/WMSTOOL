---
order: 0
title:
  zh-CN: 右侧拖拽
  en-US: resizable
---

## zh-CN

react-resizable,可以拖拽右边的边框，使容器伸缩

## en-US

react-resizable,可以拖拽右边的边框，使容器伸缩

````jsx
import {ResizableCell,Input } from 'wmstool';

class App extends React.Component {
  state = {
     dataSource:[
       {width:100,content:<div>{'div'}</div>},
       {width:120,content:<Input  value={'Input'} />},
       {width:140,content:'string'}
       ]
  }
  onChange=(data)=>{
     this.setState({dataSource:data})
  }
 
  render() {
    return (
      <ResizableCell resize={'right'} onChange={this.onChange} dataSource={this.state.dataSource} />
    );
  }
}

ReactDOM.render(<App />, mountNode);
````



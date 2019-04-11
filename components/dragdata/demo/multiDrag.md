---
order: 1
title:
  zh-CN: 多级拖拽绑定数据
  en-US: Multilevel Basic DragData
---

## zh-CN

多级拖拽绑定数据

## en-US

Multilevel Basic DragData

````jsx
import { Dragdata,Icon,Popover,Input,Button,Select} from 'wmstool';
const STYPE={
  border: '1px dashed gray',
  padding: '0.5rem 1rem',
  marginBottom: '.5rem',
  backgroundColor: 'white',
  cursor: 'move',
}
const DATA=[
        {
          id: 1,
          text: 'aa',
          children:[{
           id: 4,
           text: 'aaa',
           showtext:<div style={STYPE} key="1-1">数据1<span>add-0-0</span></div>,
          },{
           id: 5,
           text: 'aaa',
           showtext:<div style={STYPE} key="1-2">数据2<span>add-0-1</span></div>,
          },{
           id: 6,
           text: 'aaa',
           showtext:<div style={STYPE} key="1-3">数据3<span>add-0-2</span></div>,
          },{
           id: 7,
           text: 'aaa',
           showtext:<div style={STYPE} key="1-4">数据4<span>add-0-3</span></div>,
          }]
        },
        {
          id: 2,
          text: 'bb',
          children:[{
          id: 8,
          text: 'bbb',            
          showtext:<div style={STYPE} key="2">数据5<span>add-1-0</span></div>            
          }]
        },
        {
          id: 3,
          text: 'cc',
          children:[{
          id: 9,
          text: 'ccc',            
          showtext:<div style={STYPE} key="3">数据6<span>add-2-0</span></div>           
          }]
        }
      ]; 
    
class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: DATA,
    } 
  }  
  getChangeSource=(data)=>{
    // console.log("数据改变了",data)
  }
  render() {
    return (
      <div>
        <Dragdata dataSource = {this.state.data} getChangeSource={(data)=>this.getChangeSource(data)}/>
      </div>
    )
  }
}

ReactDOM.render(<App />, mountNode);
````


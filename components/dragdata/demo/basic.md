---
order: 0
title:
  zh-CN: 拖拽绑定数据
  en-US: Basic DragData
---

## zh-CN

拖拽绑定数据

## en-US

拖拽绑定数据

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
          text: 'hello',
          showtext:<div style={STYPE} key="1">第一条数据<span>add</span></div>
        },
        {
          id: 2,
          text: 'luck',
          showtext:<div style={STYPE} key="2">第二条数据<span>delete</span></div>
        },
        {
          id: 3,
          text: 'good',
          showtext:<div style={STYPE} key="3">第三条数据<span>test</span></div>
        }
      ];
const DATA2=[
        {
          id: 1,
          text: '34',
          showtext:<div style={STYPE} key="1">第a条数据<span>add</span></div>
        },
        {
          id: 6,
          text: '444',
          showtext:<div style={STYPE} key="2">第b条数据<span>delete</span></div>
        },
        {
          id: 7,
          text: '4445',
          showtext:<div style={STYPE} key="3">第c条数据<span>test</span></div>
        },
        {
          id: 8,
          text: '4445',
          showtext:<div style={STYPE} key="3">第c条数据<span>test</span></div>
        }
      ];      
class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: DATA,
    } 
  } 
  changeList=()=>{
    this.setState({data:DATA2})
  } 
  getChangeSource=(data)=>{
    console.log("数据改变了",data)

  }
  render() {
    return (
      <div>
        <Dragdata dataSource = {this.state.data} getChangeSource={(data)=>this.getChangeSource(data)}/>
        <Button onClick={this.changeList}>change</Button>
      </div>
    )
  }
}

ReactDOM.render(<App />, mountNode);
````


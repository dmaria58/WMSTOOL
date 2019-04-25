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
const Option = Select.Option;
const STYPE={
  border: '1px dashed gray',
  padding: '0.5rem 1rem',
  marginBottom: '.5rem',
  backgroundColor: 'white',
  cursor: 'move',
}
    
class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data:this.getData(),
    } 
  } 
 
  getData=()=>{
    return([
      {
          id: 1,
          text: 'aa',
          clickId:1,
          children:[{
           id: 4,
           text: 'aaa',
           className:"drag-item",
           showtext:<div style={STYPE} key="1-1">数据1<span>add-0-0</span></div>,
          },{
            id: Math.random(),
            isNotDrag: true,
            showtext:
            <div className="select-condition-relationa">
              <Select value={"AND"} style={{ width: 80 }} >
                <Option key={0} value="AND">AND</Option>
                <Option key={1} value="OR">OR</Option>
              </Select>
            </div>
          },{
           id: 5,
           text: 'aaa',
           showtext:<div style={STYPE} key="1-2">数据2<span>add-0-1</span></div>,
          },]
        },
        {
          id: 2,
          text: 'bb',
          className:"drag-item",
          children:[{
          id: 8,
          text: 'bbb',            
          showtext:<div style={STYPE} key="2">数据5<span>add-1-0</span></div>            
          }]
        },{
            id: Math.random(),
            isNotDrag: true,
            showtext:
            <div className="select-condition-relationa">
              <Select value={"AND"} style={{ width: 80 }} >
                <Option key={0} value="AND">AND</Option>
                <Option key={1} value="OR">OR</Option>
              </Select>
            </div>
        },
        {
          id: 3,
          onClick:this.onClick,
          text: 'cc',
          className:"drag-item",
          children:[{
          id: 9,
          text: 'ccc',            
          showtext:<div style={STYPE} key="3">数据6<span>add-2-0</span></div>           
          }]
        }
    ])
  } 
   onClick=(id)=>{
    console.log("选中children",id)
  }
  getChangeSource=(data)=>{
    let newdata=data.filter(item=>{
      return !item.isNotDrag
    })
    console.log("数据改变了",data,newdata)
  }
  render() {
    return (
      <div>
        <Dragdata dataSource = {this.state.data}   onClick={this.onClick} getChangeSource={(data)=>this.getChangeSource(data)}/>
      </div>
    )
  }
}

ReactDOM.render(<App />, mountNode);
````


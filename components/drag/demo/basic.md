---
order: 0
title: 
  zh-CN: 基本
  en-US: Basic Drag
---

## zh-CN

拖拽

## en-US

拖拽

```jsx
import { Drag,Button,Dragdata } from 'wmstool';

const DragContainer = Drag.Container;
const DragCard = Drag.Card;
const STYPE={
  border: '1px dashed gray',
  padding: '0.5rem 1rem',
  marginBottom: '.5rem',
  backgroundColor: 'white',
  cursor: 'move',
  display:'inline-block',
  width:"50%",
  float:'right',
}
const STYPE2={
  border: '1px dashed gray',
  padding: '0.5rem 1rem',
  marginBottom: '.5rem',
  backgroundColor: 'white',
  cursor: 'move',
}
const Data=[
  {id:11,value:'aaa'},
  {id:22,value:'bbb'},
  {id:33,value:'ccc'},
  {id:44,value:'ddd'},
  {id:55,value:'eee'},
  {id:66,value:'fff'},
  {id:77,value:'ggg'},
]

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state={
      data:this.getData("please")
    }
  }
  getData=(text)=>{
    return(
      [
        {
          id: 100,
          text: 'hello',
          children:[{
           id: 1001,
           text: 'hello-1',
           showtext:<div style={STYPE2} key="1-0">
            <DragCard 
                  id={1001} 
                  text={'1-0'}
                  onChange={this.onChange}
                />
            </div>,
          },{
           id: 1002,
           text: 'hello-2',
           showtext:<div style={STYPE2} key="1-1"> 
           <DragCard 
                  id={1002} 
                  text={'1-1'}
                  onChange={this.onChange}
                />
            </div>,
          },]
        }, {
          id: 200,
          text: 'hi',
          children:[{
          id: 2001,
          text: 'hi-1',            
          showtext:
          <div style={STYPE2} key="1-1"> 
           <DragCard 
                  id={2001} 
                  text={text}
                 onChange={this.onChange} 
                />  
          </div>
          },]}
    ]
    )
  }
  getChangeSource=(data)=>{
    console.log("数据改变了",data)
  }
  addBlock=()=>{
    console.log("增加一个空模块",)
  }
  onChange=(id,dragItem)=>{
    console.log("拖拽成功返回的数据ID",id,dragItem)
    if(id===2001){
     this.setState({
      data:this.getData(dragItem.text)
      })
    }
  }
  render() {
    return (
      <DragContainer >
          <div style={{ display:'inline-block',width:"50%"}}>
            <Button onClick={this.addBlock}>AddBlock </Button>
            <Dragdata dataSource = {this.state.data}  ChangeSource={(data)=>this.getChangeSource(data)}/>
          </div>
          <div style={STYPE}>
            {
              Data.map(item=>(
                <DragCard 
                  key={item.id}
                  id={item.id}
                  text={item.value}
                  onChange={this.onChange}
                />
              ))
            }
          </div>
      </DragContainer>
    )
  }
}

ReactDOM.render(<App/>, mountNode);
```



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
import { Drag,Button } from 'wmstool';

const DragContainer = Drag.Container;
const DragCard = Drag.Card;
const DragItem = Drag.Item;

const STYPE={
  border: '1px dashed gray',
  padding: '0.5rem 1rem',
  marginBottom: '.5rem',
  backgroundColor: 'white',
  cursor: 'move',
}

const cardStyle = {
  border: '1px solid #000',
  padding: '20px',
  marginBottom: '20px',
  // backgroundColor: 'white',
  // cursor: 'move',
}

class App extends React.Component {
  state = {
    dataSource : {
        a:[{id:1},{id:2}],
        b:[{id:3},{id:4}],
        c:[{id:5},{id:6}],
      }
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
      dataSource: {
         a:[{id:1},{id:2},{id:3},{id:4}],
          b:[{id:5},{id:6}],
          c:[{id:7},{id:8}],
      }
    })
    },1000)
  }

  onChange = (dataSource) =>{
    this.setState({
      dataSource
    })
  }

  onReset = () => {
    this.store.reset();
  }
  render() {
    return (
      <DragContainer type="teset" dragType="move" getStore={store => this.store = store} dataSource={this.state.dataSource} onChange={this.onChange}>
        <Button onClick={this.onReset} >reset</Button>
         <DragCard
            component="div"
            style={cardStyle}
            canDrop={false}
            renderItem={(value,index,monitor) =>  <div style={Object.assign({opacity:monitor.isDragging ? 0: 1},STYPE)} >{monitor.isDragging ? 'isDragging':JSON.stringify(value)}</div>}
            name="a" ></DragCard>
        <DragCard 
            component="div"
            style={cardStyle}
            name="b"
            canDrag={false}
            renderItem={(value) =>  <div style={STYPE} >{JSON.stringify(value)}</div>}
            ></DragCard>
         <DragCard 
            component="div"
            style={cardStyle}
            name="c"
             canDrop={(props,monitor) => {
               return monitor.getItem().originName === 'a'||  monitor.getItem().originName === 'c'
             }}
            renderItem={(value,index,monitor) =>  <div style={Object.assign({opacity:monitor.isDragging ? 0: 1},STYPE)} >{JSON.stringify(value)}</div>}
            />
      </DragContainer>
    )
  }
}

ReactDOM.render(<App/>, mountNode);
```



---
order: 1
title: 
  zh-CN: DragItem
  en-US: DragItem
---

## zh-CN

DragItem

## en-US

DragItem

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
}

class App extends React.Component {
  state = {
    dataSource : {
        a:[{id:1},{id:2}],
        b:[{id:3},{id:4}]
      }
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
      dataSource: {
         a:[{id:1},{id:2},{id:3},{id:4}],
          b:[{id:5},{id:6}]
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
      <DragContainer type="teset2" getStore={store => this.store = store} dataSource={this.state.dataSource} onChange={this.onChange}>
        <Button onClick={this.onReset} >reset</Button>
         <DragCard
            component="div"
            style={cardStyle}
            name="a" >
            {
              (values) => (
                values.map((value,index)=> (
                  <DragItem id={value.id}
                  index={index}    
                  name="a"
                  key={value.id}
                  data={value}>
                {(value,index,monitor) =>  <div style={Object.assign({opacity:monitor.isDragging ? 0: 1},STYPE)} >{monitor.isDragging ? 'isDragging':JSON.stringify(value)}</div>}
                </DragItem>
                ))
              )
            }
            
            </DragCard>
      </DragContainer>
    )
  }
}

ReactDOM.render(<App/>, mountNode);
```
import * as React from 'react';
import PropTypes from 'prop-types'
import { findDOMNode } from 'react-dom'
import { DragSource, DropTarget ,DragDropContext} from 'react-dnd'
import update from 'immutability-helper'
import HTML5Backend from 'react-dnd-html5-backend'
export interface DataList{
  id?:any;
  showtext?:any;
  text?:any;
}
export interface DdataProps {  
  dataSource?:Array<DataList>;
  getChangeSource?:(h:any)=>any;
}  
export interface DdataState{
  cards?:Array<DataList>;
}
const ItemTypes={
  CARD: 'card',
}
const cardSource = {
  beginDrag(props:any) {
    return {
      id: props.id,
      index: props.index,
    }
  },
}

const cardTarget = {
  hover(props:any, monitor:any, component:any) {
    const dragIndex = monitor.getItem().index

    const hoverIndex = props.index

    if (dragIndex === hoverIndex) {
      return
    }

    const hoverBoundingRect = findDOMNode(component).getBoundingClientRect()

    const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2

    const clientOffset = monitor.getClientOffset()

    const hoverClientY = clientOffset.y - hoverBoundingRect.top

    if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
      return
    }

    if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
      return
    }

    props.moveCard(dragIndex, hoverIndex)

    monitor.getItem().index = hoverIndex
  },
}

@DropTarget(ItemTypes.CARD, cardTarget, (connect:any)=> ({
  connectDropTarget: connect.dropTarget(),
}))
@DragSource(ItemTypes.CARD, cardSource, (connect:any, monitor:any) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging(),
}))
export  class Card extends React.Component <any> {
  static propTypes = {
    connectDragSource: PropTypes.func.isRequired,
    connectDropTarget: PropTypes.func.isRequired,
    index: PropTypes.number.isRequired,
    isDragging: PropTypes.bool.isRequired,
    id: PropTypes.any.isRequired,
    //text: PropTypes.string.isRequired,
    moveCard: PropTypes.func.isRequired,
  }

  render() {
    const {
      //text,
      id,
      isDragging,
      connectDragSource,
      connectDropTarget,
    } = this.props
    const opacity = isDragging ? 0 : 1

    return connectDragSource(
      connectDropTarget(<div style={{opacity }} key={id} >{this.props.children}</div>),
    )
  }
}

@DragDropContext(HTML5Backend)
export default class Dragdata extends React.Component <DdataProps,DdataState> {
  constructor(props: DdataProps) {
    super(props)
    this.moveCard = this.moveCard.bind(this)
    this.state = {
      cards: props.dataSource?props.dataSource:[]
    }
  }
  componentWillReceiveProps(nextProps:any) {
    if(nextProps.dataSource != this.props.dataSource){
      this.setState({cards:nextProps.dataSource})
    }
  }
  moveCard(dragIndex:any, hoverIndex:any) {
    let  cards  = this.state.cards;
    let dragCard:any;
    if(cards && cards[dragIndex]){
      dragCard = cards[dragIndex];
    }
    this.setState(
      update(this.state, {
        cards: {
          $splice: [[dragIndex, 1], [hoverIndex, 0, dragCard]],
        },
      }),()=>{
      let cardsdata = this.state.cards;
      if(this.props.getChangeSource){
        this.props.getChangeSource(cardsdata)
      }      
      }
    )
  }
  render() {
    let cardsdata = this.state.cards;
    return (
      <div >
        {cardsdata && cardsdata.length && cardsdata.map((list:any, i:number) => (
          <Card key={list.id} index={i} id={list.id} moveCard={this.moveCard}>{list.showtext}</Card>
        ))}
      </div>
    )
  }
}

  
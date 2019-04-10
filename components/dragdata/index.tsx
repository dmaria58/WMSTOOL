import * as React from 'react';
import PropTypes from 'prop-types'
import { findDOMNode } from 'react-dom'
import { DragSource, DropTarget } from 'react-dnd'
import update from 'immutability-helper'
import WithDragDropContext from '../withdrag-dropcontext';
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
    let dragLength = (dragIndex+"").split("-").length as number;
    let hoverLength = (hoverIndex+"").split("-").length as number;
    if (dragIndex == hoverIndex) {
      return;
    }
    //不同层级之间不允许拖拽
    if(dragLength != hoverLength) return 

    const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();

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

class Dragdata extends React.Component <DdataProps,DdataState> {
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
    let  cards  = this.state.cards?this.state.cards:[];
    let rdata = this.getChangeDragdata(dragIndex,hoverIndex,cards);
    this.setState({cards:rdata},()=>{
        let cardsdata = this.state.cards;
        if(this.props.getChangeSource){
          this.props.getChangeSource(cardsdata)
        }   
    })
  }
  getChangeDragdata = (dragIndexs:any,hoverIndexs:any,cards:any) =>{   
    let rdata:any;
    rdata = update(cards,{$splice:[]});
    let indexlist = (dragIndexs+"").split("-") as any;
    let addlist = (hoverIndexs+"").split("-") as any;
    let ddata="",addata="",dledata="" as string;
    //删除位点
    indexlist.map((k:number,j:number)=>{
      if(j == 0){
        dledata = ddata;
        ddata = ddata + "["+k+"]"
      }
      else{
        if(eval("rdata"+ddata+".children")){
          ddata= ddata+".children"
        }
        dledata = ddata;
        ddata = ddata + "["+k+"]";
      }

    })
    let list = eval("rdata"+ddata+";") as any;
    if(!dledata){
      eval("rdata"+".splice("+indexlist[indexlist.length-1]+",1)");
    }else{
      eval("rdata"+dledata+".splice("+indexlist[indexlist.length-1]+",1)");
    } 
    //新增位点
    addlist.map((k:number,j:number)=>{
        if(j<addlist.length-1){
          addata = addata + "["+k+"]"; 
          if(eval("rdata"+addata+".children")){
            addata= addata+".children"
          }  
        }                           
    })
    if(!list){return}
    if(!addata){
      eval("rdata"+".splice("+addlist[addlist.length-1]+",0,list)");
    }else{
      eval("rdata"+addata+".splice("+addlist[addlist.length-1]+",0,list)");
    }   
    return rdata;
  }
  getAllCards = (cardsdata:any,ischild:any) =>{
    return cardsdata.map((list:any, i:number) => {
              if(list){
                let myindex = ischild !== false?ischild+"-"+i:i as any;
                if(list.children){
                  return  <Card key={list.id} index={myindex} id={list.id} moveCard={this.moveCard}>
                            <div className="wmstool_drag_fdiv">{this.getAllCards(list.children,myindex)}</div>
                          </Card>
                }
                else if(ischild === false){
                  return  <Card key={list.id} index={myindex} id={list.id} moveCard={this.moveCard}>
                            <div className="wmstool_drag_fdiv">{list.showtext}</div>
                          </Card>                  
                } 
                else{
                  return  <Card key={list.id} index={myindex} id={list.id} moveCard={this.moveCard}>
                            {list.showtext}
                          </Card>
                }
              }             
           })
  }
  render() {
    let cardsdata = this.state.cards;
    return (
      <div >
        {cardsdata && cardsdata.length && this.getAllCards(cardsdata,false)}
      </div>
    )
  }
}
export default WithDragDropContext(Dragdata)

  
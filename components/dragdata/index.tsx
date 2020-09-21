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
  clickId?:any;
  isNotDrag?:boolean;
}
export interface DdataProps {  
  dataSource?:Array<DataList>;
  getChangeSource?:(h:any)=>any;
  type?:string;
  onClick?:(h:any)=>any;
}  
export interface DdataState{
  cards?:Array<DataList>;
  type?:string;
  clickId?:any;
}
const cardSource = {
  beginDrag(props:any) {
    return {
      id: props.id,
      index: props.index,
      isNotDrag: props.isNotDrag,
    }
  },
}
let indexChildren =0 as any;
const cardTarget = {
  hover(props:any, monitor:any, component:any) {
    const isNotDrag=monitor.getItem().isNotDrag
    const dragIndex = monitor.getItem().index
    const hoverIndex = props.index
    if (isNotDrag==true) { 
      return ;
    } 
    let dragLength = (dragIndex+"").split("-").length as number;
    let hoverLength = (hoverIndex+"").split("-").length as number;
    const findnode = findDOMNode(component) as HTMLElement;
    const hoverBoundingRect = findnode.getBoundingClientRect();

    const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

    const clientOffset = monitor.getClientOffset();

    const hoverClientY = clientOffset.y - hoverBoundingRect.top;
  
    if (dragIndex == hoverIndex) {
      return;
    }
    //拖拽的层级与触发的层级不一样，但是触发的子层与拖拽的子层是同一层级可以拖拽
    if(dragLength-1 == hoverLength 
      && (dragIndex+"").split("-")[0] != (hoverIndex+"").split("-")[0]&&(!props.isNotDrag)){
      props.moveCard(dragIndex, hoverIndex);
      monitor.getItem().index = hoverIndex+"-"+indexChildren;
      return;
    }
    
    //不同层级之间不允许拖拽
    if (dragLength != hoverLength) { return } 
   
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
@DropTarget((props:any) => props.type, cardTarget, (connect:any)=> ({
  connectDropTarget: connect.dropTarget(),
}))
@DragSource((props:any) => props.type, cardSource, (connect:any, monitor:any) => ({
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
    moveCard: PropTypes.func.isRequired,
    className: PropTypes.string.isRequired,
  }

  render() {
    const {
      id,
      isDragging,
      connectDragSource,
      connectDropTarget,
      className,
    } = this.props
    const opacity = isDragging ? 0 : 1
    return connectDragSource(
      connectDropTarget(<div className={className}   style={{opacity }} key={id} >{this.props.children}</div>),
    )
  }
}

class Dragdata extends React.Component <DdataProps,DdataState> {
  constructor(props: DdataProps) {
    super(props)
    this.moveCard = this.moveCard.bind(this)
    this.state = {
      cards: props.dataSource?props.dataSource:[],
      type: props.type ? props.type : "card",
      clickId:null,
    }
    this.onClick= this.onClick.bind(this)
  }
  componentWillReceiveProps(nextProps:any) {
    if(nextProps.dataSource != this.props.dataSource){
      this.setState({cards:nextProps.dataSource})
    }
  }
  moveCard(dragIndex:any, hoverIndex:any,) {
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
    // 删除位点
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
    // 新增位点-层级相同
    if(indexlist.length == addlist.length){
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
    }
    //新增位点-层级不同，往上移，增加children末尾
    else if(indexlist[0] > addlist[0]&&list){
      indexChildren = rdata[addlist[0]].children.length;
      rdata[addlist[0]].children.push(list); 
    }
    //新增位点-层级不同，往下移，增加children首位
    else if(indexlist[0] < addlist[0]&&list){
      indexChildren = 0;
      rdata[addlist[0]].children.unshift(list)
    }
    return rdata;
  }
  onClick=(clickId:any)=>{
    let id=this.state.clickId
    if(this.props.onClick){
      this.setState({
        clickId:clickId==id?null:clickId,
      })
      this.props.onClick(clickId==id?null:clickId)
    }
  }
  getAllCards = (cardsdata: any, ischild: any, type: string) => {
    return cardsdata.map((list: any, i: number) => {
      let className=list.clickId&&this.state.clickId==list.clickId?"wmstool_drag_fdiv wmstool_drag_fdiv_click":"wmstool_drag_fdiv"
      if (list) {
        let myindex = ischild !== false ? ischild + "-" + i : i as any;
        if (list.children) {
          return <Card clickId={list.clickId} className={list.className || ""} type={type} isNotDrag={list.isNotDrag || false}
            key={list.id} index={myindex} id={list.id} moveCard={this.moveCard}>
            <div onClick={this.onClick.bind(this,list.clickId)} className={className}>{this.getAllCards(list.children, myindex, type)}</div>
          </Card>
        }
        else if (ischild === false) {
          return <Card  className={list.className || ""} type={type} isNotDrag={list.isNotDrag || false}
            key={list.id} index={myindex} id={list.id} moveCard={this.moveCard}>
            <div  onClick={this.onClick.bind(this,list.clickId)}  className={className}>{list.showtext}</div>
          </Card>
        }
        else {
          return <Card  className={list.className || ""} type={type} isNotDrag={list.isNotDrag || false}
            key={list.id} index={myindex} id={list.id} moveCard={this.moveCard}>
            <div  onClick={this.onClick.bind(this,list.clickId)} >{list.showtext}</div>
          </Card>
        }
      }
    })
  }
  render() {
    let cardsdata = this.state.cards;
    let type=this.state.type||"card"
    return (
      <div >
        {cardsdata && cardsdata.length && this.getAllCards(cardsdata,false,type)}
      </div>
    )
  }
}
export default WithDragDropContext(Dragdata)

  
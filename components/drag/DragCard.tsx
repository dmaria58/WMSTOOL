import * as React from 'react';
import PropTypes from 'prop-types';
import { DragSource,DropTarget} from 'react-dnd'
import ItemTypes from './ItemTypes'
export interface SourceBoxProps {
  id: number
  text?:any;
  isChange: boolean
  onChange?:(h:any)=>any;
}
const sourceSpec  = {
  beginDrag(props:any) {
    console.log("beginDrag",props)
    return {
     dragItem:props
    }
  },
}
const targetSpec ={
  drop(props:any, monitor:any,){
    let targetItem= monitor.getItem()
    console.log("targetSpec",targetItem.dragItem)
    props.onChange?props.onChange(props.id,targetItem.dragItem):""
  },
}
@DragSource(ItemTypes.BOX, sourceSpec , (connect:any, monitor:any) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging(),
}))
@DropTarget(ItemTypes.BOX, targetSpec, (connect:any)=> ({
  connectDropTarget: connect.dropTarget(),
}))

class DragCard extends React.Component<any>  {
  static propTypes = {
    connectDragSource: PropTypes.func.isRequired,
    connectDropTarget: PropTypes.func.isRequired,
    isDragging: PropTypes.bool.isRequired,
    id: PropTypes.any.isRequired,
  }
  render() {
    const {
      id,
      text,
      isDragging,
      connectDragSource,
      connectDropTarget,
    } = this.props
    const opacity = isDragging ? 0 : 1
    return connectDragSource(
      connectDropTarget(<div className="drag-card-main" style={{ opacity }} key={id} >{text}</div>),
    )
  }
}
export default DragCard

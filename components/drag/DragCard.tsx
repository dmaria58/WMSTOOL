import * as React from 'react';
import PropTypes from 'prop-types';
import { DragSource,DropTarget} from 'react-dnd'
export interface SourceBoxProps {
  id: number
  text?:any;
  message?:object;
  isChange: boolean
  onChange?:(h:any)=>any;
}
const sourceSpec  = {
  beginDrag(props:any) {
    return {
     dragItem:props
    }
  },
}
const targetSpec ={
  drop(props:any, monitor:any,){
    let targetItem= monitor.getItem()
    props.onChange?props.onChange(props,targetItem.dragItem):""
  },
}
@DragSource((props:any) => props.type, sourceSpec , (connect:any, monitor:any) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging(),
}))
@DropTarget((props:any) => props.type, targetSpec, (connect:any)=> ({
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
      className,
    } = this.props
    const opacity = isDragging ? 0 : 1
    return connectDragSource(
      connectDropTarget(<div className={`${className} drag-card-main`} style={{ opacity }} key={id} >{text}</div>),
    )
  }
}
export default DragCard

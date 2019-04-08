import * as React from 'react';
import { findDOMNode } from 'react-dom';
import PropTypes from 'prop-types';
import Store from './store'
import {DragSource, DropTarget} from 'react-dnd';
import { withDragType } from './withDragDropContext'
const noop = () => {};

type childrenProps = {
  isDragging?: boolean,
  isOver?: boolean,
  isOverCurrent?: boolean;
}

export interface DragItemProps {
  canDrag : boolean | ((props : any, monitor : any) => boolean);
  beginDrag?: (props : ItemProps, monitor : any, component : React.ReactNode) => any;
  endDrag?: (props : ItemProps, monitor : any, component : React.ReactNode) => any;
  canDrop?: boolean | ((props : any, monitor : any) => boolean);
  isDragging?: (props : ItemProps, monitor : object) => boolean;
  hover?: (props : ItemProps, monitor : any, component : React.ReactNode) => any;
  drop? : (props : ItemProps, monitor : any, component : React.ReactNode) => any;
  id : string | number;
  index : number;
  data : object;
  name : string;
  children : (data : any, index : number, childrenProps: childrenProps) => React.ReactNode;

}

interface ItemProps {
  canDrag : boolean | ((props : any, monitor : any) => boolean);
  beginDrag?: (props : DragItemProps, monitor : any, component : React.ReactNode) => any;
  endDrag?: (props : DragItemProps, monitor : any, component : React.ReactNode) => any;
  canDrop?: boolean | ((props : any, monitor : any) => boolean);
  isDragging?: (props : DragItemProps, monitor : object) => boolean;
  hover?: (props : DragItemProps, monitor : any, component : React.ReactNode) => any;
  drop? : (props : DragItemProps, monitor : any, component : React.ReactNode) => any;
  children : (data : any, index : number | undefined, childrenProps: childrenProps) => React.ReactNode;
  data : any;
  index : number;
  dragging?: boolean;
  isOver?: boolean;
  isOverCurrent?:boolean;
  connectDragSource?: (data : any) => any;
  connectDropTarget?: (data : any) => any;
  id : any;
  name : any;
  store : Store;
}

const source = {
  canDrag(props : any, monitor : any) {
    if (typeof props.canDrag === 'function') {
      return props.canDrag(props, monitor)
    }
    return props.canDrag
  },

  isDragging(props : any, monitor : any) {
    return props.isDragging(props, monitor);
  },

  beginDrag(props : any, monitor : any,component: React.ReactNode) {
    const item = {
      id: props.id,
      name: props.name,
      data: props.data,
      index: props.index,
      itemType: monitor.getItemType()
    }
    return item
  },

  endDrag(props : any, monitor : any, component : React.ReactNode) {
    if (props.endDrag && typeof props.endDrag === 'function') {
      return props.endDrag(props, monitor, component)
    }
    let result = monitor.getDropResult() || {};
    if (result.moved) {
      props.store.confirm();
    }else {
      props.store.fallback();
    }
  }
}

const target = {
  canDrop(props : DragItemProps, monitor : any) {
    if (typeof props.canDrop === 'function') {
      return props.canDrop(props, monitor)
    }
    if(props.canDrop === undefined) return true;
    return props.canDrop
  },

  hover(props : ItemProps, monitor : any, component : any) {
    if (props.hover && typeof props.hover === 'function') {
      props.hover(props, monitor, component);
      return;
    }
    if (!monitor.canDrop()) {
      return;
    }
    // 默认 drop
    const item = monitor.getItem();
    let hoverIndex = props.index;
    const dragIndex = item.index;

    const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();
    const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

    const clientOffset = monitor.getClientOffset();
    const hoverClientY = clientOffset.y - hoverBoundingRect.top;

    
    if (item.name === props.name) {
      if (dragIndex === hoverIndex) {
        return
      }
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return
      }
  
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return
      }  
    }else {
      if (hoverClientY < hoverMiddleY) {
        hoverIndex = hoverIndex - 1;
      }else {
        hoverIndex = hoverIndex + 1;
      }
    };
    hoverIndex = hoverIndex < 0 ? 0: hoverIndex;
    props
      .store
      .move(item, {
        id: props.id,
        name: props.name,
        data: props.data,
        index: hoverIndex
      });
      monitor.getItem().name = props.name   
      monitor.getItem().index = hoverIndex   
  },

  drop(props : ItemProps, monitor : any, component : any) {
    if (props.drop && typeof props.drop === 'function')  {
      return props.drop(props,monitor,component);
    }
    return { moved: true }
  }
}

class Item extends React.Component < ItemProps > {

  renderChildren = () => {
    const {data, index, dragging,isOver,isOverCurrent, children} = this.props;
    return children(data, index, {isDragging: dragging, isOver, isOverCurrent})
  }
  render() {
    const {connectDragSource, connectDropTarget} = this.props;
    return connectDragSource && connectDropTarget && connectDropTarget(connectDragSource(this.renderChildren()))
  }
}

export default class DragItem extends React.PureComponent < DragItemProps > {
  static contextTypes = {
    store: PropTypes.object,
    dragType: PropTypes.dragType
  }

  static defaultProps = {
    isDragging(props : DragItemProps, monitor : any) {
      return monitor
        .getItem()
        .id === props.id
    },
    canDrag:true,
    canDrop: true,
  };
  Item = withDragType(DragSource,this.context.dragType,source, (connect : any, monitor : any) => ({
    connectDragSource: connect.dragSource(),
    dragging: monitor.isDragging()
  }))(withDragType(DropTarget,this.context.dragType,target, (connect : any, monitor : any) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    isOverCurrent: monitor.isOver({shallow: true}),
    canDrop: monitor.canDrop(),
    itemType: monitor.getItemType()
  }))(Item))
  store : any;
  unsubscribe : () => any;
  constructor(props : DragItemProps, context : {
    store: object;
  }) {
    super(props, context);
    this.store = context.store;
  }
  render() {
    const {
      ...rest
    } = this.props;
    const Com = this.Item;
    return <Com {...rest} store={this.store}/>
  }
}
import * as React from 'react';
import PropTypes from 'prop-types';
import DragItem,{DragItemProps} from './DragItem';
import {DropTarget} from 'react-dnd';
import { withDragType } from './withDragDropContext'
import { omit } from './utils';
interface DragCardProps {
  name : string;
  component :React.ReactType;
  canDrag : boolean | ((props : any, monitor : any) => boolean);
  beginDrag?: (props : DragItemProps, monitor : any, component : React.ReactNode) => any;
  endDrag?: (props : DragItemProps, monitor : any, component : React.ReactNode) => any;
  canDrop?: boolean | ((props : any, monitor : any) => boolean);
  isDragging?: (props : DragItemProps, monitor : object) => boolean;
  hover?: (props : DragItemProps, monitor : any, component : React.ReactNode) => any;
  drop? : (props : DragItemProps, monitor : any, component : React.ReactNode) => any;
  onChange : (value : any) => any;
  children : (values : object[], props: DragCardProps) => any;
  renderItem : (record : object, index : number) => any;
  connectDropTarget: any;
};

const omitKeys = ['name','component','canDrag',
'beginDrag','endDrag','canDrop','isDragging',
'hover','drop','onChange','children','renderItem','connectDropTarget']

const target = {
  canDrop(props : any, monitor : any) {
    if (typeof props.canDrop === 'function') {
      return props.canDrop(props, monitor)
    }
    if (props.canDrop === undefined) 
      return true;
    return props.canDrop
  },

  hover(props : any, monitor : any, component : React.ReactNode) {
    props.hover && props.hover(props, monitor, component)
  },

  drop(props : any, monitor : any, component : any) {
    if (!monitor.canDrop()) {
      return
    }
    const item = monitor.getItem();
    component.context && component
      .context
      .store
      .move(item, {
        name: props.name,
        index: props.index
      });
      return { moved: true }
  }
}

class DragableCard extends React.PureComponent < DragCardProps > {
  static defaultProps = {
    canDrag: true,
    canDrop: true,
    component: 'div',
    children: (values: any[],props: DragCardProps) => (
      values.map((value : any, index : number) => <DragItem
          id={value.id}
          index={index}    
          name={props.name}
          key={value.id}
          data={value}
          canDrag={props.canDrag}
          beginDrag={props.beginDrag}
          endDrag={props.endDrag}
          canDrop={props.canDrop}
          isDragging={props.isDragging}
          hover={props.hover}
          drop={props.drop}
          >
          {props.renderItem}
        </DragItem>)
    )
  };
  static contextTypes = {
    store: PropTypes.object,
    dragType: PropTypes.string,
  }
  store : any;
 
  unsubscribe : () => any;
  constructor(props : DragCardProps, context : {
    store: object;
  }) {
    super(props, context);
    this.store = context.store;
    this.state = {
      value: this.store[props.name]
    };
    let prevData = this.store.get(props.name);
    this.unsubscribe = this
      .store
      .subscribe((n : string) => {
        if (n === props.name || n === '*') {
          if (this.store.get(props.name) !== prevData) {
            props.onChange && props.onChange(this.store.get(props.name));
            this.forceUpdate();
            prevData = this.store.get(props.name)
          } 
        }
      })
  }

  componentWillUnmount() {
    this.unsubscribe && this.unsubscribe();
  }

  render() {
    const {connectDropTarget,component,children} = this.props;
    let values = this
      .store
      .get(this.props.name);
      let Component = component;
    return connectDropTarget(
      <Component {...omit(this.props,omitKeys)}>{children(values,this.props)}</Component>
    )
  }
}
export default class Card extends React.Component {
  static contextTypes = {
    store: PropTypes.object,
    dragType: PropTypes.string,
  }
  Component = withDragType(DropTarget,this.context.dragType,target, (connect : any, monitor : any) => ({
    connectDropTarget: connect.dropTarget(),
    monitor:monitor
  }))(DragableCard)
  render() {
    let Component = this.Component;
    return <Component {...this.props} />
  }
}

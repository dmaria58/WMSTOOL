import * as React from 'react';
import PropTypes from 'prop-types';
import {withDragDropContext} from './withDragDropContext';
import Store from './store';

export interface DragContainerProps {
  children: React.ReactNode;
  dataSource: object;
  type: string;
  dragType?: 'move'|'copy';
  getStore: (store: Store) => void;
  onChange?: (values:any) => any;
}

@withDragDropContext
export default class DragDropContainer extends React.Component<DragContainerProps> {
  static defaultProps = {
    dragType: 'move',
  }
  static childContextTypes = {
    store: PropTypes.object,
    type: PropTypes.string,
  };
  store: Store;
  constructor(props: DragContainerProps,context: any) {
    super(props,context);
    this.state = {

    }
    this.store = new Store(props.dataSource, props.dragType);
    if (props.getStore) {
      props.getStore(this.store)
    }
    this.store.subscribe(() => {
      props.onChange && props.onChange(this.store.get())
    })
  }
  componentWillReceiveProps(props:DragContainerProps) {
    if (props.dataSource !== this.props.dataSource) {
      this.store.reset(props.dataSource)
    }
  }

  getChildContext() {
    return {store:this.store,type: this.props.type};
  }

  render() {
    return (
      <div>
        {this.props.children}
        </div>
    )
  }
}


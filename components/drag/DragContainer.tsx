import * as React from 'react';
import PropTypes from 'prop-types';
import {withDragDropContext} from './withDragDropContext';
import Store from './store';

export interface DragContainerProps {
  children: React.ReactNode;
  dataSource: object;
  type: string;
  getStore: (store: Store) => void;
  onChange?: (values:any) => any;
}

@withDragDropContext
export default class DragDropContainer extends React.Component<DragContainerProps> {
  static childContextTypes = {
    store: PropTypes.object,
    dragType: PropTypes.string,
  };
  store: Store;
  constructor(props: DragContainerProps) {
    super(props);
    this.state = {

    }
    this.store = new Store(props.dataSource);
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
    return {store:this.store,dragType: this.props.type};
  }

  render() {
    return (
      <div>
        {this.props.children}
        </div>
    )
  }
}


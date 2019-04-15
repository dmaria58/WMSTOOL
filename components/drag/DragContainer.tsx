import * as React from 'react';
import WithDragDropContext from '../withdrag-dropcontext';
export interface DragContainerProps {
  children: React.ReactNode;
}
class DragDropContainer extends React.Component<DragContainerProps> {
  render() {
    return (
      <div>
        {this.props.children}
      </div>
    )
  }
}
export default WithDragDropContext(DragDropContainer)

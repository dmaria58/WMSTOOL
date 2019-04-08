import * as React from 'react';
import {DragDropContext} from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

// context singleton
let context: Function;

export function withDragDropContext(
    Component: React.ComponentClass | React.StatelessComponent,
): React.ComponentClass {
    // ensure a singleton instance of the context exists
    if (!context) {
        context = DragDropContext(HTML5Backend);
    }

    return context(Component);
};

export function withDragType(func: (...arg:any[]) => (c:any) => React.ReactElement<any>,type: string,...args: any[]):(WrappedComponent: React.ComponentClass | React.StatelessComponent) => any  {
    return (WrappedComponent: React.ComponentClass | React.StatelessComponent) => 
    func(type,...args)(WrappedComponent)
    
}
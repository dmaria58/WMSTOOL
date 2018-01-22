import * as React from 'react';
export default (props) => (<div className={props.className} onClick={props.onClick}>
    {props.children}
  </div>);

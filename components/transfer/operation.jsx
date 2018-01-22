import * as React from 'react';
import Button from '../button';
function noop() {
}
export default class Operation extends React.Component {
    render() {
        const { moveToLeft = noop, moveToRight = noop, leftArrowText = '', rightArrowText = '', leftActive, rightActive, className, } = this.props;
        return (<div className={className}>
        <Button type="primary" size="small" disabled={!leftActive} onClick={moveToLeft} icon="left">
          {leftArrowText}
        </Button>
        <Button type="primary" size="small" disabled={!rightActive} onClick={moveToRight} icon="right">
          {rightArrowText}
        </Button>
      </div>);
    }
}

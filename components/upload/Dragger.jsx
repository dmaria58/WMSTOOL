import * as React from 'react';
import Upload from './Upload';
export default class Dragger extends React.Component {
    render() {
        const { props } = this;
        return <Upload {...props} type="drag" style={Object.assign({}, props.style, { height: props.height })}/>;
    }
}

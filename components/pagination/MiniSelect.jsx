import * as React from 'react';
import Select from '../select';
export default class MiniSelect extends React.Component {
    render() {
        return <Select size="small" {...this.props}/>;
    }
}
MiniSelect.Option = Select.Option;

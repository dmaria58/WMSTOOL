import * as React from 'react';
import PropTypes from 'prop-types';
import RcSteps from 'rc-steps';
export default class Steps extends React.Component {
    render() {
        return (<RcSteps {...this.props}/>);
    }
}
Steps.Step = RcSteps.Step;
Steps.defaultProps = {
    prefixCls: 'wmstool-steps',
    iconPrefix: 'wmstool',
    current: 0,
};
Steps.propTypes = {
    prefixCls: PropTypes.string,
    iconPrefix: PropTypes.string,
    current: PropTypes.number,
};

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Animate from 'rc-animate';
import PureRenderMixin from 'rc-util/lib/PureRenderMixin';
import Row from '../grid/row';
import Col from '../grid/col';
import warning from '../_util/warning';
import { FIELD_META_PROP, FIELD_DATA_PROP } from './constants';
export default class FormItem extends React.Component {
    constructor() {
        super(...arguments);
        // Resolve duplicated ids bug between different forms
        // https://github.com/wmstool-design/wmstool-design/issues/7351
        this.onLabelClick = () => {
            const id = this.props.id || this.getId();
            if (!id) {
                return;
            }
            const controls = document.querySelectorAll(`[id="${id}"]`);
            if (controls.length !== 1) {
                const control = ReactDOM.findDOMNode(this).querySelector(`[id="${id}"]`);
                if (control && control.focus) {
                    control.focus();
                }
            }
        };
    }
    componentDidMount() {
        warning(this.getControls(this.props.children, true).length <= 1, '`Form.Item` cannot generate `validateStatus` and `help` automatically, ' +
            'while there are more than one `getFieldDecorator` in it.');
    }
    shouldComponentUpdate(...args) {
        return PureRenderMixin.shouldComponentUpdate.apply(this, args);
    }
    getHelpMsg() {
        const props = this.props;
        const onlyControl = this.getOnlyControl();
        if (props.help === undefined && onlyControl) {
            const errors = this.getField().errors;
            return errors ? errors.map((e) => e.message).join(', ') : '';
        }
        return props.help;
    }
    getControls(children, recursively) {
        let controls = [];
        const childrenArray = React.Children.toArray(children);
        for (let i = 0; i < childrenArray.length; i++) {
            if (!recursively && controls.length > 0) {
                break;
            }
            const child = childrenArray[i];
            if (child.type &&
                (child.type === FormItem || child.type.displayName === 'FormItem')) {
                continue;
            }
            if (!child.props) {
                continue;
            }
            if (FIELD_META_PROP in child.props) { // And means FIELD_DATA_PROP in chidl.props, too.
                controls.push(child);
            }
            else if (child.props.children) {
                controls = controls.concat(this.getControls(child.props.children, recursively));
            }
        }
        return controls;
    }
    getOnlyControl() {
        const child = this.getControls(this.props.children, false)[0];
        return child !== undefined ? child : null;
    }
    getChildProp(prop) {
        const child = this.getOnlyControl();
        return child && child.props && child.props[prop];
    }
    getId() {
        return this.getChildProp('id');
    }
    getMeta() {
        return this.getChildProp(FIELD_META_PROP);
    }
    getField() {
        return this.getChildProp(FIELD_DATA_PROP);
    }
    renderHelp() {
        const prefixCls = this.props.prefixCls;
        const help = this.getHelpMsg();
        const children = help ? (<div className={`${prefixCls}-explain`} key="help">
        {help}
      </div>) : null;
        return (<Animate transitionName="show-help" component="" transitionAppear key="help">
        {children}
      </Animate>);
    }
    renderExtra() {
        const { prefixCls, extra } = this.props;
        return extra ? (<div className={`${prefixCls}-extra`}>{extra}</div>) : null;
    }
    getValidateStatus() {
        const onlyControl = this.getOnlyControl();
        if (!onlyControl) {
            return '';
        }
        const field = this.getField();
        if (field.validating) {
            return 'validating';
        }
        if (field.errors) {
            return 'error';
        }
        const fieldValue = 'value' in field ? field.value : this.getMeta().initialValue;
        if (fieldValue !== undefined && fieldValue !== null && fieldValue !== '') {
            return 'success';
        }
        return '';
    }
    renderValidateWrapper(c1, c2, c3) {
        const props = this.props;
        const onlyControl = this.getOnlyControl;
        const validateStatus = (props.validateStatus === undefined && onlyControl) ?
            this.getValidateStatus() :
            props.validateStatus;
        let classes = '';
        if (validateStatus) {
            classes = classNames({
                'has-feedback': props.hasFeedback || validateStatus === 'validating',
                'has-success': validateStatus === 'success',
                'has-warning': validateStatus === 'warning',
                'has-error': validateStatus === 'error',
                'is-validating': validateStatus === 'validating',
            });
        }
        return (<div className={`${this.props.prefixCls}-item-control ${classes}`}>
        {c1}{c2}{c3}
      </div>);
    }
    renderWrapper(children) {
        const { prefixCls, wrapperCol } = this.props;
        const className = classNames(`${prefixCls}-item-control-wrapper`, wrapperCol && wrapperCol.className);
        return (<Col {...wrapperCol} className={className} key="wrapper">
        {children}
      </Col>);
    }
    isRequired() {
        const { required } = this.props;
        if (required !== undefined) {
            return required;
        }
        if (this.getOnlyControl()) {
            const meta = this.getMeta() || {};
            const validate = meta.validate || [];
            return validate.filter((item) => !!item.rules).some((item) => {
                return item.rules.some((rule) => rule.required);
            });
        }
        return false;
    }
    renderLabel() {
        const { prefixCls, label, labelCol, colon, id } = this.props;
        const context = this.context;
        const required = this.isRequired();
        const labelColClassName = classNames(`${prefixCls}-item-label`, labelCol && labelCol.className);
        const labelClassName = classNames({
            [`${prefixCls}-item-required`]: required,
        });
        let labelChildren = label;
        // Keep label is original where there should have no colon
        const haveColon = colon && !context.vertical;
        // Remove duplicated user input colon
        if (haveColon && typeof label === 'string' && label.trim() !== '') {
            labelChildren = label.replace(/[：|:]\s*$/, '');
        }
        return label ? (<Col {...labelCol} className={labelColClassName} key="label">
        <label htmlFor={id || this.getId()} className={labelClassName} title={typeof label === 'string' ? label : ''} onClick={this.onLabelClick}>
          {labelChildren}
        </label>
      </Col>) : null;
    }
    renderChildren() {
        const { children } = this.props;
        return [
            this.renderLabel(),
            this.renderWrapper(this.renderValidateWrapper(children, this.renderHelp(), this.renderExtra())),
        ];
    }
    renderFormItem(children) {
        const props = this.props;
        const prefixCls = props.prefixCls;
        const style = props.style;
        const itemClassName = {
            [`${prefixCls}-item`]: true,
            [`${prefixCls}-item-with-help`]: !!this.getHelpMsg(),
            [`${prefixCls}-item-no-colon`]: !props.colon,
            [`${props.className}`]: !!props.className,
        };
        return (<Row className={classNames(itemClassName)} style={style}>
        {children}
      </Row>);
    }
    render() {
        const children = this.renderChildren();
        return this.renderFormItem(children);
    }
}
FormItem.defaultProps = {
    hasFeedback: false,
    prefixCls: 'wmstool-form',
    colon: true,
};
FormItem.propTypes = {
    prefixCls: PropTypes.string,
    label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    labelCol: PropTypes.object,
    help: PropTypes.oneOfType([PropTypes.node, PropTypes.bool]),
    validateStatus: PropTypes.oneOf(['', 'success', 'warning', 'error', 'validating']),
    hasFeedback: PropTypes.bool,
    wrapperCol: PropTypes.object,
    className: PropTypes.string,
    id: PropTypes.string,
    children: PropTypes.node,
    colon: PropTypes.bool,
};
FormItem.contextTypes = {
    vertical: PropTypes.bool,
};

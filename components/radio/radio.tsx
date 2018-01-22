import * as React from 'react';
import PropTypes from 'prop-types';
import RcCheckbox from 'rc-checkbox';
import classNames from 'classnames';
import shallowEqual from 'shallowequal';
import RadioGroup from './group';
import RadioButton from './radioButton';
import { RadioProps, RadioGroupContext } from './interface';
export interface RadioState {
  value: any;
}
export default class Radio extends React.Component<RadioProps,RadioState> {
  static Group: typeof RadioGroup;
  static Button: typeof RadioButton;

  static defaultProps = {
    prefixCls: 'wmstool-radio',
    type: 'radio',
  };

  static contextTypes = {
    radioGroup: PropTypes.any,
  };

  private rcCheckbox: any;
  constructor(props: any) {
      super(props);
      let kyvalue;
      kyvalue=props.value;
      this.state = {
        value:kyvalue
      };
  }
  shouldComponentUpdate(nextProps: RadioProps, nextState: {}, nextContext: RadioGroupContext) {
    return !shallowEqual(this.props, nextProps) ||
           !shallowEqual(this.state, nextState) ||
           !shallowEqual(this.context.radioGroup, nextContext.radioGroup);
  }

  focus() {
    this.rcCheckbox.focus();
  }

  blur() {
    this.rcCheckbox.blur();
  }

  saveCheckbox = (node: any) => {
    this.rcCheckbox = node;
  }
  clickno=()=>{
    if(this.context.radioGroup&&this.props.value==this.context.radioGroup.value&&this.state.value!=""){
      this.setState({value:""})
    }
    else{
      this.setState({value:this.props.value})
    }
  }
  render() {
    const { props, context } = this;
    const {
      prefixCls,
      className,
      children,
      style,
      ...restProps,
    } = props;
    const { radioGroup } = context;
    let radioProps: RadioProps = { ...restProps };
    if (radioGroup) {
      radioProps.name = radioGroup.name;
      radioProps.onChange = radioGroup.onChange;
      radioProps.checked = this.state.value==""?false:this.state.value === radioGroup.value;
      radioProps.disabled = props.disabled || radioGroup.disabled;
    }
    const wrapperClassString = classNames(className, {
      [`${prefixCls}-wrapper`]: true,
      [`${prefixCls}-wrapper-checked`]: radioProps.checked,
      [`${prefixCls}-wrapper-disabled`]: radioProps.disabled,
    });
    return (
      <label
        className={wrapperClassString}
        style={style}
        onMouseEnter={props.onMouseEnter}
        onMouseLeave={props.onMouseLeave}
        onClick={this.clickno}
      >
        <RcCheckbox
          {...radioProps}
          prefixCls={prefixCls}
          ref={this.saveCheckbox}
        />
        {children !== undefined ? <span>{children}</span> : null}
      </label>
    );
  }
}

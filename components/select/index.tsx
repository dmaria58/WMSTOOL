import * as React from 'react';
import PropTypes from 'prop-types';
import RcSelect, { Option, OptGroup } from 'rc-select';
import classNames from 'classnames';
import LocaleReceiver from '../locale-provider/LocaleReceiver';
import defaultLocale from '../locale-provider/default';

export interface AbstractSelectProps {
  prefixCls?: string;
  className?: string;
  size?: 'default' | 'large' | 'small';
  notFoundContent?: React.ReactNode | null;
  transitionName?: string;
  choiceTransitionName?: string;
  showSearch?: boolean;
  allowClear?: boolean;
  disabled?: boolean;
  style?: React.CSSProperties;
  placeholder?: string;
  defaultActiveFirstOption?: boolean;
  dropdownClassName?: string;
  dropdownStyle?: React.CSSProperties;
  dropdownMenuStyle?: React.CSSProperties;
  onSearch?: (value: string) => any;
  filterOption?: boolean | ((inputValue: string, option: React.ReactElement<OptionProps>) => any);
}

export interface LabeledValue {
  key: string;
  label: React.ReactNode;
}

export type SelectValue = string | any[] | LabeledValue | LabeledValue[];

export interface SelectProps extends AbstractSelectProps {
  value?: SelectValue;
  defaultValue?: SelectValue;
  mode?: 'default' | 'multiple' | 'tags' | 'combobox';
  optionLabelProp?: string;
  onChange?: (value: SelectValue) => void;
  onSelect?: (value: SelectValue, option: Object) => any;
  onDeselect?: (value: SelectValue) => any;
  onBlur?: () => any;
  onFocus?: () => any;
  dropdownMatchSelectWidth?: boolean;
  optionFilterProp?: string;
  labelInValue?: boolean;
  getPopupContainer?: (triggerNode: Element) => HTMLElement;
  tokenSeparators?: string[];
  getInputElement?: () => React.ReactElement<any>;
  autoFocus?: boolean;
  listHeight?: string;
  listItemHeight?: string;  
  virtual?:boolean;
  direction?: 'ltr' | 'rtl'
}

export interface OptionProps {
  disabled?: boolean;
  value?: any;
  title?: string;
  children?: React.ReactNode;
}

export interface OptGroupProps {
  label?: React.ReactNode;
}

export interface SelectLocale {
  notFoundContent?: string;
}

const SelectPropTypes = {
  prefixCls: PropTypes.string,
  className: PropTypes.string,
  size: PropTypes.oneOf(['default', 'large', 'small']),
  combobox: PropTypes.bool,
  notFoundContent: PropTypes.any,
  showSearch: PropTypes.bool,
  optionLabelProp: PropTypes.string,
  transitionName: PropTypes.string,
  choiceTransitionName: PropTypes.string,
};

// => It is needless to export the declaration of below two inner components.
// export { Option, OptGroup };

export default class Select extends React.Component<SelectProps, {}> {
  selectRef:any;
  constructor(props:any) {
    super(props);
    this.selectRef = React.createRef();
  }
  static Option = Option as React.ClassicComponentClass<OptionProps>;
  static OptGroup = OptGroup as React.ClassicComponentClass<OptGroupProps>;

  static defaultProps = {
    prefixCls: 'wmstool-select',
    showSearch: false,
    transitionName: 'slide-up',
    choiceTransitionName: 'zoom',
  };

  static propTypes = SelectPropTypes;
  public focus = () => {
    if (this.selectRef.current) {
      this.selectRef.current.focus();
    }
  };

  public blur = () => {
    if (this.selectRef.current) {
      this.selectRef.current.blur();
    }
  };
  renderSelect = (locale: SelectLocale) => {
    const {
      prefixCls,
      direction,
      className = '',
      size,
      mode,
      listHeight = 256,
      listItemHeight = 24,  
      virtual=false,
      getPopupContainer,    
      dropdownClassName,
      filterOption=true,
      ...restProps
    } = this.props;
    const cls = classNames({
      [`${prefixCls}-lg`]: size === 'large',
      [`${prefixCls}-sm`]: size === 'small',
    }, className);

    let { notFoundContent, optionLabelProp } = this.props;
    const isCombobox = mode === 'combobox';
    if (isCombobox) {
      // children 带 dom 结构时，无法填入输入框
      optionLabelProp = optionLabelProp || 'value';
    }

    const modeConfig = {
      multiple: mode === 'multiple',
      tags: mode === 'tags',
      combobox: true,
    };
    // AutoComplete don't have notFoundContent defaultly
    const notFoundContentLocale = notFoundContent || locale.notFoundContent; 
    const rcSelectRtlDropDownClassName = classNames(dropdownClassName);
    return (
      <RcSelect   
        {...restProps}
        {...modeConfig}
        virtual={virtual}
        mode={mode}
        listHeight={listHeight}
        listItemHeight={listItemHeight}        
        prefixCls={prefixCls}
        direction={direction}
        className={cls}
        optionLabelProp={optionLabelProp || 'children'}
        notFoundContent={notFoundContentLocale}
        getPopupContainer={getPopupContainer}
        ref={this.selectRef}
        showSearch={false}
        dropdownClassName={rcSelectRtlDropDownClassName}
        filterOption={filterOption}
        
      />
    );
  }

  render() {
    return (
      <LocaleReceiver
        componentName="Select"
        defaultLocale={defaultLocale.Select}

      >
        {this.renderSelect}
      </LocaleReceiver>
    );
  }
}

import * as React from 'react';
import TimePickerPanel from 'rc-time-picker/lib/Panel';
import classNames from 'classnames';
import LocaleReceiver from '../locale-provider/LocaleReceiver';
import { generateShowHourMinuteSecond } from '../time-picker';
function getColumns({ showHour, showMinute, showSecond, use12Hours }) {
    let column = 0;
    if (showHour) {
        column += 1;
    }
    if (showMinute) {
        column += 1;
    }
    if (showSecond) {
        column += 1;
    }
    if (use12Hours) {
        column += 1;
    }
    return column;
}
export default function wrapPicker(Picker, defaultFormat) {
    var _a;
    return _a = class PickerWrapper extends React.Component {
            constructor() {
                super(...arguments);
                this.handleOpenChange = (open) => {
                    const { onOpenChange } = this.props;
                    onOpenChange(open);
                };
                this.handleFocus = (e) => {
                    const { onFocus } = this.props;
                    if (onFocus) {
                        onFocus(e);
                    }
                };
                this.handleBlur = (e) => {
                    const { onBlur } = this.props;
                    if (onBlur) {
                        onBlur(e);
                    }
                };
                this.savePicker = (node) => {
                    this.picker = node;
                };
                this.getDefaultLocale = () => {
                    const locale = require('./locale/en_US');
                    const defaultlocale = (locale.default || locale);
                    const result = Object.assign({}, defaultlocale, this.props.locale);
                    result.lang = Object.assign({}, result.lang, (this.props.locale || {}).lang);
                    return result;
                };
                this.renderPicker = (locale, localeCode) => {
                    const props = this.props;
                    const { prefixCls, inputPrefixCls } = props;
                    const pickerClass = classNames(`${prefixCls}-picker`, {
                        [`${prefixCls}-picker-${props.size}`]: !!props.size,
                    });
                    const pickerInputClass = classNames(`${prefixCls}-picker-input`, inputPrefixCls, {
                        [`${inputPrefixCls}-lg`]: props.size === 'large',
                        [`${inputPrefixCls}-sm`]: props.size === 'small',
                        [`${inputPrefixCls}-disabled`]: props.disabled,
                    });
                    const timeFormat = (props.showTime && props.showTime.format) || 'HH:mm:ss';
                    const rcTimePickerProps = Object.assign({}, generateShowHourMinuteSecond(timeFormat), { format: timeFormat, use12Hours: (props.showTime && props.showTime.use12Hours) });
                    const columns = getColumns(rcTimePickerProps);
                    const timePickerCls = `${prefixCls}-time-picker-column-${columns}`;
                    const timePicker = props.showTime ? (<TimePickerPanel {...rcTimePickerProps} {...props.showTime} prefixCls={`${prefixCls}-time-picker`} className={timePickerCls} placeholder={locale.timePickerLocale.placeholder} transitionName="slide-up"/>) : null;
                    return (<Picker {...props} ref={this.savePicker} pickerClass={pickerClass} pickerInputClass={pickerInputClass} locale={locale} localeCode={localeCode} timePicker={timePicker} onOpenChange={this.handleOpenChange} onFocus={this.handleFocus} onBlur={this.handleBlur}/>);
                };
            }
            componentDidMount() {
                const { autoFocus, disabled } = this.props;
                if (autoFocus && !disabled) {
                    this.focus();
                }
            }
            focus() {
                this.picker.focus();
            }
            blur() {
                this.picker.blur();
            }
            render() {
                return (<LocaleReceiver componentName="DatePicker" defaultLocale={this.getDefaultLocale}>
          {this.renderPicker}
        </LocaleReceiver>);
            }
        },
        _a.defaultProps = {
            format: defaultFormat || 'YYYY-MM-DD',
            transitionName: 'slide-up',
            popupStyle: {},
            onChange() {
            },
            onOk() {
            },
            onOpenChange() {
            },
            locale: {},
            prefixCls: 'wmstool-calendar',
            inputPrefixCls: 'wmstool-input',
        },
        _a;
}

import * as React from 'react';
import RcMention, { Nav, toString, toEditorState, getMentions } from 'rc-editor-mention';
import classNames from 'classnames';
import shallowequal from 'shallowequal';
import Icon from '../icon';
export default class Mention extends React.Component {
    constructor(props) {
        super(props);
        this.onSearchChange = (value, prefix) => {
            if (this.props.onSearchChange) {
                return this.props.onSearchChange(value, prefix);
            }
            return this.defaultSearchChange(value);
        };
        this.onChange = (editorState) => {
            if (this.props.onChange) {
                this.props.onChange(editorState);
            }
        };
        this.onFocus = (ev) => {
            this.setState({
                focus: true,
            });
            if (this.props.onFocus) {
                this.props.onFocus(ev);
            }
        };
        this.onBlur = (ev) => {
            this.setState({
                focus: false,
            });
            if (this.props.onBlur) {
                this.props.onBlur(ev);
            }
        };
        this.focus = () => {
            this.mentionEle._editor.focus();
        };
        this.mentionRef = (ele) => {
            this.mentionEle = ele;
        };
        this.state = {
            suggestions: props.suggestions,
            focus: false,
        };
    }
    componentWillReceiveProps(nextProps) {
        const { suggestions } = nextProps;
        if (!shallowequal(suggestions, this.props.suggestions)) {
            this.setState({
                suggestions,
            });
        }
    }
    defaultSearchChange(value) {
        const searchValue = value.toLowerCase();
        const filteredSuggestions = (this.props.suggestions || []).filter(suggestion => {
            if (suggestion.type && suggestion.type === Nav) {
                return suggestion.props.value ?
                    suggestion.props.value.toLowerCase().indexOf(searchValue) !== -1
                    : true;
            }
            return suggestion.toLowerCase().indexOf(searchValue) !== -1;
        });
        this.setState({
            suggestions: filteredSuggestions,
        });
    }
    render() {
        const { className = '', prefixCls, loading, placement } = this.props;
        const { suggestions, focus } = this.state;
        const cls = classNames(className, {
            [`${prefixCls}-active`]: focus,
            [`${prefixCls}-placement-top`]: placement === 'top',
        });
        const notFoundContent = loading
            ? <Icon type="loading"/>
            : this.props.notFoundContent;
        return (<RcMention {...this.props} className={cls} ref={this.mentionRef} onSearchChange={this.onSearchChange} onChange={this.onChange} onFocus={this.onFocus} onBlur={this.onBlur} suggestions={suggestions} notFoundContent={notFoundContent}/>);
    }
}
Mention.getMentions = getMentions;
Mention.defaultProps = {
    prefixCls: 'wmstool-mention',
    notFoundContent: '无匹配结果，轻敲空格完成输入',
    loading: false,
    multiLines: false,
    placement: 'bottom',
};
Mention.Nav = Nav;
Mention.toString = toString;
Mention.toContentState = toEditorState;

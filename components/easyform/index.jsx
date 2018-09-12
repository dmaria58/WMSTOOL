import * as React from 'react';
export default class Easyform extends React.Component {
    constructor(props) {
        super(props);
        this.checkrules = (value) => {
            let rules = this.props.rules;
            if (rules && rules.length) {
                for (let i = 0; i < rules.length; i++) {
                    if (rules[i].required && rules[i].required == true && !value) {
                        return rules[i].message ? rules[i].message : "can not be null";
                    }
                    else if (rules[i].pattern && value && rules[i].pattern.test(value) == false) {
                        return rules[i].message ? rules[i].message : "not in the correct format";
                    }
                    else if (rules[i].maxnum && value && parseFloat(rules[i].maxnum) < parseFloat(value)) {
                        return rules[i].message ? rules[i].message : "not in the correct format";
                    }
                    else if (rules[i].minnum && value && parseFloat(rules[i].minnum) > parseFloat(value)) {
                        return rules[i].message ? rules[i].message : "not in the correct format";
                    }
                    else if (typeof rules[i].func === 'function' && value) { //支持自定义方法
                        const res = rules[i].func(value);
                        if (typeof res === 'object' && !res.result) { //自定义方法，校验结果为返回的message
                            return res.message;
                        }
                        if (!res) {
                            return rules[i].message ? rules[i].message : "not in the correct format";
                        }
                    }
                }
            }
        };
        this.getRulesdetail = () => {
            let hj = this.props.easyCheckValue;
            let tr = this.props.easyCheck;
            if (tr == true || hj) {
                let showd;
                let isrt;
                showd = this.checkrules(hj);
                this.props.isright && showd && showd != ""
                    ? isrt = false
                    : isrt = true;
                let gh;
                gh = this.props.isright;
                gh ? gh(isrt) : "";
                if (showd && showd != "") {
                    return <div className='wmstool-easyform-errorshow'>{showd}</div>;
                }
            }
            return "";
        };
    }
    render() {
        let detail = this.getRulesdetail();
        let classdiv = detail ? 'wmstool-easyform-ipt wmstool-easyform-ipt-error' : 'wmstool-easyform-ipt';
        return (<div>
        <div className={classdiv}>{this.props.children} </div>
        {detail}
      </div>);
    }
}

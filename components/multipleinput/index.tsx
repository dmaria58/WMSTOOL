import * as React from 'react';
import Icon from '../icon';
import Input from '../input';
import Trigger from "rc-trigger";
const { TextArea } = Input;
export interface MultipleInputProps {  
  value?:string;
  dropDown?:boolean,
  valueData?:Array<any>;
  onChange?:(h:any)=>any;
}
export interface MultipleInputState{
  value:string;
  dropDown:boolean,
  valueData:Array<any>;
} 
//分隔符
const SPLIT_REG = /[,\r\n，]/;
export default class MultipleInput extends React.Component<MultipleInputProps,MultipleInputState> {
  constructor(props:MultipleInputProps) {
    super(props);
    this.state = {
      value: props.value?props.value:'', //当前操作的value
      dropDown: props.dropDown?props.dropDown:false, //是否展示下拉数据
      valueData: props.valueData?props.valueData:[], //下拉框数据
    };
  }
  //如果props.value存在 要處理valueData
  componentDidMount() {
    if (this.props.value) {
      let data = this.handleValueData(this.props.value, []);
      this.setState({ valueData: data });
    }
  }
  componentWillReceiveProps(nextProps:any) {
    if (nextProps.value !== this.props.value) {
      if (!nextProps.value) {
        this.setState({ value: "", valueData: [] });
      }else{
        let data = this.handleValueData(nextProps.value, []);
        this.setState({ value: nextProps.value,valueData: data });
      }
    }
  }
  handleValueData = (code:string, valueData:Array<any>) => {
    let newCode = code.split(SPLIT_REG);
    let newArray = valueData.concat(newCode);
    let step = new Map();
    let data = newArray.filter((res) => res&&(!step.has(res)) && step.set(res, 1)); //数组去重,
    return data;
  };
  onChange = (e:any) => {
    let code = e.target.value || "";
    let {valueData,dropDown}=this.state
    //直接在表格中删除
    if (!code && !SPLIT_REG.test(code) && !dropDown) {
      this.setState({ value: "", valueData: [] }, () => {
        this.props.onChange && this.props.onChange("");
      });
      return;
    }
    //单个输入
    if (SPLIT_REG.test(code)) {
      let data = this.handleValueData(code, valueData);
      this.setState({ dropDown: true, valueData: data, value: "" });
    } else {
      this.setState({ value: code });
    }
  };
  handleDelete = (item:any) => {
    let valueData=this.state.valueData
    let data = valueData.filter((filter:any) => filter !== item) || [];
    this.setState({
      valueData: data,
    });
  };
  handleDeleteAll = () => {
    this.setState({ value: "", valueData: [] }, () => {
      this.props.onChange && this.props.onChange("");
    });
  };
  renderOptions = (item:any) => {
    return (
      <div className="drop-drown-option">
        <Input disabled className="dropdown-option-input" value={item} />
        <Icon
          className="dropdown-option-delete"
          type="plus-circle"
          onClick={this.handleDelete.bind(this, item)}
        />
      </div>
    );
  };
  showDropDown() {
    let { dropDown, valueData } = this.state;
    if (!dropDown || !valueData.length) {
      return <div />;
    }
    return (
      <div className="drop-drown-style">
        {valueData.map((item:any) => {
          return this.renderOptions(item);
        })}
      </div>
    );
  }
  triggerChange = (show:any) => {
    if (show) {
      this.setState({
        dropDown: true,
        value: "",
      });
    } else {
      const { valueData, value } = this.state;
      let data = valueData;
      if (value) {
        valueData.push(value);
        let step = new Map();
        data = valueData.filter((res:any) => !step.has(res) && step.set(res, 1)); //数组去重,
      }
      this.setState({
        dropDown: false,
        value: data.join(","),
        valueData: data,
      });
      this.props.onChange && this.props.onChange(data.join(","));
    }
  };
  render() {
    let { value } = this.state;
    return (
      <div className="select-input" ref="node">
        <Trigger
          className="input-multiple-wrap"
          action={["click"]}
          popup={this.showDropDown()}
          popupAlign={{
            points: ["tl", "bl"],
            offset: [0, 10],
          }}
          onPopupVisibleChange={this.triggerChange.bind(this)}
          getPopupContainer={() => this.refs.node}
        >
          <div>
            <TextArea 
              {...this.props}
              value={value}
              onChange={this.onChange.bind(this)}
              autosize={{ maxRows: 1 }}
              title={value}
            />
            <Icon
              className="input-multiple-delete"
              type="cross-circle"
              onClick={this.handleDeleteAll.bind(this)}
            />
          </div>
        </Trigger>
      </div>
    );
  }
}
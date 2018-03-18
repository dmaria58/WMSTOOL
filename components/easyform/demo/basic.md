---
order: 0
title:
  zh-CN: 简易验证
  en-US: Basic Easyform
---

## zh-CN

简易表单验证

## en-US

简易表单验证

````jsx
import { Easyform,Icon,Popover,Input,Button,Select} from 'wmstool';
const Option = Select.Option;
class App extends React.Component {
  constructor(props){
    super(props);
    this.  state = {
      name:"",
      address:"",
      number:"",
      select:"",
      ischeck:false,
      checkkey:{},
    };
  }
  checkdate =(value,key)=>{
    console.log(value.target.value)
    return value.target.value;
  }
  changeInput=(e,key)=>{
    this.setState({[key]:e.target.value})
  }
  checkform= () =>{
    this.setState({ischeck:true})
    let data=this.state.checkkey;
    if(JSON.stringify(data) =='{}'){
      alert("验证失败")
    }
    else{      
      for(let key in data){
        if(data[key]== false){
          alert("验证失败");
          return;
        }
      }
      console.log(data)
      alert("验证成功")
    }
  }
  onIsright=(isright,key)=>{
    if(this.state.checkkey[key] != isright){
      let j=Object.assign({},this.state.checkkey,{[key]:isright})
      this.setState({checkkey:j});
    }  
  }
  checkclear = () => {
    this.setState({
      name:"",
      address:"",
      select:"",
      number:"",
      ischeck:false
    })
  }
  handleChange =(v)=>{
    if(v == "tom"){
      this.setState({
        select:"",
      })
    }else{
      this.setState({
        select:v,
      })  
    }

  }
  render() {
  let {name,ischeck,isright,address,number,select}=this.state;
  let rules=[
        {"required":true,message:'Please input your name'},
        {pattern:/^([\w-]{4,12}|.{0})$/,message:'balabala'}
      ]
  let rules2=[
        {"required":true,message:'Please input your address'},
        {pattern:/^.{0,10}$/,message:'too long'}
      ]
  let rules3=[
        {pattern:/^(0|[1-9][0-9]*)$/,message:'正整数'}
      ] 
  let rules4=[
        {"required":true,message:'Please select'},
      ]      
    return (
      <div>
      <Easyform easyCheck={ischeck} isright={(e)=>this.onIsright(e,"input1")} easyCheckValue={name} rules={rules}>
        <Input value={name} onChange={(e)=>this.changeInput(e,"name")} />
      </Easyform>
      <Easyform easyCheck={ischeck} isright={(e)=>this.onIsright(e,"input2")} easyCheckValue={address} rules={rules2}>
        <Input value={address} onChange={(e)=>this.changeInput(e,"address")} />
      </Easyform>
      <Easyform easyCheck={ischeck} isright={(e)=>this.onIsright(e,"input3")} easyCheckValue={number} rules={rules3}>
        <Input value={number} onChange={(e)=>this.changeInput(e,"number")} />
      </Easyform>
      <Easyform easyCheck={ischeck} isright={(e)=>this.onIsright(e,"input4")} easyCheckValue={select} rules={rules4}>
        <Select
          style={{"width":"200px"}}
          value={select}
          onChange={this.handleChange}
        >
          <Option value="jack">Jack</Option>
          <Option value="lucy">Lucy</Option>
          <Option value="tom">Tom</Option>
        </Select>
      </Easyform>
      <Button onClick = {this.checkform}>submit</Button>
      <Button onClick = {this.checkclear}>clear</Button>
      </div>
    );
  }
}

ReactDOM.render(<App />, mountNode);
````



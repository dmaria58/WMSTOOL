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
      number2:"",
      input8:0,
      select:"",
      select2:[],
      ischeck:false,
      checkkey:{},
    };
  }
  checkdate =(value,key)=>{
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
      select2:[],
      number:"",
      number2:"",
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
  handleMultipleChange=(v)=>{
    this.setState({
        select2:v,
      }) 
  }
  render() {
  let {name,ischeck,isright,address,number,select,select2,number2,input6,input7,input8}=this.state;
  let num =this.state.number2?this.state.number2:9
  let rules=[
        {"required":true,message:'Please input your name'},
        {pattern:/^([\w-]{4,12}|.{0})$/,message:'balabala'}
      ]
  let rules2=[
        {"required":true,message:'Please input your address'},
        {pattern:/^.{0,10}$/,message:'too long'}
      ]
  let rules3=[
        {maxnum:100,message:'大于'},
        {minnum:10,message:'小于'},
      ] 
  let rules4=[
        {"required":true,message:'Please select'},
      ] 
  let rules5=[
        {pattern:/^(0|[1-9][0-9]*)$/,message:'正整数'}
      ]  
      
   let rule6 =[
                  {
                      func: value => {
                          return !/[0-9]/.test(value)
                      },
                      message: '不能输入数字'
                  }
              ]  
   let rule7 =[
                  {
                      func: value => {
                          if(/[0-9]/.test(value)){
                                return {result:false,message:"不能输入数字"}
                          }
                          if(/[a-z]/.test(value)){
                                return {result:false,message:"不能输入小写字母"}
                          }
                          if(input6 && input6 == input7){
                                return {result:false,message:"两次输入不能一样"}
                          }
                          return true;// or  return {result:true,message:""}  
                      }
                  }
              ]  
   let rules8=[
        {"required":true,message:'Please input'},
      ]   
    return (
      <div>
      <Easyform easyCheck={ischeck} isright={(e)=>this.onIsright(e,"input1")} easyCheckValue={name} rules={rules}>
        <Input value={name} onChange={(e)=>this.changeInput(e,"name")} />
      </Easyform>
      input 必填校验
      <Easyform easyCheck={ischeck} isright={(e)=>this.onIsright(e,"input8")} easyCheckValue={input8} rules={rules8}>
        <Input value={input8} onChange={(e)=>this.changeInput(e,"input8")} />
      </Easyform>
      <Easyform easyCheck={ischeck} isright={(e)=>this.onIsright(e,"input2")} easyCheckValue={address} rules={rules2}>
        <Input value={address} onChange={(e)=>this.changeInput(e,"address")} />
      </Easyform>
      正整数
      <Easyform easyCheck={ischeck} isright={(e)=>this.onIsright(e,"input5")} easyCheckValue={number2} rules={rules5}>
        <Input value={number2} type="number" max={4} onChange={(e)=>this.changeInput(e,"number2")} />
      </Easyform>    
      <Easyform easyCheck={ischeck} isright={(e)=>this.onIsright(e,"input6")} easyCheckValue={input6} rules={rule6}>
        <Input value={input6} type="text" onChange={(e)=>this.changeInput(e,"input6")} placeholder="自定义校验方法：输入不能为2018"/>
      </Easyform>    
      <Easyform easyCheck={ischeck} isright={(e)=>this.onIsright(e,"input7")} easyCheckValue={input7} rules={rule7}>
        <Input value={input7} type="text" onChange={(e)=>this.changeInput(e,"input7")} placeholder="自定义校验方法：不能为数字、不能为小写" />
      </Easyform>    
      ss  
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
      多选
      <Easyform easyCheck={ischeck} isright={(e)=>this.onIsright(e,"select2")} easyCheckValue={select2} rules={rules4}>
        <Select
          style={{"width":"200px"}}
          value={select2}
          mode={'tags'}
          onChange={this.handleMultipleChange}
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



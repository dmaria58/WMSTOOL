import * as React from 'react';
export interface EformProps  {  
  rules?:Array<any>;
  easyCheckValue:string;
  easyCheck?:boolean;
  isright?:(h:boolean)=>any;
}  
    

export default class Easyform extends React.Component<EformProps> {      
  constructor(props : EformProps){  
    super(props);
  } 
  checkValue=(value:any)=>{
    if(Array.isArray(value)){
      if(value.length==0){
        return ''
      }else{
        return value.join(',')
      }
    }else if(value===0){
      return `${value}`
    }else{
      return value
    }
  }
  checkrules = (values:any) =>{
    let rules= this.props.rules;
    if(rules && rules.length){
      for(let i=0;i<rules.length;i++){
        let value=this.checkValue(values)
        if(rules[i].required && rules[i].required==true && !value){
          return rules[i].message?rules[i].message:"can not be null"
        }
        else if(rules[i].pattern && value && rules[i].pattern.test(value) ==false){
          return rules[i].message?rules[i].message:"not in the correct format"
        }
        else if(rules[i].maxnum && value && parseFloat(rules[i].maxnum)<parseFloat(value)){
          return rules[i].message?rules[i].message:"not in the correct format"
        }
        else if(rules[i].minnum && value && parseFloat(rules[i].minnum)>parseFloat(value)){
          return rules[i].message?rules[i].message:"not in the correct format"
        }
        else if(typeof rules[i].func === 'function' ){//支持自定义方法
          const res = rules[i].func(value);
          if(typeof res === 'object' && !res.result){//自定义方法，校验结果为返回的message
             return res.message;
          }
          if(!res){
              return rules[i].message?rules[i].message:"not in the correct format"
          }
        }
      }   
    }  

  } 
  getRulesdetail =()=>{
    let tr=this.props.easyCheck;
    let hj=this.checkValue(this.props.easyCheckValue)
    if(tr == true || hj){
      let showd:any;
      let isrt :boolean;
      showd = this.checkrules(hj);
      this.props.isright && showd && showd!=""
        ?isrt=false
        :isrt=true
      let gh:any;
      gh= this.props.isright; 
      gh?gh(isrt):""; 
      if(showd && showd !=""){
        return <div className='wmstool-easyform-errorshow' >{showd}</div>
      }
    } 
    return "";
  }
  public render(){   
    let detail = this.getRulesdetail();  
    let classdiv = detail? 'wmstool-easyform-ipt wmstool-easyform-ipt-error':'wmstool-easyform-ipt'
    return (
      <div>
        <div className={classdiv}>{this.props.children} </div>
        {detail}
      </div>
    );  
  }  
}
  
import * as React from 'react';
import Icon from '../icon';
export interface ScoProps  {  
  isopen ?: boolean;
  addicon?:any
}  
  
export interface ScoState {  
    open?: boolean  
}  
  
  

export default class Scollapse extends React.Component<ScoProps,ScoState> {      
  constructor(props : ScoProps){  
    super(props); 
    this.state={
      open:props.isopen?props.isopen:false
    } 
  }  
  changeClass=()=>{
    this.setState({open:!this.state.open})
  } 
  public render(){         
      var {children,addicon}=this.props;
      var prefixCls='wmstool-collapse';
      var prefixCls2='wmstool-scollapse';
      var showdivlcass=`${prefixCls2}-icon-div`;
      var collapseClassName = this.state.open===true?`${prefixCls2}-bordered ${prefixCls}-item ${prefixCls}-item-active`:`${prefixCls2}-bordered ${prefixCls}-item`;
      var icontype=this.state.open===true?"up-circle-o":"search"
      var collapseClassName2=this.state.open===true?`${prefixCls}-content ${prefixCls}-content-active`:`${prefixCls}-content ${prefixCls}-content-inactive`;
      var csname3=`${prefixCls}-content-box`
      console.log(addicon)
      return (
      <div className={collapseClassName}>
        <div className={showdivlcass}><Icon type={icontype} onClick={this.changeClass}/>{addicon}</div>
        <div className={collapseClassName2}>
          <div className={csname3}>
            {children}
          </div>
        </div>
      </div>
      );  
  }  
}  
  
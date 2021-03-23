import * as React from "react";
import { Resizable } from "react-resizable";
import {resizableColumnsTableWrapper} from "./resizableTable"

export interface ResizableCellProps {
  resize?:Array<any>;
  dataSource?: Array<any>;
  onChange?: (h: any) => any;
  
}
export interface ResizableCellState {
  dataSource: Array<any>;
  resize: Array<any>;
}
class ResizableCell extends React.Component<ResizableCellProps,ResizableCellState> {
  constructor(props: ResizableCellProps) {
    super(props);
    this.state = {
      dataSource:props.dataSource?props.dataSource:[],
      resize:this.props.resize?[this.props.resize]:['right']
    };
  }
  static resizableColumnsTableWrapper = resizableColumnsTableWrapper as (h: any) => any;
  onResize =  (index:number,_e:React.SyntheticEvent<HTMLElement>, data:any) => {
    let {dataSource}=this.state
    let {size}=data
    let currentData=dataSource[index]
    if(currentData.width){
      currentData.width=size.width
    }
    if(currentData.height){
      currentData.height=size.height
    }
    dataSource[index]=currentData
    this.setState({dataSource},()=>{
      this.props.onChange&&this.props.onChange(dataSource)
    })
  };
  render() {
    let {dataSource,resize}=this.state
    return (
      <div className="resizable-cell-main">
      {dataSource.map((element: any, index: number) => {
        return (
          <Resizable
            height={element.height}
            width={element.width}
            resizeHandles={resize}
            onResize={this.onResize.bind(this,index)}
            draggableOpts={{ enableUserSelectHack: false }}
           
          >
            <div
              style={{ width: element.width , height: element.height  }}
            >
             { React.isValidElement(element.content)?element.content:<span>{element.content}</span>}
            </div>
          </Resizable>
        );
      })}
    </div>
    );
  }
}

export default ResizableCell;

import * as React from 'react';
declare function unescape(s:string): string;
export interface EformProps {
  columnsSource?: any;
  dataSource?: any;
  isPort?:(h:boolean)=>any;
  linkName?: any;
}
export default class Exportexcel extends React.Component<EformProps> {
  constructor(props: EformProps) {
    super(props);
  }
  tableNode?: any;
  componentWillReceiveProps(nextProps:any) {
    const { columnsSource, dataSource,} = this.props;
    if(nextProps.isPort != this.props.isPort){
      // 处理数据
      let arry=[]
      for(let i = 0; i < dataSource.length; i++){
          let tep={}
          columnsSource.forEach((filter:any)=>{
              tep[filter.dataIndex]=dataSource[i][filter.dataIndex]
          })
          arry.push(tep)
      }
      this.tableToExcel(columnsSource,arry) 
    }
  }
  tableToExcel(columnsSource:any,dataSource:any){
    const { linkName } = this.props;
    let str ='';
    for(let i = 0; i < columnsSource.length; i++){
        str+=`${columnsSource[i].key + '\t'},`;
    }
    str += '\n';
    for (let i = 0; i < dataSource.length; i++) {
        for (let item in dataSource[i]) {
            str += `${dataSource[i][item] + '\t'},`;
        }
        str += '\n';
    }
    let uri = 'data:text/csv;charset=utf-8,\ufeff' + encodeURIComponent(str);
    var link = document.createElement("a");
    link.href = uri;
    link.download = linkName?linkName:"下载.xls";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link); 
  }
  render() {
    return (
      <div>
      </div>
    );
  }
}

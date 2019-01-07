import * as React from 'react';
export interface EformProps {
  columns?: any;
  dataSource?: any;
  getExportExcel?: any;
  Exportexcel?: any;
  linkName?: any;
}

export default class Exportexcel extends React.Component<EformProps> {
  constructor(props: EformProps) {
    super(props);
  }
  componentDidMount() {
    this.props.getExportExcel((columns:any,dataSource:any) => this.tableToExcel(columns,dataSource))
  }
  tableToExcel(columns:any,dataSource:any){
    const { linkName } = this.props;
     // 处理数据
    let newDataSource=[]
    if(columns){
      for(let i = 0; i < dataSource.length; i++){
          let tep={} as any;
          columns.forEach((filter:any)=>{
              tep[filter.dataIndex]=dataSource[i][filter.dataIndex]
          })
          newDataSource.push(tep)
      }
    }
    let str ='';
    for(let i = 0; i < columns.length; i++){
        str+=`${columns[i].title + '\t'},`;
    }
    str += '\n';
    for (let i = 0; i < newDataSource.length; i++) {
        for (let item in newDataSource[i]) {
            let news=newDataSource[i][item]?(newDataSource[i][item].indexOf(',')!=-1?newDataSource[i][item].replace(/\,/g," "):newDataSource[i][item]):null
            str += `${news + '\t'},`;
        }
        str += '\n';
    }

    let uri = 'data:text/csv;charset=utf-8,\ufeff' + encodeURIComponent(str);
    var link = document.createElement("a");
    link.href = uri;
    link.download = linkName?linkName:"download.xls";
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

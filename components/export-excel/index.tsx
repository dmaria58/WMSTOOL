import * as React from 'react';
export interface EformProps {
  columns?: any;
  dataSource?: any;
  getExportExcel?: any;
  Exportexcel?: any;
  linkName?: any;
}
declare function unescape(s:string): string;
export default class Exportexcel extends React.Component<EformProps> {
  constructor(props: EformProps) {
    super(props);
  }
  componentDidMount() {
    this.props.getExportExcel((columns: any, dataSource: any) => this.tableToExcel(columns, dataSource))
  }
  tableToExcel(columns: any, dataSource: any) {
    const { linkName } = this.props;
    // 处理数据
    let newDataSource = []
    if (columns) {
      for (let i = 0; i < dataSource.length; i++) {
        let tep = {} as any;
        columns.forEach((filter: any) => {
          tep[filter.dataIndex] = dataSource[i][filter.dataIndex]
        })
        newDataSource.push(tep)
      }
    }
    let str = '<tr>';
    for (let i = 0; i < columns.length; i++) {
      str += `<td>${columns[i].title + '\t'}</td>`;
    }
    str += '</tr>';
    str += '<tr>';
    for (let i = 0; i < newDataSource.length; i++) {
      for (let item in newDataSource[i]) {
        let news = newDataSource[i][item] ? newDataSource[i][item] : "";
        str += `<td style="mso-number-format:\'@\'">${news + '\t'}</td>`;
      }
      str += '</tr>';
    }

    var worksheet = linkName?linkName:"sheet"
    var uri = 'data:application/vnd.ms-excel;base64,';
    var template = `<html xmlns:o="urn:schemas-microsoft-com:office:office" 
    xmlns:x="urn:schemas-microsoft-com:office:excel" 
    xmlns="http://www.w3.org/TR/REC-html40">
    <head><meta charset="UTF-8"><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet>
      <x:Name>${worksheet}</x:Name>
      <x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet>
      </x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]-->
      </head><body><table>${str}</table></body></html>`;
    var base64 = function(s:any) { return window.btoa(unescape(encodeURIComponent(s))) }
    var link = document.createElement("a");
    link.href = uri+base64(template);
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

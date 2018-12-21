import * as React from 'react';
import Table from '../table';
declare function unescape(s:string): string;
export interface EformProps {
  columnsSource?: any;
  dataSource?: any;
  isPort?:(h:boolean)=>any;
}
export default class Exportexcel extends React.Component<EformProps> {
  constructor(props: EformProps) {
    super(props);
  }
  tableNode?: any;
  componentWillReceiveProps(nextProps:any) {
    if(nextProps.isPort != this.props.isPort){
      tableToExcel(this.tableNode)
    }
  }
  renderTable = () => {
    const { columnsSource, dataSource } = this.props;
    return (
      <div ref={node => this.tableNode = node} style={{ display: "none" }}>
        <Table
          columns={columnsSource}
          dataSource={dataSource}
        />
      </div>
    )
  }
  render() {
    return (
      <div>
        {this.renderTable()}
      </div>
    );
  }
}
//导出方法

const tableToExcel = (function () {
  let uri = 'data:application/vnd.ms-excel;base64,';
  let template = '<html><head><meta charset="UTF-8"></head><body><table>{table}</table></body></html>';
  let base64 = function (s: any) { return window.btoa(unescape(encodeURIComponent(s))) };
  let format = function (s: any, c: any) {
    return s.replace(/{(\w+)}/g,
      function (p: any) { return c[p]; })
  }
  return function (table: any) {
    var ctx = { worksheet: name || 'Worksheet', table: table.innerHTML }
    window.location.href = uri + base64(format(template, ctx))
  }
})()
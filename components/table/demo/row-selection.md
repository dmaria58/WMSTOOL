---
order: 2
title:
  en-US: selection
  zh-CN: 可选择
---

## zh-CN

第一列是联动的选择框。

## en-US

Rows can be selectable by making first column as a selectable column.

````jsx
import { Table ,Icon} from 'wmstool';

const columns = [{
  title: 'Name',
  dataIndex: 'name',
  render: text => <a href="#">{text}</a>,
}, {
  title: 'Age',
  dataIndex: 'age',
}, {
  title: 'Address',
  dataIndex: 'address',
}];
const data = [{
  key: 'A',
  name: 'John Brown',
  age: 32,
  address: 'New York No. 1 Lake Park',
}, {
  key: 'B',
  name: 'Jim Green',
  age: 42,
  address: 'London No. 1 Lake Park',
}, {
  key: 'C',
  name: 'Joe Black',
  age: 32,
  address: 'Sidney No. 1 Lake Park',
}, {
  key: 'D',
  name: 'Disabled User',
  age: 99,
  address: 'Sidney No. 1 Lake Park',
}, {
  key: 'E',
  name: ' User',
  age: 99,
  address: 'Sidney No. 1 Lake Park',
}, {
  key: 'F',
  name: ' User',
  age: 99,
  address: 'Sidney No. 1 Lake Park',
}];
const excelHeader=[
 {
  title: '姓名',
  dataIndex: 'name',
  key: 'name',
  },{
  title: '年龄',
  dataIndex: 'age',
  key: 'age',
  },{
  title: '住址',
  dataIndex: 'address',
  key: 'address',
  }
]
const excelBody=[
 {
  key: '1',
  name: 'chenchen',
  age: 32,
  address: '西湖区湖底公园1号'
  },{
  key: '2',
  name: 'fangfang',
  age: 32,
  address: '西湖区湖底公园2号' 
  },{
  key: '3',
  name: 'lanlan',
  gugug:"aaaa",
  age: 32,
  address: '西湖区湖底公园3号'
  }
]
// rowSelection object indicates the need for row selection
const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  },
  shiftSelect:true,//按shift选中一片
  getCheckboxProps: record => ({
    disabled: record.name === 'Disabled User', // Column configuration not to be checked
  }),
};

ReactDOM.render(
  <Table rowSelection={rowSelection} columns={columns} dataSource={data}  
  downloadExcelData={{iconTitle:"exportData",iconType:"download",linkName:"downloadSummary.xls",isDownTableExcel:true,downloadExcelHeader:excelHeader,downloadExcelBody:excelBody,
  IconContent: <Icon title={"Export Data"} type={"export"}  />}}/>
, mountNode);
````

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
import { Table } from 'wmstool';

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
  <Table rowSelection={rowSelection} columns={columns} dataSource={data} />
, mountNode);
````

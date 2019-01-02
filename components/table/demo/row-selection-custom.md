---
order: 4
title:
  en-US: Custom selection
  zh-CN: 自定义选择项
---

## zh-CN

通过 `rowSelection.selections` 自定义选择项，默认不显示下拉选项，设为 `true` 时显示默认选择项。

## en-US

Use `rowSelection.selections` custom selections, default no select dropdown, show default selections via setting to `true`.


````jsx
import { Table } from 'wmstool';

const columns = [{
  title: 'Name',
  dataIndex: 'name',
}, {
  title: 'Age',
  dataIndex: 'age',
}, {
  title: 'Address',
  dataIndex: 'address',
}, {
  title: 'Address1',
  dataIndex: 'address1',
}, {
  title: 'Address2',
  dataIndex: 'address2',
}, {
  title: 'Address3',
  dataIndex: 'address3',
}, {
  title: 'Address4',
  dataIndex: 'address4',
}, {
  title: 'Addres5',
  dataIndex: 'address5',
}, {
  title: 'Address6',
  dataIndex: 'address6',
}, {
  title: 'Address7',
  dataIndex: 'address7',
}, {
  title: 'Address8',
  dataIndex: 'address8',
}];
const columns2 = [{
  title: 'Name',
  dataIndex: 'name',
}, {
  title: 'Age',
  dataIndex: 'age',
}]
const data = [];
for (let i = 0; i < 46; i++) {
  data.push({
    key: i,
    name: `Edward King ${i}`,
    age: 32,
    address: `London, Park Lane no. ${i}`,
  });
}

class App extends React.Component {
  state = {
    selectedRowKeys: [], // Check here to configure the default column
  };
  onSelectChange = (selectedRowKeys) => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({ selectedRowKeys });
  }
  onRowClick  =(i,j) => {
      console.log(i);
      console.log(j);
  }
  returnSelectColumn =(data)=>{
    console.log(data)
  }
  onSaveColums=(data,dataall,closeSettingFun)=>{
    console.log("显示列的数据,一秒后关闭",data,dataall);
    setTimeout(()=>{
    closeSettingFun()},1000)
  }
  render() {
    const { selectedRowKeys } = this.state;
    const tablepation={
      defaultCurrent:3,
      total:500,
      showSizeChanger:true
    }
    const rowSelection = {
      selectedRowKeys,
      type: 'radio',
      onChange: this.onSelectChange,
      hideDefaultSelections: true,
      selecttype: true,
      selections: [{
        key: 'all-data',
        text: 'Select All Data',
        onSelect: () => {
          this.setState({
            selectedRowKeys: [...Array(46).keys()], // 0...45
          });
        },
      }, {
        key: 'odd',
        text: 'Select Odd Row',
        onSelect: (changableRowKeys) => {
          let newSelectedRowKeys = [];
          newSelectedRowKeys = changableRowKeys.filter((key, index) => {
            if (index % 2 !== 0) {
              return false;
            }
            return true;
          });
          this.setState({ selectedRowKeys: newSelectedRowKeys });
        },
      }, {
        key: 'even',
        text: 'Select Even Row',
        onSelect: (changableRowKeys) => {
          let newSelectedRowKeys = [];
          newSelectedRowKeys = changableRowKeys.filter((key, index) => {
            if (index % 2 !== 0) {
              return true;
            }
            return false;
          });
          this.setState({ selectedRowKeys: newSelectedRowKeys });
        },
      }],
      onSelection: this.onSelection,
    };

    return (
      <Table rowSelection={rowSelection} onRowClick={this.onRowClick}  ColumnsChangeList={columns2} returnSelectColumn={this.returnSelectColumn}  isColumnsChange={true} columns={columns} dataSource={data} pagination={tablepation}
        isDownTableExcel={true} 
        columnsChangeData={{text:"保存",onSaveColums:this.onSaveColums,fixed:true}}
       />
    );
  }
}

ReactDOM.render(<App />, mountNode);
````

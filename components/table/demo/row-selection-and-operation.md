---
order: 3
title:
  en-US: Selection and operation
  zh-CN: 选择和操作
---

## zh-CN

选择后进行操作，完成后清空选择，通过 `rowSelection.selectedRowKeys` 来控制选中项。

## en-US

To perform operations and clear selections after selecting some rows, use `rowSelection.selectedRowKeys` to control selected rows.


````jsx
import { Table, Button } from 'wmstool';

const columns = [{
  title: 'Name',
  dataIndex: 'name',
  width:100,
  fixed:'left'
}, {
  title: 'Age',
  dataIndex: 'age',
  width:100
}, {
  title: 'Address',
  dataIndex: 'address',
  width:100
}
, {
  title: 'code1',
  dataIndex: 'code1',
  width:100
}, {
  title: 'code2',
  dataIndex: 'code2',
  width:100
}, {
  title: 'code3',
  dataIndex: 'code3',
  width:100
}, {
  title: 'code4',
  dataIndex: 'code4',
  width:150
}, {
  title: 'code5',
  dataIndex: 'code5',
  width:100
}, {
  title: 'code6',
  dataIndex: 'code7',
  width:100
}, {
  title: 'code8',
  dataIndex: 'code8',
  width:100
}, {
  title: 'code9',
  dataIndex: 'code9',
   width:100
}, {
  title: 'code10',
  dataIndex: 'code10',
   width:100
}, {
  title: 'code11',
  dataIndex: 'code11',
   width:100
}, {
  title: 'code12',
  dataIndex: 'code12',
   width:100
}, {
  title: 'code13',
  dataIndex: 'code13',
   width:100
}, {
  title: 'code14',
  dataIndex: 'code14',
   width:100
}, {
  title: 'code15',
  dataIndex: 'code15',
   width:100
}, {
  title: 'code16',
  dataIndex: 'code16',
   width:100
}, {
  title: 'code17',
  dataIndex: 'code17',
   width:100
}, {
  title: 'code18',
  dataIndex: 'code18',
   width:100
}, {
  title: 'code19',
  dataIndex: 'code19',
   width:100
}, {
  title: 'code20',
  dataIndex: 'code20',
   width:100,
   fixed:'right'
}];

const datas = [];
for (let i = 0; i < 50000; i++) {
  datas.push({
    key: i,
    name: `E${i}`,
    age: 32,
    address: `L${i}`,
    code1:`L ${i}`,
    code2:`L ${i}`,
    code3:`L ${i}`,
    code4:`L ${i}`,
    code5:`L${i}`,
    code6:`L${i}`,
    code7:`L ${i}`,
    code8:`${i}`,
    code9:`${i}`,
    code10:`L ${i}`,
    code11:`L ${i}`,
    code12:`L ${i}`,
    code13:`L ${i}`,
    code14:`L${i}`,
    code15:`L${i}`,
    code16:`L ${i}`,
    code17:`${i}`,
    code18:`${i}`,
    code19:`${i}`,
    code20:`${i}`,   
  });
}
const data2 = [];
for (let i = 0; i < 1550; i++) {
  data2.push({
    key: i,
    name: `E${i}`,
    age: 32,
    address: `L${i}`,
    code1:`L ${i}`,
    code2:`L ${i}`,
    code3:`L ${i}`,
    code4:`L ${i}`,
    code5:`L${i}`,
    code6:`L${i}`,
    code7:`L ${i}`,
    code8:`${i}`,
    code9:`${i}`,
    code10:`L ${i}`,
    code11:`L ${i}`,
    code12:`L ${i}`,
    code13:`L ${i}`,
    code14:`L${i}`,
    code15:`L${i}`,
    code16:`L ${i}`,
    code17:`${i}`,
    code18:`${i}`,
    code19:`${i}`,
    code20:`${i}`,   
  });
}
class App extends React.Component {
  state = {
    selectedRowKeys: [], // Check here to configure the default column
    loading: false,
    data:datas
  };
  start = () => {
    this.setState({ loading: true });
    // ajax request after empty completing
      this.setState({
        selectedRowKeys: [],
        loading: false,
      });
  }
  search=()=>{
    this.setState({data:data2})
  }
  onSelectChange = (selectedRowKeys) => {
    console.log('selectedRowKeys changed: ', selectedRowKeys,this.state);
    this.setState({ selectedRowKeys });
  }
  onRowClick  =(i,j) => {
      console.log(i);
      console.log(j);
  }
  render() {
    const { loading, selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      selecttype: true,
      shiftSelect: true,
      onChange: this.onSelectChange,
    };
    const hasSelected = selectedRowKeys.length > 0;
    return (
      <div>
        <div style={{ marginBottom: 16 }}>
          <Button
            type="primary"
            onClick={this.start}
            disabled={!hasSelected}
            loading={loading}
          >
            Reload
          </Button>
          <Button
            type="primary"
            onClick={this.search}
            loading={loading}
          >
            Search
          </Button>          
          <span style={{ marginLeft: 8 }}>
            {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
          </span>
        </div>
        <Table rowSelection={rowSelection} bordered={false} pagination={{ pageSize: 3000 }} onRowClick={this.onRowClick}  scroll={{ x: 3000, y: 300 }} columns={columns} dataSource={this.state.data} isMaxData={{lazyHeight:54}} />
      </div>
    );
  }
}

ReactDOM.render(<App />, mountNode);
````

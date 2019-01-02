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
}, {
  title: 'Age',
  dataIndex: 'age',
}, {
  title: 'Address',
  dataIndex: 'address',
}, {
  title: 'code1',
  dataIndex: 'code1',
}, {
  title: 'code2',
  dataIndex: 'code2',
}, {
  title: 'code3',
  dataIndex: 'code3',
}, {
  title: 'code4',
  dataIndex: 'code4',
}, {
  title: 'code5',
  dataIndex: 'code5',
}, {
  title: 'code6',
  dataIndex: 'code7',
}, {
  title: 'code8',
  dataIndex: 'code8',
}, {
  title: 'code9',
  dataIndex: 'code9',
}, {
  title: 'code10',
  dataIndex: 'code10',
}, {
  title: 'code11',
  dataIndex: 'code11',
}, {
  title: 'code12',
  dataIndex: 'code12',
}, {
  title: 'code12',
  dataIndex: 'code12',
}, {
  title: 'code13',
  dataIndex: 'code13',
}, {
  title: 'code14',
  dataIndex: 'code14',
}, {
  title: 'code15',
  dataIndex: 'code15',
}, {
  title: 'code16',
  dataIndex: 'code16',
}];

const data = [];
for (let i = 0; i < 1000; i++) {
  data.push({
    key: i,
    name: `Edward King ${i}`,
    age: 32,
    address: `London, Park Lane no. ${i}`,
    code1:`London, Park Lane no. ${i}`,
    code2:`London, Park Lane no. ${i}`,
    code3:`London, Park Lane no. ${i}`,
    code4:`London, Park Lane no. ${i}`,
    code5:`London, Park Lane no. ${i}`,
    code6:`London, Park Lane no. ${i}`,
    code7:`London, Park Lane no. ${i}`,
    code8:`London, Park Lane no. ${i}`,
    code9:`London, Park Lane no. ${i}`,
    code10:`London, Park Lane no. ${i}`,
    code11:`London, Park Lane no. ${i}`,
    code12:`London, Park Lane no. ${i}`,
    code13:`London, Park Lane no. ${i}`,
    code14:`London, Park Lane no. ${i}`,
    code15:`London, Park Lane no. ${i}`,
    code16:`London, Park Lane no. ${i}`,
    code17:`London, Park Lane no. ${i}`,
    code18:`London, Park Lane no. ${i}`,
    code19:`London, Park Lane no. ${i}`,

  });
}

class App extends React.Component {
  state = {
    selectedRowKeys: [], // Check here to configure the default column
    loading: false,
  };
  start = () => {
    this.setState({ loading: true });
    // ajax request after empty completing
    setTimeout(() => {
      this.setState({
        selectedRowKeys: [],
        loading: false,
      });
    }, 1000);
  }
  onSelectChange = (selectedRowKeys) => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
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
          <span style={{ marginLeft: 8 }}>
            {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
          </span>
        </div>
        <Table rowSelection={rowSelection} pagination={{ pageSize: 500 }} onRowClick={this.onRowClick}  scroll={{ x: 1500, y: 300 }} columns={columns} dataSource={data} isMaxData={{lazyHeight:32}}/>
      </div>
    );
  }
}

ReactDOM.render(<App />, mountNode);
````

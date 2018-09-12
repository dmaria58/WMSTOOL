---
order: 0
title:
  en-US: Lazy Table
  zh-CN: 懒加载
---

## zh-CN

懒加载表格，数据量较大时是个不错的选择。

## en-US

Lazy table, a good choice for a large amount of data!

````jsx
import { LazyTable, Icon, Divider, Button } from 'wmstool';

const columns = [{
  title: 'Name',
  dataIndex: 'name',
  key: 'name',
  render: text => <a href="#">{text}</a>,
}, {
  title: 'Age',
  dataIndex: 'age',
  key: 'age',
}, {
  title: 'Address',
  dataIndex: 'address',
  key: 'address',
}, {
  title: 'Action',
  key: 'action',
  render: (text, record) => (
    <span>
      <a href="javascript:;">Delete</a>
    </span>
  ),
}];

class App extends React.Component {
  state = {
    dataSource: [], // Check here to configure the default column
    loading: false,
  };

  //获取数据
  getData = ()=>{
    const dataSource = [];
    this.setState({loading: true});
    for(let i=0; i<1000; i++){
      dataSource.push({
        key: i,
        name: 'Name' + Math.random(),
        age: 32,
        address: 'Adress' + Math.random(),
      });
    }
    this.setState({dataSource}, ()=>{
      this.setState({loading: false});
    });
  }

   render() {
    const { loading, dataSource} = this.state;
    const pagination = {
      current: 1,
      total: dataSource.length,
      pageSize: 1000,
      pageSizeOptions: ['500', '1000', '2000'],
      size: "small",
      showSizeChanger: true,
    };
    return (
      <div>
        <div style={{ marginBottom: 16 }}>
          <Button
            type="primary"
            onClick={this.getData}
          >
            Load
          </Button>
        </div>
        <LazyTable 
          columns={columns} 
          dataSource={dataSource} 
          scroll={{y: 200}}
          loading={loading}
          lazyLoad={true}
          pagination={pagination}/>
      </div>
    );
  }
}

ReactDOM.render(<App />, mountNode);
````

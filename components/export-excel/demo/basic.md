---
order: 0
title:
  zh-CN: 数据导出
  en-US: Basic Exportexcel
---

## zh-CN

excel数据导出

## en-US

excel数据导出

````jsx
import { Exportexcel as tableToExcel,Icon,Table,Modal,Button } from 'wmstool';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state={
      loading:false
    }
  }
  handleDownload = () =>{
    tableToExcel(columns, dataSource,"LoadingDownLoad")
  }
  handleLoadingDownLoad = () =>{
    this.setState({loading:true});
    setTimeout(() =>{
        // 表格导出返回结果是个Promise对象，可以通过resolve判断是否导出成功
      	tableToExcel(columns, dataSource,"LoadingDownLoad").then(() =>{
          Modal.alert({title:'下载成功！'})
        })
        this.setState({loading:false});
    },1000);
  }
  render() {   
    return (
      <div>
        <Button onClick={this.handleDownload}>Simple DownLoad </Button>
        <Button onClick={this.handleLoadingDownLoad} loading={this.state.loading}>Loading DownLoad </Button>
        <Table dataSource = {dataSource} columns={columns} bordered rowKey="key"/>
      </div>
    );
  }
}

const columns = [
      {
        title: '序号',
        dataIndex: 'index',
        key: 'index',
        width:100,
        render:(_,__,index) => `${index + 1}`
      },
      {
        title: '姓名',
        dataIndex: 'name',
        key: 'name',
      },{
        title: '年龄',
        dataIndex: 'age',
        key: 'age'
      },{
        title: '住址',
        dataIndex: 'address',
        key: 'address',
        render:text => <div>{text}</div>
      }
];

const dataSource = [
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
ReactDOM.render(<App />, mountNode);
````



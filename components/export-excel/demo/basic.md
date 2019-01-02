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
import { Exportexcel,Icon} from 'wmstool';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state={
      columnsSource:[
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
      ],
      dataSource:[
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
      ],
      isPort:false,
    }
  }
  onClick=()=>{
    let {columnsSource,dataSource}=this.state
    this.handleExport(columnsSource,dataSource)
  }
  render() {   
    return (
      <div>
        <Icon type="download" onClick={this.onClick}/>
        <Exportexcel getExportExcel={fn => this.handleExport = fn}  linkName={"下载666.xls"} />
      </div>
    );
  }
}

ReactDOM.render(<App />, mountNode);
````



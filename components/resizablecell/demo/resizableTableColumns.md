---
order: 3
title:
  en-US: Resizable columns
  zh-CN: 可伸缩列单元格
---

## zh-CN

集成 react-resizable 来实现可伸缩列。

## en-US

Implement resizable column by integrate with react-resizable.

```jsx
import { Table, ResizableCell} from "wmstool";
const ResizableColumnsTable = ResizableCell.resizableColumnsTableWrapper(Table)
class Demo extends React.Component {
  state = {
    columns: [
      {
        title: "Date",
        dataIndex: "date",
        width: 200,
      },
      {
        title: "Amount",
        dataIndex: "amount",
        width: 100,
      },
      {
        title: "Type",
        dataIndex: "type",
        width: 100,
      },
      {
        title: "Note",
        dataIndex: "note",
        ellipsis: true,
        width: 100,
      },
      {
        title: "Action",
        key: "action",
        render: () => <a>Delete</a>,
      },
    ],
  };
  data = [
    {
      key: 0,
      date: "2018-02-11",
      amount: 120,
      type: "income",
      note: "transfer",
    },
    {
      key: 1,
      date: "2018-03-11",
      amount: 243,
      type: "income",
      note: "transfer",
    },
    {
      key: 2,
      date: "2018-04-11",
      amount: 98,
      type: "income",
      note: "Sidney No. 1 Lake Park, Sidney No. 1 Lake Park;Test Es",
    },
  ];
  render() {
    return (
    <ResizableColumnsTable
        bordered
        pagination={false}
        columns={this.state.columns}
        dataSource={this.data}
      />
    );
  }
}

ReactDOM.render(<Demo/>, mountNode);
```
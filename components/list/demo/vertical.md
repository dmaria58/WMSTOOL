---
order: 3
title:
  zh-CN: 竖排列表样式
  en-US: Vertical
---

## zh-CN

通过设置 `itemLayout` 属性为 `vertical` 可实现竖排列表样式。

## en-US

Setting `itemLayout` property with `vertical` to create a vertical list.

````jsx
import { List, Avatar, Icon } from 'antd';

const listData = [];
for (let i = 0; i < 5; i++) {
  listData.push({
    href: 'http://ant.design',
    title: `ant design part ${i}`,
    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    description: 'Ant Design, a design language for background applications, is refined by Ant UED Team.',
    content: 'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
  });
}

const pagination = {
  pageSize: 10,
  current: 1,
  total: listData.length,
  onChange: (() => {}),
};

const IconText = ({ type, text }) => (
  <span>
    <Icon type={type} style={{ marginRight: 8 }} />
    {text}
  </span>
);

ReactDOM.render(
  <List
    itemLayout="vertical"
    size="large"
    pagination={pagination}
    dataSource={listData}
    renderItem={item => (
      <List.Item
        key={item.title}
        actions={[<IconText type="star-o" text="156" />, <IconText type="like-o" text="156" />, <IconText type="message" text="2" />]}
        extra={<img width={272} alt="logo" src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png" />}
      >
        <List.Item.Meta
          avatar={<Avatar src={item.avatar} />}
          title={<a href={item.href}>{item.title}</a>}
          description={item.description}
        />
        {item.content}
      </List.Item>
    )}
  />
, mountNode);
````

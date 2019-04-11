---
category: Components
subtitle: 基本
type: Data Display
title: Drag
---

拖拽绑定数据。

## 何时使用

- 拖拽绑定数据

## API

### DragContainer

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| dataSource | 数据| object | {} |
| onChange | 拖拽后返回新数据 | func |  |
| getStore | 拖拽数据管理对象 | noop |  |

### DragableCard

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| name | dataSource的属性值| string | "" |
| component? | 渲染的元素 | string | div |
| canDrag? | 是否可以推拽 | boolean or func(props,monitor) => boolean | true |
| canDrop? | 是否可以推拽到该元素 | boolean or func(props,monitor) => boolean | true |
| beginDrag? | 开始拖拽时触发，需要返回对象  | func(props,monitor,component) =>{ id,name,index} | {id,name,index} |
| endDrag? | 结束拖拽时触发  | func(props,monitor,component) => void | 当canDrop为tr返回{move: true}时拖拽成功 |
| drop? | 结束拖拽时触发  | func(props,monitor,component) => {} | {move: true} |
| hover? | 停留在元素上触发，默认拖拽时机  | func(props,monitor,component) =>{ } | 默认拖拽时机，可以覆盖 |
| onChange? | 拖拽数据改变触发  | noop | 默认拖拽时机，可以覆盖 |
| children? | 列表渲染  | (values,props) => ReactNode | 默认返回DragItem的list |
| renderItem | item项渲染方法  | (values,props) => ReactNode | 默认返回DragItem的list |


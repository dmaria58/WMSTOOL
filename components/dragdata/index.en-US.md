---
category: Components
subtitle: 拖拽数据重新绑定
type: Data Display
title: DragData
---

拖拽绑定数据。

## 何时使用

- 拖拽绑定数据

## API

### DragData

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| type | 拖拽类型，必填| string |  |
| clickId | 选中标识 | string||number | 无 |
| dataSource | 数据| object[] | [] |
| getChangeSource | 拖拽后返回新数据 | func |  |
| onClick | 选中事件（有clickId才会生效） | func | 无 |




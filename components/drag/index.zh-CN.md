---
category: Components
subtitle: 基本
cols: 1
type: Data Display
title: Drag
---

拖拽绑定数据。

## 何时使用

- 拖拽绑定数据

## API

### DragCard

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| id |  拖拽数据id| string |  |
| text |  拖拽行显示的文字| string |  |
| isChange | 是否允许互换| boolean | true |
| onChange | 当前拖拽的数据,（id：目标id,dragItem：被拖拽的数据） | Function(id, dragItem) {} |  |



---
category: Components
subtitle: 可伸缩容器
type: Data Entry
title: ResizableCell
---

## 何时使用

可以拖拽右侧边框，容器伸缩

## API

### ResizableCell

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| resize | 当前拖拽的触发位置,'right':右边框, 'bottom'，底部边框, 'lower-right':右下角 | string | 'right'
| dataSource | 当前操作数据| array |[]|
| onChange | 回调时间 | func | 无 |
| resizableColumnsTableWrapper | columns可以伸缩 | Function(Table) | 把Table组件传进去，会自动处理th,具体用法参照demo |





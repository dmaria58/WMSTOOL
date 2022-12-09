---
category: Components
subtitle: Excel导出数据
type: Data Display
title: Exportexcel
---

Excel导出数据。

## 何时使用

- 用于数据导出

## API

### exportTableExcel
直接使用Table相关的Columns、DataSource即可实现下载，无需特殊处理render/title等React Node节点
*暂不支持表头合并单元格、表格样式、边框*

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| columns | 表头，同Table  [columns](/components/table/) | object[]  | [] |
| dataSource | 数据，同table  [columns](/components/dataSource/) | object[] | [] |
| fileName | excel下载名称 | string | `${new Date().valueOf()}.xlsx` |


### exportXlsx
接近原生exceljs导出，

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| columns | excel 表头：[{header:'标题头部',key:对应row的key，,width:宽度}]  | ExcelColumn[]  | [] |
| dataSource |  excel 表内容：[{name:'张三',age:'1'}] 或者对象数组：纯数组：['张三','1']| object[] | [] |
| fileName | 导出文件名 | string | `${new Date().valueOf()}.xlsx` |



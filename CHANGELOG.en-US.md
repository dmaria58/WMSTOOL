---
order: 6
title: 更新日志
toc: false
timeline: true
---

`wmstool` 严格遵循 [Semantic Versioning 2.0.0](http://semver.org/lang/zh-CN/) 语义化版本规范。

#### 发布周期

未定义

---
## 3.0.5
`2023-01-10`

- 🐞  修复 ： 修复 copy-to-clipboard 依赖未声明的安全性问题。
  
## 3.0.4
`2023-01-09`

- 🐞  修复 ： 修复 rc-calendar 版本低导致的locale语言丢失问题。

## 3.0.3
`2023-01-06`

- 🐞  修复 ： 修复 wmstool 打包后引入错误的问题。
- 🐞  更新 ： 更新 wmstool/lib 引入路径为 wmstool/es。
  
## 3.0.2
`2023-01-06`

- 🐞  新特性 ： 新增 Typography 组件。
- 🐞  新特性 ： 新增 Empty 组件。
- 🐞  新特性 ： 新增 LocaleProvider 组件。
- 🐞  新特性 ： 新增 ConfigProvider 组件。

## 3.0.1
`2022-12-12`

- 🐞  修复 ： 修复 R3.0.0 版本代码合并问题。
- 🐞  修复 ： 修复 webpack5 打包编译 version 直接导出问题。

## 3.0.0
`2021`

- 🐞  修复 ： Easyform校验fun(),传入数组传出字符串，修改成传入数据类型和传出数据类型一样
- 🐞  修复 ： Exportexcel导出后的Excel文件不标准导致的提示文件格式不正确的问题
- 🐞  table增加ellipsis属性 ：columns 中设置 ellipsis: true,超过单元格宽度会自动显示省略号
- 🐞  增加ResizableCell组件 ：可伸缩容器，可以放入任何类型实现拖拽
- 🐞  table实现columns（th）可以拖拽 ：table使用ResizableCell中resizableColumnsTableWrapper方法实现拖拽功能

## 2.1.3
`2020-11-30`

- 🐞 修复MultipleInput 不触发下拉框删除，再输入，没有把值传出的错误

## 2.1.2

`2020-11-13`

- 🐞 修改MultipleInput输入内容不去空格

## 2.1.1

`2020-11-13`

- 🐞 修改MultipleInput组件输入值前后去空格、easyform 0校验bug重新修复

## 2.1.0

`2020-11-06`

- 🐞 新增MultipleInput组件、select默认不查询设置、easyform 0校验bug修复

## 2.0.2

`2020-10-15`

- 🐞 table、select虚拟滚动优化

## 2.0.1

`2020-10-16`

- 🐞 table展开树样式调整

## 2.0.0

`2020-10-14`

- 🐞 select、tree-select样式调整

## 1.5.5

`2020-07-23`

- 🐞 table、select虚拟滚动优化
- 
## 1.5.4

`2019-07-17`

- 🐞 dragdata bug修复

## 1.5.2/1.5.3

`2019-04-28`

- 🐞 新增drag组件
- 🐞 dragdata新增多级拖拽功能

## 1.5.1

`2019-02-17`

- 🐞 Table shift快捷键选中支持反选

## 1.4.15

`2019-01-07`

- 🐞 Table 导出列可编辑bug修复
- 🐞 Exportexcel 导出数字bug修复，导出空bug修复

## 1.4.14

`2019-01-02`

- 🐞 Table 可隐藏列选择框下拉样式修改
- 🐞 Table 新增shiftSelect属性，shift快捷多选
- 🐞 Table 新增downloadExcelData属性，实现excel导出功能
- 🐞 Exportexcel 新增Excel导出数据组件

## 1.4.13

`2018-10-29`

- 🐞 更新rc-select版本修复select bug

## 1.4.12

`2018-10-25`

- 🐞 table 可编辑表格排序优化，新增columnsChangeData

## 1.4.11

`2018-09-13`

- 🐞 table 新增 isMaxData属性 支持懒加载
- 🐞 input 新增allowClear属性 支持一键清空
 
## 1.4.9

`2018-06-20`

- 🐞 radio组件（不可取消选择）

## 1.4.8

`2018-04-16`

- 🐞 新增组建 Dragdata，拖拽数据绑定组件

## 1.4.5

`2018-03-19`

- 🐞 新增组建 Easyform，快速表单验证

## 1.4.4

`2018-02-22`

- 🐞 table 新增 returnSelectColumn 在isColumnsChange 模式下自定义项发生变化回调，返回显示列
- 🐞 table 在isColumnsChange 模式下点击图标样式修改

## 1.3.4

`2018-02-22`

- 🐞 tree 新增 isnohalfChecked【 去半选模式 设置为true时全部为√图标 】
- 🐞 table 修复onRowClick 事件bug

## 1.2.4

`2018-01-26`

- 🐞 Transfer 新增 culomsList【自定义表头】
- 🐞 table新增 selecttype 属性【是否点击行选中】此模式支持radio框取消选择
- 🐞 table新增 isColumnsChange【是否可隐藏columns】ColumnsChangeList【首次加载默认显示的列表项为空时默认全部columns】
- 🐞 Scollapse新增 closetype 【收起时展示的图标 默认 "search"】
- 🐞 修复Scollapse console bug

## 1.1.4

`2018-01-22`

- 🐞 修改radio组件（可取消选择）
- 🐞 新增组件Scollapse
- 🐞 css class头统一修改成wmstool
- 🐞 css 字体包内引（避免内网模式无法访问）

## 1.0.3

`2017-12-27`

- 🐞 提交第一次版本
- 🐞 丰富demo


---
order: 0
title:
  zh-CN: 典型查询框折叠板
  en-US: Basic scollapse
---

## zh-CN

包含是否默认展开。

## en-US

A basic card containing a title, content and an extra corner content.

````jsx
import { Scollapse,Icon,Popover} from 'wmstool';
const contents=(
  <div>
    <p>Content</p>
    <p>Content</p>
  </div>
);
const content= (
  <Popover placement="bottom" title={"说明"} content={contents} >
     <Icon type="question-circle-o" />
  </Popover>
 )
ReactDOM.render(
    <div>
  <Scollapse isopen={true} addicon={content}>
    <p>Card content</p>
    <p>Card content</p>
    <p>Card content</p>
  </Scollapse>
  <br></br>
  <Scollapse isopen={false}>
    <p>Card content</p>
    <p>Card content</p>
    <p>Card content</p>
  </Scollapse>
  <br></br>
  <Scollapse >
    <p>Card content</p>
    <p>Card content</p>
    <p>Card content</p>
  </Scollapse>
  </div>
  , mountNode);
````



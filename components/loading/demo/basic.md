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
import { Loading,Icon,Popover} from 'wmstool';
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
 let hj=Loading.open();
ReactDOM.render(
    <div>
<Loading />
  </div>
  , mountNode);
````



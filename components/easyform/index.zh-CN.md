---
category: Components
subtitle: 简易表单验证
type: Data Display
title: Easyform
---

查询框折叠框。

## 何时使用

- 用于展开折叠

## API

### Easyform

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| rules | 验证规则 maxnum(最大),minnum（最小）,pattern（正则），required(必填) ,func（自定义方法，返回Boolean）| object[] | [] |
| easyCheckValue | 需要验证的value | string | string |
| easyCheck | 非修改input框开启验证（如最后submit，但是输入框未做修改） | boolean | false |
| isright | 验证成功与否参数返回 | boolean |  |

```javascript
{
    easydata: {
        rules: [
            {required: true, message: "This input can not be null!" },
            {pattern: /^[\d]+$/, message: "is not a num"},
            {func:easyCheckValue => {return false},message:"input is invalid"}]
    }
}
```


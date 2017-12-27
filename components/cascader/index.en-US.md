---
category: Components
type: Data Entry
title: Cascader
---

Cascade selection box.

## When To Use

- When you need to select from a set of associated data set. Such as province/city/district, company level, things classification.
- When selecting from a large data set, with multi-stage classification separated for easy selection.
- Chooses cascade items in one float layer for better user experience.

## API

```html
<Cascader options={options} onChange={onChange} />
```

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| allowClear | whether allow clear | boolean | true |
| autoFocus | get focus when component mounted | boolean | false |
| changeOnSelect | change value on each selection if set to true, see above demo for details | boolean | false |
| className | additional css class | string | - |
| defaultValue | initial selected value | string\[] | \[] |
| disabled | whether disabled select | boolean | false |
| displayRender | render function of displaying selected options | `(label, selectedOptions) => ReactNode` | `label => label.join(' / ')` |
| expandTrigger | expand current item when click or hover, one of 'click' 'hover' | string | 'click' |
| getPopupContainer | Parent Node which the selector should be rendered to. Default to `body`. When position issues happen, try to modify it into scrollable content and position it relative.[example](https://codepen.io/afc163/pen/zEjNOy?editors=0010) | Function(triggerNode) | () => document.body |
| loadData | To load option lazily, and it cannot work with `showSearch` | `(selectedOptions) => void` | - |
| notFoundContent | Specify content to show when no result matches. | string | 'Not Found' |
| options | data options of cascade | object | - |
| placeholder | input placeholder | string | 'Please select' |
| popupClassName | additional className of popup overlay | string | - |
| popupPlacement | use preset popup align config from builtinPlacements：`bottomLeft` `bottomRight` `topLeft` `topRight` | string | `bottomLeft` |
| showSearch | Whether show search input in single mode. | boolean\|object | false |
| size | input size, one of `large` `default` `small` | string | `default` |
| style | additional style | string | - |
| value | selected value | string\[] | - |
| onChange | callback when finishing cascader select | `(value, selectedOptions) => void` | - |
| onPopupVisibleChange | callback when popup shown or hidden | `(value) => void` | - |
| popupVisible | set visible of cascader popup | boolean | - |

Fields in `showSearch`:

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| filter | The function will receive two arguments, inputValue and option, if the function returns true, the option will be included in the filtered set; Otherwise, it will be excluded. | `function(inputValue, path): boolean` |  |
| matchInputWidth | Whether the width of result list equals to input's | boolean |  |
| render | Used to render filtered options. | `function(inputValue, path): ReactNode` |  |
| sort | Used to sort filtered options. | `function(a, b, inputValue)` |  |

## Methods

| Name | Description |
| ---- | ----------- |
| focus() | get focus |
| blur() | remove focus |

<style>
.ant-cascader-picker {
  width: 300px;
}
</style>

export const omit = (props: any, keys: string[]) => {
  return Object.keys(props).reduce((pre: any,key: string) => {
    if (keys.includes(key)) return pre;
    pre[key] = props[key];
    return pre;
  },{})
}
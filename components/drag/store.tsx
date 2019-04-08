/**
 *@Description
 *@Date: 2019-03-11 10:20
 */

 interface DragStore {
   values: Object;
 }

export default class Store implements DragStore {
  values: any;
  defaultValues: any;
  listeners: any[];
  confirmValues: string;
  constructor(
    values: object,
  ){
    this.values = values;
    this.defaultValues = JSON.parse(JSON.stringify(values));
    this.listeners = [];
    this.confirmValues = JSON.stringify(this.values);
  }

  get(name?: string) {
    return name ? this.values[name] || '': this.values;
  };
  
  set(name:string,value: any) {
    this.values[name] = value;
    this.notify(name)
  }

  move(from:any,to:any) {
    if (from.name === to.name && to.data) {
      this.swap(from.name,from.index, to.index);
      return;
    }
    let fromData = from.data;
    let fromValues = this.get(from.name)
    let toValues = this.get(to.name).slice(0)
    fromValues = fromValues.filter((value:any) => value.id !== fromData.id);
    if (toValues.find((vo:any) => vo.id === fromData.id)) {
      return;
    }
    toValues.splice(to.index,0,fromData)
    this.set(from.name,fromValues)
    this.set(to.name,toValues)
  }

  confirm() {
    this.confirmValues = JSON.stringify(this.values);
    this.notify("*")
  }

  fallback() {
    this.reset(JSON.parse(this.confirmValues));
  }

  swap(name: string, fromIndex:number, toIndex:number) {
    let values = this.get(name).slice(0);
    [values[fromIndex], values[toIndex]] = [values[toIndex], values[fromIndex]]
    this.set(name,values);
  }
  
  subscribe(listener:() => any) {
    this.listeners.push(listener);
    return () => {
      let index = this.listeners.indexOf(listener);
      this.listeners.splice(index,1)
    }
  }
  
  notify(name: string) {
    this.listeners.forEach(fn => fn(name))
  }
  
  reset(values: any) {
    if (!values) {
      values = {...this.defaultValues}
    }
    this.values = values;
    this.confirmValues = JSON.stringify(this.values);
    this.notify('*')
  }
  
}
---
order: 0
title:
    zh-CN: 允许清除
    en-US: allow clear
---

## zh-CN

允许清除

## en-US

allow clear

````jsx
import { Input, Icon } from 'wmstool';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      nickName: '',
    };
  }
  render() {
    const { userName,nickName } = this.state;
    return (
     <div>
       <div style={{ marginBottom: 16 }}>
         <Input defaultValue="非受控组件" allowClear onChange={e => console.log(e)}/>
       </div>
       <div style={{ marginBottom: 16 }}>
         <Input value={nickName} allowClear onChange={e => this.setState({nickName:e.target.value})}/>
       </div>
       <div style={{ marginBottom: 16 }}>
         <Input 
             value={userName} 
             suffix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
             allowClear 
             onChange={e => this.setState({userName:e.target.value})}
         />
       </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, mountNode);

````

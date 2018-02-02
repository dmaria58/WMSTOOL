/*import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Icon from '../icon'; 
export type ModalFuncProps=()=>{
  destroy: () => void,
  close: () => void,
};
export default function Loading(config: ModalFuncProps){
  let div = document.createElement('div');
  document.body.appendChild(div);
  function distroy(...args: any[]){
    const unmountResult = ReactDOM.unmountComponentAtNode(div);
    if (unmountResult && div.parentNode) {
      div.parentNode.removeChild(div);
    }
   }
  function render(props: any) {
    ReactDOM.render(<div><Icon type={props.type}></div>, div);
  }

  render({config});

  return {
    destroy: distroy,
  };
};
export default function Loading(config: ModalFuncProps) {
  let div = document.createElement('div');
  document.body.appendChild(div);



  function destroy() {
    let unmountResult=ReactDOM.unmountComponentAtNode(div);
    if (unmountResult && div.parentNode) {
      div.parentNode.removeChild(div);
    }
  }

  function render() {
    ReactDOM.render(<div><Icon type="loading"></div>, div);
  }

  render();

  return {destroy};
}
*/
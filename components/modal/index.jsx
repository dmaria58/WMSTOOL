import Modal from './Modal';
import confirm from './confirm';
Modal.info = function (props) {
    const config = Object.assign({ type: 'info', iconType: 'info-circle', okCancel: false }, props);
    return confirm(config);
};
Modal.success = function (props) {
    const config = Object.assign({ type: 'success', iconType: 'check-circle', okCancel: false }, props);
    return confirm(config);
};
Modal.error = function (props) {
    const config = Object.assign({ type: 'error', iconType: 'cross-circle', okCancel: false }, props);
    return confirm(config);
};
Modal.warning = Modal.warn = function (props) {
    const config = Object.assign({ type: 'warning', iconType: 'exclamation-circle', okCancel: false }, props);
    return confirm(config);
};
Modal.confirm = function (props) {
    const config = Object.assign({ type: 'confirm', okCancel: true }, props);
    return confirm(config);
};
export default Modal;

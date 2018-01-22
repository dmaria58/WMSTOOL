import * as React from 'react';
import Notification from 'rc-notification';
import Icon from '../icon';
let defaultDuration = 3;
let defaultTop;
let messageInstance;
let key = 1;
let prefixCls = 'wmstool-message';
let getContainer;
function getMessageInstance(callback) {
    if (messageInstance) {
        callback(messageInstance);
        return;
    }
    Notification.newInstance({
        prefixCls,
        transitionName: 'move-up',
        style: { top: defaultTop },
        getContainer,
    }, (instance) => {
        if (messageInstance) {
            callback(messageInstance);
            return;
        }
        messageInstance = instance;
        callback(instance);
    });
}
function notice(content, duration = defaultDuration, type, onClose) {
    let iconType = ({
        info: 'info-circle',
        success: 'check-circle',
        error: 'cross-circle',
        warning: 'exclamation-circle',
        loading: 'loading',
    })[type];
    if (typeof duration === 'function') {
        onClose = duration;
        duration = defaultDuration;
    }
    const target = key++;
    getMessageInstance((instance) => {
        instance.notice({
            key: target,
            duration,
            style: {},
            content: (<div className={`${prefixCls}-custom-content ${prefixCls}-${type}`}>
          <Icon type={iconType}/>
          <span>{content}</span>
        </div>),
            onClose,
        });
    });
    return () => {
        if (messageInstance) {
            messageInstance.removeNotice(target);
        }
    };
}
export default {
    info(content, duration, onClose) {
        return notice(content, duration, 'info', onClose);
    },
    success(content, duration, onClose) {
        return notice(content, duration, 'success', onClose);
    },
    error(content, duration, onClose) {
        return notice(content, duration, 'error', onClose);
    },
    // Departed usage, please use warning()
    warn(content, duration, onClose) {
        return notice(content, duration, 'warning', onClose);
    },
    warning(content, duration, onClose) {
        return notice(content, duration, 'warning', onClose);
    },
    loading(content, duration, onClose) {
        return notice(content, duration, 'loading', onClose);
    },
    config(options) {
        if (options.top !== undefined) {
            defaultTop = options.top;
            messageInstance = null; // delete messageInstance for new defaultTop
        }
        if (options.duration !== undefined) {
            defaultDuration = options.duration;
        }
        if (options.prefixCls !== undefined) {
            prefixCls = options.prefixCls;
        }
        if (options.getContainer !== undefined) {
            getContainer = options.getContainer;
        }
    },
    destroy() {
        if (messageInstance) {
            messageInstance.destroy();
            messageInstance = null;
        }
    },
};

import * as React from 'react';
import PropTypes from 'prop-types';
import { cloneElement } from 'react';
import warning from '../_util/warning';
import BreadcrumbItem from './BreadcrumbItem';
import classNames from 'classnames';
function getBreadcrumbName(route, params) {
    if (!route.breadcrumbName) {
        return null;
    }
    const paramsKeys = Object.keys(params).join('|');
    const name = route.breadcrumbName.replace(new RegExp(`:(${paramsKeys})`, 'g'), (replacement, key) => params[key] || replacement);
    return name;
}
function defaultItemRender(route, params, routes, paths) {
    const isLastItem = routes.indexOf(route) === routes.length - 1;
    const name = getBreadcrumbName(route, params);
    return isLastItem
        ? <span>{name}</span>
        : <a href={`#/${paths.join('/')}`}>{name}</a>;
}
export default class Breadcrumb extends React.Component {
    componentDidMount() {
        const props = this.props;
        warning(!('linkRender' in props || 'nameRender' in props), '`linkRender` and `nameRender` are removed, please use `itemRender` instead, ' +
            'see: https://u.ant.design/item-render.');
    }
    render() {
        let crumbs;
        const { separator, prefixCls, style, className, routes, params = {}, children, itemRender = defaultItemRender, } = this.props;
        if (routes && routes.length > 0) {
            const paths = [];
            crumbs = routes.map((route) => {
                route.path = route.path || '';
                let path = route.path.replace(/^\//, '');
                Object.keys(params).forEach(key => {
                    path = path.replace(`:${key}`, params[key]);
                });
                if (path) {
                    paths.push(path);
                }
                return (<BreadcrumbItem separator={separator} key={route.breadcrumbName || path}>
            {itemRender(route, params, routes, paths)}
          </BreadcrumbItem>);
            });
        }
        else if (children) {
            crumbs = React.Children.map(children, (element, index) => {
                if (!element) {
                    return element;
                }
                warning(element.type && element.type.__ANT_BREADCRUMB_ITEM, 'Breadcrumb only accepts Breadcrumb.Item as it\'s children');
                return cloneElement(element, {
                    separator,
                    key: index,
                });
            });
        }
        return (<div className={classNames(className, prefixCls)} style={style}>
        {crumbs}
      </div>);
    }
}
Breadcrumb.defaultProps = {
    prefixCls: 'wmstool-breadcrumb',
    separator: '/',
};
Breadcrumb.propTypes = {
    prefixCls: PropTypes.string,
    separator: PropTypes.node,
    routes: PropTypes.array,
    params: PropTypes.object,
    linkRender: PropTypes.func,
    nameRender: PropTypes.func,
};

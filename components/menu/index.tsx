import * as React from 'react';
import RcMenu, { Divider, ItemGroup } from 'rc-menu';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import animation from '../_util/openAnimation';
import warning from '../_util/warning';
import SubMenu from './SubMenu';
import Item from './MenuItem';
import { SliderContext } from '../layout/Sider';

export interface SelectParam {
  key: string;
  keyPath: Array<string>;
  item: any;
  domEvent: any;
  selectedKeys: Array<string>;
}

export interface ClickParam {
  key: string;
  keyPath: Array<string>;
  item: any;
  domEvent: any;
}

export type MenuMode = 'vertical' | 'vertical-left' | 'vertical-right' | 'horizontal' | 'inline';

export interface MenuProps {
  id?: string;
  theme?: 'light' | 'dark';
  mode?: MenuMode;
  selectable?: boolean;
  selectedKeys?: Array<string>;
  defaultSelectedKeys?: Array<string>;
  openKeys?: Array<string>;
  defaultOpenKeys?: Array<string>;
  onOpenChange?: (openKeys: string[]) => void;
  onSelect?: (param: SelectParam) => void;
  onDeselect?: (param: SelectParam) => void;
  onClick?: (param: ClickParam) => void;
  style?: React.CSSProperties;
  openAnimation?: string | Object;
  openTransitionName?: string | Object;
  className?: string;
  prefixCls?: string;
  multiple?: boolean;
  inlineIndent?: number;
  inlineCollapsed?: boolean;
}

export interface MenuState {
  openKeys: string[];
}

export default class Menu extends React.Component<MenuProps, MenuState> {
  static Divider = Divider;
  static Item = Item;
  static SubMenu = SubMenu;
  static ItemGroup = ItemGroup;
  static defaultProps = {
    prefixCls: 'wmstool-menu',
    className: '',
    theme: 'light',  // or dark
  };
  static childContextTypes = {
    inlineCollapsed: PropTypes.bool,
    antdMenuTheme: PropTypes.string,
  };
  static contextTypes = {
    siderCollapsed: PropTypes.bool,
    collapsedWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  };
  switchModeFromInline: boolean;
  leaveAnimationExecutedWhenInlineCollapsed: boolean;
  inlineOpenKeys: string[] = [];
  constructor(props: MenuProps) {
    super(props);

    warning(
      !('onOpen' in props || 'onClose' in props),
      'Menu',
      '`onOpen` and `onClose` are removed, please use `onOpenChange` instead, ' +
      'see: https://u.ant.design/menu-on-open-change.',
    );

    warning(
      !('inlineCollapsed' in props && props.mode !== 'inline'),
      'Menu',
      '`inlineCollapsed` should only be used when Menu\'s `mode` is inline.',
    );

    let openKeys;
    if ('defaultOpenKeys' in props) {
      openKeys = props.defaultOpenKeys;
    } else if ('openKeys' in props) {
      openKeys = props.openKeys;
    }

    this.state = {
      openKeys: openKeys || [],
    };
  }
  getChildContext() {
    return {
      inlineCollapsed: this.getInlineCollapsed(),
      antdMenuTheme: this.props.theme,
    };
  }
  componentWillReceiveProps(nextProps: MenuProps, nextContext: SliderContext) {
    if (this.props.mode === 'inline' &&
        nextProps.mode !== 'inline') {
      this.switchModeFromInline = true;
    }
    if ('openKeys' in nextProps) {
      this.setState({ openKeys: nextProps.openKeys! });
      return;
    }
    if ((nextProps.inlineCollapsed && !this.props.inlineCollapsed) ||
        (nextContext.siderCollapsed && !this.context.siderCollapsed)) {
      this.switchModeFromInline = !!this.state.openKeys.length;
      this.inlineOpenKeys = this.state.openKeys;
      this.setState({ openKeys: [] });
    }
    if ((!nextProps.inlineCollapsed && this.props.inlineCollapsed) ||
        (!nextContext.siderCollapsed && this.context.siderCollapsed)) {
      this.setState({ openKeys: this.inlineOpenKeys });
      this.inlineOpenKeys = [];
    }
  }
  handleClick = (e: ClickParam) => {
    this.handleOpenChange([]);

    const { onClick } = this.props;
    if (onClick) {
      onClick(e);
    }
  }
  handleOpenChange = (openKeys: string[]) => {
    this.setOpenKeys(openKeys);

    const { onOpenChange } = this.props;
    if (onOpenChange) {
      onOpenChange(openKeys);
    }
  }
  setOpenKeys(openKeys: string[]) {
    if (!('openKeys' in this.props)) {
      this.setState({ openKeys });
    }
  }
  getRealMenuMode() {
    const inlineCollapsed = this.getInlineCollapsed();
    if (this.switchModeFromInline && inlineCollapsed && this.leaveAnimationExecutedWhenInlineCollapsed) {
      this.leaveAnimationExecutedWhenInlineCollapsed = false;
      return 'inline';
    }
    const { mode } = this.props;
    return inlineCollapsed ? 'vertical' : mode;
  }
  getInlineCollapsed() {
    const { inlineCollapsed } = this.props;
    if (this.context.siderCollapsed !== undefined) {
      return this.context.siderCollapsed;
    }
    return inlineCollapsed;
  }
  getMenuOpenAnimation(menuMode: MenuMode) {
    const { openAnimation, openTransitionName } = this.props;
    let menuOpenAnimation = openAnimation || openTransitionName;
    if (openAnimation === undefined && openTransitionName === undefined) {
      switch (menuMode) {
        case 'horizontal':
          menuOpenAnimation = 'slide-up';
          break;
        case 'vertical':
        case 'vertical-left':
        case 'vertical-right':
          // When mode switch from inline
          // submenu should hide without animation
          if (this.switchModeFromInline) {
            menuOpenAnimation = '';
            this.switchModeFromInline = false;
          } else {
            menuOpenAnimation = 'zoom-big';
          }
          break;
        case 'inline':
          menuOpenAnimation = {
            ...animation,
            leave: (node: HTMLElement, done: () => void) => animation.leave(node, () => {
              // Make sure inline menu leave animation finished before mode is switched
              this.switchModeFromInline = false;
              // Fix https://github.com/wmstool-design/wmstool-design/issues/8475
              this.leaveAnimationExecutedWhenInlineCollapsed = true;
              this.setState({});
              // when inlineCollapsed change false to true, all submenu will be unmounted,
              // so that we don't need handle animation leaving.
              if (this.getRealMenuMode() === 'vertical') {
                return;
              }
              done();
            }),
          };
          break;
        default:
      }
    }
    return menuOpenAnimation;
  }

  render() {
    const { prefixCls, className, theme } = this.props;
    const menuMode = this.getRealMenuMode();
    const menuOpenAnimation = this.getMenuOpenAnimation(menuMode!);

    const menuClassName = classNames(className, `${prefixCls}-${theme}`, {
      [`${prefixCls}-inline-collapsed`]: this.getInlineCollapsed(),
    });

    const menuProps: MenuProps = {
      openKeys: this.state.openKeys,
      onOpenChange: this.handleOpenChange,
      className: menuClassName,
      mode: menuMode,
    };

    if (menuMode !== 'inline') {
      // closing vertical popup submenu after click it
      menuProps.onClick = this.handleClick;
      menuProps.openTransitionName = menuOpenAnimation;
    } else {
      menuProps.openAnimation = menuOpenAnimation;
    }

    // https://github.com/wmstool-design/wmstool-design/issues/8587
    const { collapsedWidth } = this.context;
    if (
      this.getInlineCollapsed() &&
      (collapsedWidth === 0 || collapsedWidth === '0' || collapsedWidth === '0px')
    ) {
      return null;
    }

    return <RcMenu {...this.props} {...menuProps} />;
  }
}

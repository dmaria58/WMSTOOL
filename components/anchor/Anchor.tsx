import * as React from 'react';
import * as ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import addEventListener from 'rc-util/lib/Dom/addEventListener';
import Affix from '../affix';
import AnchorLink from './AnchorLink';
import getScroll from '../_util/getScroll';
import getRequestAnimationFrame from '../_util/getRequestAnimationFrame';

function getDefaultTarget() {
  return window;
}

function getOffsetTop(element: HTMLElement): number {
  if (!element) {
    return 0;
  }

  if (!element.getClientRects().length) {
    return 0;
  }

  const rect = element.getBoundingClientRect();

  if (rect.width || rect.height) {
    const doc = element.ownerDocument;
    const docElem = doc.documentElement;
    return rect.top - docElem.clientTop;
  }

  return rect.top;
}

function easeInOutCubic(t: number, b: number, c: number, d: number) {
  const cc = c - b;
  t /= d / 2;
  if (t < 1) {
    return cc / 2 * t * t * t + b;
  }
  return cc / 2 * ((t -= 2) * t * t + 2) + b;
}

const reqAnimFrame = getRequestAnimationFrame();
function scrollTo(href: string, offsetTop = 0, target: () => Window | HTMLElement, callback = () => { }) {
  const scrollTop = getScroll(target(), true);
  const targetElement = document.getElementById(href.substring(1));
  if (!targetElement) {
    return;
  }
  const eleOffsetTop = getOffsetTop(targetElement);
  const targetScrollTop = scrollTop + eleOffsetTop - offsetTop;
  const startTime = Date.now();
  const frameFunc = () => {
    const timestamp = Date.now();
    const time = timestamp - startTime;
    window.scrollTo(window.pageXOffset, easeInOutCubic(time, scrollTop, targetScrollTop, 450));
    if (time < 450) {
      reqAnimFrame(frameFunc);
    } else {
      callback();
    }
  };
  reqAnimFrame(frameFunc);
  history.pushState(null, '', href);
}

type Section = {
  link: String;
  top: number;
};

export interface AnchorProps {
  prefixCls?: string;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
  offsetTop?: number;
  bounds?: number;
  affix?: boolean;
  showInkInFixed?: boolean;
  target?: () => HTMLElement | Window;
}

export default class Anchor extends React.Component<AnchorProps, any> {
  static Link: typeof AnchorLink;

  static defaultProps = {
    prefixCls: 'ant-anchor',
    affix: true,
    showInkInFixed: false,
  };

  static childContextTypes = {
    antAnchor: PropTypes.object,
  };

  private inkNode: HTMLSpanElement;

  private links: String[];
  private scrollEvent: any;
  private animating: boolean;

  constructor(props: AnchorProps) {
    super(props);
    this.state = {
      activeLink: null,
    };
    this.links = [];
  }

  getChildContext() {
    return {
      antAnchor: {
        registerLink: (link: String) => {
          if (!this.links.includes(link)) {
            this.links.push(link);
          }
        },
        unregisterLink: (link: String) => {
          const index = this.links.indexOf(link);
          if (index !== -1) {
            this.links.splice(index, 1);
          }
        },
        activeLink: this.state.activeLink,
        scrollTo: this.handleScrollTo,
      },
    };
  }

  componentDidMount() {
    const getTarget = this.props.target || getDefaultTarget;
    this.scrollEvent = addEventListener(getTarget(), 'scroll', this.handleScroll);
    this.handleScroll();
  }

  componentWillUnmount() {
    if (this.scrollEvent) {
      this.scrollEvent.remove();
    }
  }

  componentDidUpdate() {
    this.updateInk();
  }

  handleScroll = () => {
    if (this.animating) {
      return;
    }
    const { offsetTop, bounds } = this.props;
    this.setState({
      activeLink: this.getCurrentAnchor(offsetTop, bounds),
    });
  }

  handleScrollTo = (link: string) => {
    const { offsetTop, target = getDefaultTarget } = this.props;
    this.animating = true;
    this.setState({ activeLink: link });
    scrollTo(link, offsetTop, target, () => {
      this.animating = false;
    });
  }

  getCurrentAnchor(offsetTop = 0, bounds = 5) {
    let activeLink = '';
    if (typeof document === 'undefined') {
      return activeLink;
    }

    const linkSections: Array<Section> = [];
    this.links.forEach(link => {
      const target = document.getElementById(link.substring(1));
      if (target && getOffsetTop(target) < offsetTop + bounds) {
        const top = getOffsetTop(target);
        linkSections.push({
          link,
          top,
        });
      }
    });

    if (linkSections.length) {
      const maxSection = linkSections.reduce((prev, curr) => curr.top > prev.top ? curr : prev);
      return maxSection.link;
    }
    return '';
  }

  updateInk = () => {
    if (typeof document === 'undefined') {
      return;
    }
    const { prefixCls } = this.props;
    const linkNode = ReactDOM.findDOMNode(this as any).getElementsByClassName(`${prefixCls}-link-title-active`)[0];
    if (linkNode) {
      this.inkNode.style.top = `${(linkNode as any).offsetTop + linkNode.clientHeight / 2 - 4.5}px`;
    }
  }

  saveInkNode = (node: HTMLSpanElement) => {
    this.inkNode = node;
  }

  render() {
    const {
      prefixCls,
      className = '',
      style,
      offsetTop,
      affix,
      showInkInFixed,
      children,
    } = this.props;
    const { activeLink } = this.state;

    const inkClass = classNames(`${prefixCls}-ink-ball`, {
      visible: activeLink,
    });

    const wrapperClass = classNames(className, `${prefixCls}-wrapper`);

    const anchorClass = classNames(prefixCls, {
      'fixed': !affix && !showInkInFixed,
    });

    const anchorContent = (
      <div className={wrapperClass} style={style}>
        <div className={anchorClass}>
          <div className={`${prefixCls}-ink`} >
            <span className={inkClass} ref={this.saveInkNode} />
          </div>
          {children}
        </div>
      </div>
    );

    return !affix ? anchorContent : (
      <Affix offsetTop={offsetTop}>
        {anchorContent}
      </Affix>
    );
  }
}

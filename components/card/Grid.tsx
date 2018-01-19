import * as React from 'react';
import classNames from 'classnames';

export interface CardGridProps {
  prefixCls?: string;
  style?: React.CSSProperties;
  className?: string;
}

export default (props: CardGridProps) => {
  const { prefixCls = 'wmstool-card', className, ...others } = props;
  const classString = classNames(`${prefixCls}-grid`, className);
  return <div {...others} className={classString} />;
};

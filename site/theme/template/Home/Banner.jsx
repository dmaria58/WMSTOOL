import React from 'react';
import { Link } from 'bisheng/router';
import { FormattedMessage } from 'react-intl';
import ScrollElement from 'rc-scroll-anim/lib/ScrollElement';
import GitHubButton from 'react-github-button';
import { Icon, Button } from 'wmstool';
import QueueAnim from 'rc-queue-anim';
import * as utils from '../utils';

function typeFunc(a) {
  if (a.key === 'line') {
    return 'left';
  } else if (a.key === 'button') {
    return 'bottom';
  }
  return 'right';
}

export default function Banner({ location }) {
  const isZhCN = utils.isZhCN(location.pathname);
  return (
    <section className="page " style={{"text-align":"center","background":"-webkit-gradient(linear, 0% 0%, 0% 100%, from(rgb(250, 252, 253)), to(rgb(255, 252, 215)))"}}>
      <ScrollElement
        className="page"
        id="banner"
        playScale={0.9}

      >
        <QueueAnim style={{"padding":"20px","top":"30%","position":"absolute","width":"100%"}} type={typeFunc} delay={300} key="banner">
        <h1 style={{"font-size":"91px","color":"#e64a0f"}}>WMSTOOL</h1>
        <h1 style={{color:"#efbeb0"}}>基于antd 3.0.3版本的react组建库</h1>
        </QueueAnim>
      </ScrollElement>
    </section>
  );
}

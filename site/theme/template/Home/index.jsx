import React from 'react';
import { injectIntl } from 'react-intl';
import DocumentTitle from 'react-document-title';
import { Icon } from 'wmstool';
import Banner from './Banner';
// To store style which is only for Home and has conflicts with others.
function getStyle() {
  return `
    .main-wrapper {
      padding: 0;
    }
    #header {
      box-shadow: none;
      width: 100%;
      position: absolute;
    }
    #header,
    #header .wmstool-select-selection,
    #header .wmstool-menu {
      background: transparent;
    }
  `;
}

const promoteBannerImageUrl = 'https://gw.alipayobjects.com/zos/rmsportal/qVVhewfLyIYZnqrBvfhy.png';

class Home extends React.Component {
  constructor(props) {
    super(props);
    const adBannerClosed = typeof window === 'undefined' ? true : (
      window.localStorage &&
      window.localStorage.getItem(`adBannerClosed-${promoteBannerImageUrl}`) === 'true'
    );
    this.state = { adBannerClosed };
  }
  closePromoteBanner = (e) => {
    e.preventDefault();
    this.makeAdBannerClosed();
  }
  makeAdBannerClosed = () => {
    this.setState({
      adBannerClosed: true,
    });
    if (window.localStorage) {
      window.localStorage.setItem(`adBannerClosed-${promoteBannerImageUrl}`, 'true');
    }
  }
  render() {
    const promoteBanner = this.state.adBannerClosed ? null : (
      <a href="http://seeconf.alipay.com/" className="promote-banner" onClick={this.makeAdBannerClosed}>
        <img
          src={promoteBannerImageUrl}
          alt="seeconf"
        />
        <Icon type="cross" title="close ad" onClick={this.closePromoteBanner} />
      </a>
    );
    return (
      <DocumentTitle title={`Ant Design - ${this.props.intl.formatMessage({ id: 'app.home.slogan' })}`}>
        <div className="main-wrapper">
          {promoteBanner}
          <Banner {...this.props} />
          <style dangerouslySetInnerHTML={{ __html: getStyle() }} />
        </div>
      </DocumentTitle>
    );
  }
}

export default injectIntl(Home);

/**
 * 分享组件，分享回调中不计入埋点
 */
import { Component } from 'react';
import { checkUrlProtocol } from '@util/util';
import { wbxiaoxiaoShare, wbxiaoxiaoCallback } from '@util/wbxiaoxiao';
import getUa from '@util/ua';
import Ashare from '@util/shareAll';
import loadScript from '@util/loadScript.js';

export default class Share extends Component {
  setShareConfig = () => {
    const share = this.props.share;
    const _url =
      share.pic !== ''
        ? checkUrlProtocol(share.pic)
        : 'https://img.58cdn.com.cn/weixin/r/school/moment/default-share.png';
    let shareInfo = {
      title: share.title,
      link: share.link || window.location.href,
      desc: share.desc,
      imgUrl: _url,
      success: () => {
        share.complete && share.complete();
        share.success && share.success();
      },
      cancel: () => {
        share.complete && share.complete();
      },
      callback: (state, source) => {
        share.complete && share.complete();
        if (state == 1) {
          share.callback && share.callback(source);
        }
      }
    };
    if (share.path) {
      shareInfo.path = share.path;
      shareInfo.miniAppPic = share.miniAppPic;
    }
    return shareInfo;
  };

  doShare() {
    //微信分享
    let shareConf = this.setShareConfig();
    if (typeof wxjs != 'undefined' && getUa().wx) {
      try {
        Ashare.wx(
          shareConf.title,
          shareConf.link,
          shareConf.desc,
          shareConf.imgUrl,
          'WX|PYQ|QQ|TXWB|QQZONE',
          shareConf.success,
          shareConf.cancel
        );
      } catch (e) {
        console.log(1);
      }
    } else if (getUa().qq) {
      loadScript(
        '//qzonestyle.gtimg.cn/qzone/qzact/common/share/share.js',
        () => {
          window.setShareInfo &&
            window.setShareInfo({
              title: shareConf.title,
              summary: shareConf.desc,
              pic: shareConf.imgUrl,
              url: shareConf.link
            });
        }
      );
    }
    //58同镇分享
    if (getUa().wbxiaoxiao) {
      shareConf.isExtendBtn = true;
      wbxiaoxiaoShare(shareConf, function(state, source) {
        //分享回调
        wbxiaoxiaoCallback('', state, source);
      });
    }
  }

  componentDidMount() {
    this.doShare();
  }

  shouldComponentUpdate(nextProps) {
    if (nextProps.shouldUpdate === true) {
      return true;
    }
    return false;
  }

  componentDidUpdate() {
    if (this.props.shouldUpdate === true) {
      this.doShare();
    }
  }

  render() {
    return null;
  }
}

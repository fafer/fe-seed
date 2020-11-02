import className from 'classnames';
import React, { Component } from 'react';
import Dialog from '../../../components/Dialog';
import ua from '../../../util/ua';
import urlUtil from '../../../util/urlUtil';

import {
  DIALOG_CHANKAN_MEIYOU,
  DIALOG_CHANKAN_YIYOU,
  DIALOG_END,
  DIALOG_HUOZENG,
  DIALOG_QIU,
  DIALOG_TASK_HUODE,
  DIALOG_ZENGYIDEYI,
  getSpray,
  INFOSTATE_LOTTERYEND,
} from '../sprayUtil';
import './index.scss';
const urlUtilInstance = urlUtil();
urlUtilInstance.removeParam('action');
const defaultUrl = urlUtilInstance.setParam('from58', 'tc_hdds');

export default class SprayDialog extends Component {
  public getData = (spray, type) => {
    const sprayInfo = getSpray(spray);
    const result = { pic: sprayInfo.pic };
    if (type === DIALOG_QIU) {
      result.bg = (
        <img
          className="bg"
          src="//img.58cdn.com.cn/weitech/innovation-activity/spray-dialog-1.png"
          alt=""
        />
      );
      result.title = 'TA向你求一瓶';
      result.btn = (
        <div className="btn-wrap big">
          <a
            className="btn-default btn-active"
            href="javascript:void(0)"
            onClick={() => this.props.send({ spray })}
          >
            <span>送给同学</span>
          </a>
        </div>
      );
      result.tip = <p className="tip">送一得一 好运翻倍</p>;
    } else if (
      type === DIALOG_HUOZENG ||
      type === DIALOG_TASK_HUODE ||
      type === DIALOG_ZENGYIDEYI
    ) {
      result.bg = (
        <img
          className="bg"
          src="//img.58cdn.com.cn/weitech/innovation-activity/spray-dialog-1.png"
          alt=""
        />
      );
      result.title = '恭喜您获得';
      result.btn = (
        <div className="btn-wrap">
          <a
            className="btn-default"
            href="javascript:void(0)"
            onClick={() => {
              this.props.showDialog({ show: false });
            }}
          >
            <span>我知道了</span>
          </a>
          <a
            className="btn-default btn-active"
            href="javascript:void(0)"
            onClick={() => {
              this.props.share({
                title: `哈哈哈，我又集到一瓶${sprayInfo.name}喷雾，想要求我呀~`,
                desc: '手慢无',
                link: defaultUrl,
              });
            }}
          >
            <span>嘚瑟一番</span>
          </a>
        </div>
      );
    } else if (type === DIALOG_CHANKAN_YIYOU) {
      result.bg = (
        <img
          className="bg"
          src="//img.58cdn.com.cn/weitech/innovation-activity/spray-dialog-2.png"
          alt=""
        />
      );
      result.btn = (
        <div className="btn-wrap">
          <a
            className="btn-default"
            href="javascript:void(0)"
            onClick={() => {
              this.props.showDialog({ show: false });
            }}
          >
            <span>我知道了</span>
          </a>
          <a
            className="btn-default btn-active"
            href="javascript:void(0)"
            onClick={() => {
              this.props.share({
                title: `哈哈哈，我又集到一瓶${sprayInfo.name}喷雾，想要求我呀~`,
                desc: '手慢无',
                link: defaultUrl,
              });
            }}
          >
            <span>嘚瑟一番</span>
          </a>
        </div>
      );
    } else if (type === DIALOG_CHANKAN_MEIYOU) {
      result.bg = (
        <img
          className="bg"
          src="//img.58cdn.com.cn/weitech/innovation-activity/spray-dialog-1.png"
          alt=""
        />
      );
      result.title = '您还未获得';
      result.btn = (
        <div className="btn-wrap">
          <a
            className="btn-default"
            href="javascript:void(0)"
            onClick={() => this.props.qiu(spray)}
          >
            <span>求赠送</span>
          </a>
          <a
            className="btn-default btn-active"
            href="javascript:void(0)"
            onClick={() => this.props.collect()}
          >
            <span>去收集</span>
          </a>
        </div>
      );
    } else if (type === DIALOG_END) {
      result.bg = (
        <img
          className="bg"
          src="//img.58cdn.com.cn/weitech/innovation-activity/sprayend.png"
          alt=""
        />
      );
      result.title = '活动已结束';
      result.tip = (
        <div className="sprayend-info">
          <div className="tip-info-wrap">
            <p className="tip-info">长按关注58校校公众号</p>
            <p className="tip-info-tip">获取更多有趣有用有料的校园新鲜事</p>
          </div>
        </div>
      );
    }
    return result;
  };

  public close = () => {
    this.props.showDialog({ show: false });
    if (this.props.dialog.type === DIALOG_END) {
      this.__closeWin();
    }
  };

  public __closeWin() {
    let { info, userInfo } = this.props;
    let infoState = info.state,
      userState = userInfo.state;
    if (infoState !== INFOSTATE_LOTTERYEND && userState) {
      return;
    }
    if (typeof window.WeixinJSBridge !== 'undefined') {
      window.WeixinJSBridge.call('closeWindow');
    } else if (ua.wbxiaoxiao) {
      if (typeof Wbxiaoxiao !== 'undefined') {
        Wbxiaoxiao.action.goback();
      }
    } else if (ua.qq) {
      window.mqq && window.mqq.invoke('ui', 'popBack');
      window.history.go(-1);
    } else {
      window.close();
    }
  }

  public render() {
    const { show, spray, type } = this.props.dialog;
    if (!show) {
      return null;
    }
    const data = this.getData(spray, type);
    let classname = className('title', { hastip: data.tip });
    let dialogclassname = className('spray-dialog', {
      'end-dialog': type === DIALOG_END && ua.wx,
    });
    return (
      <Dialog close={this.close}>
        <div className={dialogclassname}>
          {data.bg}
          <div className="content">
            {data.title && <p className={classname}>{data.title}</p>}
            {data.pic && <img className="img" src={data.pic} alt="" />}
            {data.btn}
            {data.tip}
          </div>
        </div>
      </Dialog>
    );
  }
}

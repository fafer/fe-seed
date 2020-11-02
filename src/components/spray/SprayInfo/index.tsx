import classNames from 'classnames';
import React, { Component } from 'react';
import {
  DIALOG_CHANKAN_MEIYOU,
  DIALOG_CHANKAN_YIYOU,
  getSpray,
  INFOSTATE_LOTTERYEND,
  INFOSTATE_LOTTERYING,
  USERSTATE_BINDPHONE,
  USERSTATE_CHANGED,
  USERSTATE_FULL,
  USERSTATE_LOTTERY,
  USERSTATE_NOT_FULL,
} from '../sprayUtil';
import Timer from '../Timer';
import './index.scss';

function Operator(props) {
  let { info, userInfo, doTask, changeUserState, doLottery, getInfo } = props;
  switch (userInfo.state) {
    case USERSTATE_FULL:
      return (
        <div className="activity-opt" onClick={changeUserState}>
          变身考神
        </div>
      );
    case USERSTATE_CHANGED:
      if (
        info.state === INFOSTATE_LOTTERYING ||
        info.state === INFOSTATE_LOTTERYEND
      ) {
        return (
          <div className="activity-opt" onClick={doLottery}>
            去开奖
          </div>
        );
      }
      return <Timer endTime={info.lotteryTime} onComplete={getInfo} />;
    case USERSTATE_LOTTERY:
      return (
        <div className="activity-opt" onClick={() => doLottery()}>
          已开奖
        </div>
      );
    case USERSTATE_BINDPHONE:
      return (
        <div className="activity-opt" onClick={() => doLottery()}>
          已绑定手机号
        </div>
      );
    default:
      return (
        <div className="activity-opt" onClick={() => doTask()}>
          做任务集喷雾
        </div>
      );
  }
}

export default class SprayInfo extends Component {
  public numFormat(num) {
    if (!num) {
      return '';
    }
    num = num.toString().split('.');
    let arr = num[0].split('').reverse();
    let res = [];
    for (let i = 0, len = arr.length; i < len; i++) {
      if (i % 3 === 0 && i !== 0) {
        res.push(',');
      }
      res.push(arr[i]);
    }
    res.reverse();
    if (num[1]) {
      res = res.join('').concat('.' + num[1]);
    } else {
      res = res.join('');
    }
    return res;
  }

  public render() {
    const { info, userInfo, sprayList, openSpray, activeRule } = this.props;
    const classname =
      typeof userInfo.state !== 'undefined' &&
      userInfo.state !== USERSTATE_NOT_FULL &&
      userInfo.state !== USERSTATE_FULL
        ? 'activity-major-change'
        : 'activity-major';
    return (
      <div className="activity-spray-info">
        <div className="activity-rule-guide" onClick={activeRule}>
          <div className="activity-rule-guide-bg" />
          <span className="activity-rule-guide-tip">活动规则</span>
        </div>
        <div className="activity-bonus-wrap">
          <div className="activity-bonus-pool">
            当前奖金池 ¥{this.numFormat(info.bonus)}
          </div>
          <div className="activity-bonus-tip-wrap">
            <ul className="activity-bonus-tip">
              <li>参与人数越多奖池越大（封顶500万）</li>
              <li>2018年12月22日20:00准时开奖</li>
              <li>参与人数越多奖池越大（封顶500万）</li>
            </ul>
          </div>
        </div>
        <div className={classname} />
        <div className="activity-spray">
          <div className="activity-spray-items">
            {sprayList.map((d, i) => {
              let { name } = getSpray(d.type),
                classnameTemp = classNames({
                  'img-wrap': true,
                  [`sprayblack${d.type}`]: !d.count,
                  [`spraychalk${d.type}`]: d.count,
                });
              return (
                <div
                  className="activity-spray-item"
                  key={i}
                  onClick={() =>
                    openSpray({
                      spray: d.type,
                      type: d.count
                        ? DIALOG_CHANKAN_YIYOU
                        : DIALOG_CHANKAN_MEIYOU,
                    })
                  }
                >
                  <div className={classnameTemp} />
                  <p>{name}</p>
                  {!!d.count && (
                    <i className={d.count > 99 ? 'ellipsis' : ''}>
                      <span>{d.count > 99 ? '. . .' : d.count}</span>
                    </i>
                  )}
                </div>
              );
            })}
          </div>
          <div className="activity-opt-wrap">
            <Operator {...this.props} />
          </div>
        </div>
      </div>
    );
  }
}

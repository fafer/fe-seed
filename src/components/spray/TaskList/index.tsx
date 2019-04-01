import classnames from 'classnames';
import React, { Component } from 'react';
import ua from '../../../util/ua';
import * as actions from '../actions';
import './index.scss';
export default class TaskList extends Component {
  public setClickLog = (state, type) => {
    let log = '';
    if (state !== 2) {
      // 未完成任务点击
      switch (type) {
        case 1:
          log = 'task1_ljqd';
          break;
        case 2:
          log = 'task2_ljfx';
          break;
        case 3:
          log = 'task3_ljll';
          break;
        default:
          log = 'task4_ljfx';
          break;
      }
    } else {
      switch (type) {
        case 2:
          log = 'task2_lqpw';
          break;
        case 3:
          log = 'task3_lqpw';
          break;
        default:
          log = 'task4_lqpw';
          break;
      }
    }
  };
  public handleTask = index => {
    const { taskList, dispatch } = this.props;
    const { state, type } = taskList[index];
    if (state === 3) {
      return;
    }
    this.setClickLog(state, type);
    dispatch(actions.handleTask(index, taskList));
  };
  public componentWillMount() {
    this.android = ua.android;
  }
  public render() {
    const { taskList } = this.props;
    return (
      <div
        id={this.props.id}
        className={classnames('task-wrap', { show: taskList.length })}
      >
        <div className="task-title">
          <h4 className="title">简单四项 集齐喷雾</h4>
          <p className="task-tip"> 每日任务 0点更新</p>
        </div>
        <ul className="task-list">
          {taskList.map((item, index) => {
            return (
              <li className="list-item" key={index}>
                <div
                  className={classnames('item-logo', `item-logo-${item.type}`)}
                />
                <div className="item-content">
                  <p className="item-title">
                    {item.name}
                    {item.totalTimes > 1
                      ? `(${item.currentTimes}/${item.totalTimes})`
                      : ''}
                  </p>
                  <p className="item-desc">{item.desc}</p>
                </div>
                <div
                  className={classnames('item-btn', {
                    finish: item.state === 2,
                    done: item.state === 3,
                    android: this.android
                  })}
                  onClick={this.handleTask.bind(this, index)}
                >
                  {item.btnName}
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

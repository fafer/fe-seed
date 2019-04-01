import React, { Component } from 'react';

export default class Timer extends Component {
  constructor(props) {
    super(props);
    this.startTime = props.startTime || Date.parse(new Date());
    (this.endTime = props.endTime || this.startTime + 60 * 1000),
      (this.state = {
        hour: '',
        minute: '',
        second: ''
      });
  }

  public componentDidMount() {
    let interval,
      count = (this.endTime - this.startTime) / 1000;
    if (count <= 0) {
      this.props.onComplete && this.props.onComplete();
      return;
    }
    let timer = () => {
      if (count <= 0) {
        interval && clearInterval(interval);
        this.html();
        this.props.onComplete && this.props.onComplete();
      } else {
        let hour = parseInt(count / 3600, 10),
          minute = parseInt((count % 3600) / 60, 10),
          second = count % 60;
        this.html(
          hour > 0 ? (hour >= 10 ? hour + '' : '0' + hour) : '00',
          minute > 0 ? (minute >= 10 ? minute + '' : '0' + minute) : '00',
          second > 0 ? (second >= 10 ? second + '' : '0' + second) : '00'
        );
        count--;
      }
    };
    timer();
    interval = setInterval(timer, 1000);
  }

  public html = (hour = '00', minute = '00', second = '00') => {
    this.dom.innerHTML = `<span class="time"><span>${hour}</span></span>时<span class="time"><span>${minute}</span></span>分<span class="time"><span>${second}</span></span>秒后开奖`;
  };

  public render() {
    return (
      <div
        className="activity-opt activity-opt-time"
        ref={dom => (this.dom = dom)}
      />
    );
  }
}

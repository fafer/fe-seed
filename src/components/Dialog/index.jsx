import React, { Component } from 'react';
import './index.scss';

export default class Dialog extends Component {
  componentDidMount() {
    setTimeout(() => {
      this.instance.className = 'dialog-container fadein';
    }, 100 / 6);
  }

  render() {
    return (
      <div
        className="dialog-container"
        ref={(instance) => (this.instance = instance)}
      >
        <div className="dialog-modal" />
        <div
          className={
            'dialog-content' +
            (this.props.className ? ` ${this.props.className}` : '')
          }
        >
          <div className="dialog-content-wrap">
            {this.props.children}
            <div className="dialog-close" onClick={this.props.close} />
          </div>
        </div>
      </div>
    );
  }
}

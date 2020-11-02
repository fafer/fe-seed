import classnames from 'classnames';
import React, { Component } from 'react';
import './index.scss';

export default class ShareGuide extends Component {
  public shouldComponentUpdate(nextProps) {
    if (nextProps.shareShow === this.props.shareShow) {
      return false;
    }
    return true;
  }
  public setShareConf = () => {
    const { shareConf, hide } = this.props;
    return {
      ...shareConf,
      complete: () => {
        hide();
      },
    };
  };

  public render() {
    const { hide, shareShow } = this.props;
    return (
      <React.Fragment>
        <div
          className={classnames('share-guide-wrap', { show: shareShow })}
          onClick={hide}
        >
          <div className="share-guide" />
        </div>
      </React.Fragment>
    );
  }
}

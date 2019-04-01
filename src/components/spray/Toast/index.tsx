import classnames from 'classnames';
import React from 'react';
import './index.scss';
export default class Toast extends React.Component {
  public shouldComponentUpdate(nextProps) {
    const { show, tip } = this.props.toast;
    const { toast } = nextProps;
    if (toast.show === show && tip === toast.tip) {
      return false;
    }
    if (this.toastTimmer) {
      clearTimeout(this.toastTimmer);
    }
    return true;
  }
  public render() {
    const { show, tip, icon } = this.props.toast;
    const { hide } = this.props;
    this.toastTimmer = hide;
    show && hide && hide();
    return (
      <div className={classnames('toast-wrap', { show })}>
        <div className="toast">
          <div className={classnames('icon', icon)} />
          <p className="toast-tip">{tip}</p>
        </div>
      </div>
    );
  }
}

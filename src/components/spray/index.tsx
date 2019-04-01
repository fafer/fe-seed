import React, { Component } from 'react';
import * as actions from './actions';
import { createProvider } from './reduxUtil';
import ShareGuide from './ShareGuide';
import SprayDialog from './SprayDialog';
import SprayInfo from './SprayInfo';
import TaskList from './TaskList';
import Toast from './Toast';

import './index.scss';

const Spray = createProvider(
  class extends Component {
    public componentDidMount() {
      this.props.initData();
      const { dispatch } = this.props;
      window.addEventListener('pageshow', e => {
        if (sessionStorage.getItem('go-to-task-share')) {
          sessionStorage.removeItem('go-to-task-share');
          if (e.persisted) {
            actions.getTaskList().then(data => {
              dispatch(data);
            });
          }
        }
      });
    }

    public shareGuideHide = () => {
      const { dispatch } = this.props;
      dispatch(actions.shareGuideToggle());
    };

    public render() {
      if (!this.props.init) {
        return (
          <div dangerouslySetInnerHTML={{ __html: this.props.skeleton }} />
        );
      }
      return (
        <React.Fragment>
          <SprayInfo {...this.props} />
          <TaskList id="task-list" {...this.props} />
          <ShareGuide {...this.props} hide={this.shareGuideHide} />
          <Toast {...this.props} hide={this.props.toastHide} />
          <SprayDialog {...this.props} />
        </React.Fragment>
      );
    }
  }
);

export default Spray;

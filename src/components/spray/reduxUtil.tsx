import React from 'react';
import { connect, Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import ua from '../../util/ua';
import * as actions from './actions';
import * as actionType from './actionType';
import reducer from './reducers';
import {
  DIALOG_END,
  getSpray,
  INFOSTATE_COLLECTEND,
  INFOSTATE_LOTTERYEND,
  INFOSTATE_LOTTERYING,
  INFOSTATE_NOT_START
} from './sprayUtil';

const loggerMiddleware = createLogger();
const store = createStore(
  reducer,
  undefined,
  applyMiddleware(thunkMiddleware, loggerMiddleware)
);

function mapDispatchToProps(dispatch) {
  function intercept(action) {
    let { info, dialog } = store.getState();
    if (!ua.wx && !ua.qq) {
      action = actions.toastToggle('请前往微信或QQ内参与活动', 'warning');
    } else if (info.state === INFOSTATE_NOT_START) {
      action = actions.toastToggle('活动未开始', 'warning');
    } else if (
      info.state === INFOSTATE_LOTTERYEND ||
      info.state === INFOSTATE_LOTTERYING ||
      info.state === INFOSTATE_COLLECTEND
    ) {
      action = actions.showDialog({ type: DIALOG_END, show: !dialog.show });
    }
    return action;
  }

  function dispatchWrap(action) {
    action = intercept(action);
    dispatch(action);
  }

  return {
    async initData() {
      const action = await actions.initData();
      dispatch(action);
    },
    getInfo() {
      let { info } = store.getState();
      info.state = INFOSTATE_LOTTERYING;
      dispatch({
        type: actionType.INFO,
        data: {
          info: { ...info }
        }
      });
    },
    async changeUserState() {
      const action = await actions.changeUserState();
      let { info } = store.getState();
      if (!ua.wx && !ua.qq) {
        dispatch(actions.toastToggle('请前往微信或QQ内参与活动', 'warning'));
      } else if (info.state === INFOSTATE_LOTTERYEND) {
        dispatch(actions.showDialog({ type: DIALOG_END, show: true }));
      } else {
        dispatch(action);
      }
    },
    dispatch: dispatchWrap,
    showDialog({ spray, type, show = true }) {
      dispatch(actions.showDialog({ spray, type, show }));
    },
    openSpray({ spray, type, show = true }) {
      dispatchWrap(actions.showDialog({ spray, type, show }));
    },
    send({ spray, action }) {
      dispatchWrap(actions.send({ spray, action }));
    },
    share(shareConfig = {}) {
      dispatchWrap(actions.share(shareConfig));
    },
    qiu(spray) {
      dispatchWrap(actions.qiu(spray));
    },
    toastHide() {
      setTimeout(() => {
        dispatch(actions.toastToggle());
      }, 1500);
    },
    collect() {
      dispatchWrap(actions.collect());
    },
    doTask() {
      let action = intercept();
      if (!action) {
        document.getElementById('task-list').scrollIntoView();
      } else {
        dispatch(action);
      }
    },
    doLottery() {
      let { info } = store.getState();
      if (!ua.wx && !ua.qq) {
        dispatch(actions.toastToggle('请前往微信或QQ内参与活动', 'warning'));
      } else if (info.state === INFOSTATE_LOTTERYEND) {
        dispatch(actions.showDialog({ type: DIALOG_END, show: true }));
      } else {
        dispatch(actions.openbonus());
      }
    },
    activeRule() {
      let action = intercept();
      if (!action) {
        jumpPage({
          title: '活动规则',
          url: 'https://down.58.com/h5/magic/10227/index.html'
        });
      } else {
        dispatch(action);
      }
    }
  };
}
export let createApp = component => {
  return connect(
    state => state,
    mapDispatchToProps
  )(component);
};

export let createProvider = component => {
  const App = createApp(component);
  return props => (
    <Provider store={store}>
      <App {...props} />
    </Provider>
  );
};

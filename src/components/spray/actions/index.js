import { getJSON } from '../../../util/ajaxApi';
import urlUtil from '../../../util/urlUtil';
import {
  CHANGEUSERSTATE,
  DIALOG,
  INFO,
  INITDATA,
  SHARE_GUIDE_TOGGLE,
  SPRAYLIST,
  TASK_LIST,
  TOAST_STATUS,
  USERINFO,
} from '../actionType';
import {
  DIALOG_END,
  DIALOG_TASK_HUODE,
  getSpray,
  INFOSTATE_COLLECTEND,
  INFOSTATE_LOTTERYEND,
  INFOSTATE_LOTTERYING,
  USERSTATE_CHANGED,
  USERSTATE_FULL,
  USERSTATE_NOT_FULL,
} from '../sprayUtil';
const urlUtilInstance = urlUtil();
const localId = '';
// @mock import { fetchTaskList,fetchSignIn,taskReward,shareTask,info,userInfo,sprayList,change,dialogInfo,sendSpray,qiuzengurl,openbonusurl } from  '../mock.js'
const DEFAULT_TASK = {
  1: {
    name: '每日签到',
    desc: '每日在此签到可集1个',
    btnName: '每日签到',
  },
  2: {
    name: '分享活动页面',
    desc: '点此分享,${totalTimes}人点开可集1个',
    btnName: '立即分享',
  },
  3: {
    name: '浏览校园新鲜事',
    desc: '浏览${totalTimes}条帖子详情可集1个',
    btnName: '立即浏览',
  },
  4: {
    name: '分享校校精品帖',
    desc: '点此分享，被点开可集1个',
    btnName: '立即分享',
  },
};
const urlUtilShare = urlUtil();
urlUtilShare.removeParam('from58');
const DEFAULT_SHARE = {
  title: '逢考必过喷雾大放送，咦，还有奖学金',
  desc: '考的全会蒙的都对，超常发挥高分不累',
  pic: 'https://img.58cdn.com.cn/weitech/innovation-activity/spray-share.png',
  link: urlUtilShare.removeParam('action'),
};
/**
 * 获取任务列表
 */
export async function getTaskList() {
  let url = `/txactivity/ks/task/list?_t=${new Date().getTime()}`;
  // @mock fetchTaskList(url)
  let data;
  try {
    data = await getJSON(url);
  } catch (e) {
    data = {
      taskList: [],
    };
    console.log(e);
  }
  return receiveTaskList(data.taskList);
}

function receiveTaskList(taskList) {
  taskList = taskList.map((item) => {
    item = { ...DEFAULT_TASK[item.type], ...item };
    item.desc = item.desc.replace('${totalTimes}', item.totalTimes);
    if (item.state === 2) {
      item.btnName = '领取喷雾';
    }
    if (item.state === 3) {
      item.btnName = '今日已领取';
    }
    return item;
  });
  return {
    type: TASK_LIST,
    data: {
      taskList,
    },
  };
}
/**
 * 处理任务
 * @param {number} index 点击索引
 * @param {Array} taskList 任务列表
 */
export function handleTask(index = 0) {
  return (dispatch, getState) => {
    const { type, state } = getState().taskList[index];
    // 签到
    if (type === 1) {
      dispatch(signIn(index));
      return;
    }
    // 其他分享
    if (state === 2) {
      // 分享任务完成
      dispatch(getTaskReward(index, type));
    } else {
      dispatch(taskShare(index));
    }
  };
}

/**
 * 任务签到
 * index: 点击的索引
 */
function signIn(index) {
  return (dispatch) => {
    let url = `/txactivity/ks/task/checkin?_t=${new Date().getTime()}`;
    // @mock fetchSignIn(url)
    return getJSON(url)
      .then((data) => {
        dispatch(setTaskList(index, 3, '今日已领取', data));
      })
      .catch(() => {
        dispatch(toastToggle('网络错误'));
      });
  };
}
/**
 * 任务分享
 * @param {number} index  任务索引
 */
function taskShare(index) {
  return (dispatch, getState) => {
    const { type } = getState().taskList[index];
    let url = `/txactivity/ks/task/start?_t=${new Date().getTime()}`;
    // @mock shareTask(url)
    return getJSON(url, {
      taskId: type,
      localId,
    })
      .then((data) => {
        if (type === 2) {
          dispatch(
            shareGuideToggle(true, {
              link: setUrlFrom(data.jumpUrl, 'task_syhdfx'),
            })
          );
        } else {
          sessionStorage.setItem('go-to-task-share', true);
        }
      })
      .catch(() => {
        dispatch(toastToggle('网络错误'));
      });
  };
}
/**
 * 为url设置from
 * @param {string} url  连接
 * @param {string} from 来源
 */
function setUrlFrom(url, from) {
  return url.indexOf('?') === -1
    ? `${url}?from58=${from}`
    : `${url}&from58=${from}`;
}

/**
 * 任务领取奖励
 * @param {number} index  任务索引
 */
function getTaskReward(index, type) {
  return (dispatch) => {
    let url = `/txactivity/ks/task/submit?_t=${new Date().getTime()}`;
    // @mock taskReward(url)
    return getJSON(url, {
      taskId: type,
    })
      .then((data) => {
        dispatch(setTaskList(index, 3, '今日已领取', data));
      })
      .catch(() => {
        dispatch(toastToggle('网络错误'));
      });
  };
}

function setTaskList(index, state, btnName, data) {
  return (dispatch, getState) => {
    let { taskList } = getState();
    taskList[index].state = state;
    taskList[index].btnName = btnName;
    dispatch(
      showDialog({
        spray: data.spray.type,
        type: DIALOG_TASK_HUODE,
        increase: true,
      })
    );
    dispatch({
      type: TASK_LIST,
      data: {
        taskList: [...taskList],
      },
    });
  };
}
/**
 * toast显隐切换
 * @param {string} tip  提示文案
 * @param {string} icon  图标 success|warning
 */
export function toastToggle(tip, icon = 'warning') {
  return {
    type: TOAST_STATUS,
    data: {
      toast: {
        show: !!tip,
        tip,
        icon,
      },
    },
  };
}
/**
 *
 * @param {boolean} isShow  是否展示
 * @param {Object} shareConfig 分享设置
 */
export function shareGuideToggle(
  isShow = false,
  shareConfig = {
    link: window.location.href,
  }
) {
  const shareConf = {
    ...DEFAULT_SHARE,
    ...shareConfig,
  };
  shareConf.link = shareConf.link.replace(/https?:/, window.location.protocol);
  return {
    type: SHARE_GUIDE_TOGGLE,
    data: {
      shareConf,
      shareShow: isShow,
    },
  };
}
export const initData = () => {
  return (dispatch) => {
    Promise.all([
      getInfo(),
      getSprayList(),
      getTaskList(),
      getDialogInfo(),
    ]).then((res) => {
      let data = {},
        infoState = res[0].data.info.state,
        userInfo = res[0].data.info.userInfo || {},
        userState = userInfo.state;
      if (
        infoState === INFOSTATE_LOTTERYEND ||
        ((infoState === INFOSTATE_COLLECTEND ||
          infoState === INFOSTATE_LOTTERYING) &&
          userState === USERSTATE_NOT_FULL)
      ) {
        data.dialog = {
          show: true,
          type: DIALOG_END,
        };
      } else if (
        (infoState === INFOSTATE_COLLECTEND ||
          infoState === INFOSTATE_LOTTERYING) &&
        userState !== USERSTATE_NOT_FULL
      ) {
        data.dialog = {
          show: false,
        };
      } else {
        data = res[3].data;
      }
      dispatch({
        type: INITDATA,
        data: {
          init: true,
          ...res[0].data,
          userInfo,
          ...res[1].data,
          ...res[2].data,
          ...data,
        },
      });
    });
  };
};

export const getInfo = async () => {
  let url = `/txactivity/ks/info?_t=${new Date().getTime()}`;
  // @mock info(url)
  let data;
  try {
    data = await getJSON(url);
  } catch (e) {
    data = {};
    console.log(e);
  }
  return {
    type: INFO,
    data: {
      info: data,
    },
  };
};

export const getUserInfo = async () => {
  let url = `/txactivity/ks/userinfo?_t=${new Date().getTime()}`;
  // @mock userInfo(url)
  let data;
  try {
    data = await getJSON(url);
  } catch (e) {
    data = {};
    console.log(e);
  }
  return {
    type: USERINFO,
    data: {
      userInfo: data,
    },
  };
};

export const getSprayList = async () => {
  let url = `/txactivity/ks/bottle/list?_t=${new Date().getTime()}`;
  // @mock sprayList(url)
  let data;
  try {
    data = await getJSON(url);
  } catch (e) {
    data = {
      sprayList: [
        {
          type: 1,
          count: 0,
        },
        {
          type: 2,
          count: 0,
        },
        {
          type: 3,
          count: 0,
        },
        {
          type: 4,
          count: 0,
        },
        {
          type: 5,
          count: 0,
        },
      ],
    };
  }
  return {
    type: SPRAYLIST,
    data: {
      sprayList: data.sprayList,
    },
  };
};

export const changeUserState = () => {
  let url = `/txactivity/ks/change?_t=${new Date().getTime()}`;
  // @mock change(url)
  return (dispatch, getState) => {
    getJSON(url).then(() => {
      let sprayList = getState().sprayList;
      sprayList = sprayList.map((d) => {
        d.count = d.count - 1;
        return d;
      });
      dispatch({
        type: CHANGEUSERSTATE,
        data: {
          userInfo: { ...getState().userInfo, state: USERSTATE_CHANGED },
          sprayList,
        },
      });
    });
  };
};

export const showDialog = ({ spray, type, show = true, increase = false }) => {
  return (dispatch, getState) => {
    const action = {
      type: DIALOG,
      data: {
        dialog: {
          show,
          spray,
          type,
        },
      },
    };
    if (increase) {
      const state = getState();
      const sprayList = state.sprayList;
      const sprayInfo = getSprayInfo(sprayList, spray);
      let userState = state.userInfo.state;
      if (sprayInfo) {
        sprayInfo.count = sprayInfo.count + 1;
        action.data.sprayList = [...sprayList];
      }
      if (userState === USERSTATE_NOT_FULL || userState === USERSTATE_FULL) {
        let temp = true;
        sprayList.map((d) => {
          temp = temp && d.count > 0;
        });
        if (temp) {
          userState = USERSTATE_FULL;
        } else {
          userState = USERSTATE_NOT_FULL;
        }
        action.data.userInfo = { ...state.userInfo, state: userState };
      }
    }
    dispatch(action);
  };
};

export const getDialogInfo = async () => {
  let data = {
      type: DIALOG,
      data: {
        dialog: {},
      },
    },
    url = `/txactivity/ks/action?_t=${new Date().getTime()}`,
    action = urlUtilInstance.getParam('action');
  // @mock dialogInfo(url)
  try {
    let temp = await getJSON(url, {
      action: action || '',
    });
    if (!temp.type) {
      return data;
    }
    if (temp.canSend === 1) {
      return toastToggle('你已赠送哦~', 'success');
    } else if (temp.canSend === 2 || temp.canSend === 0) {
      data.data.dialog.spray = temp.spray.type;
      data.data.dialog.type = temp.type;
      data.data.dialog.show = true;
    }
    return data;
  } catch (e) {
    console.log('');
  }
  return data;
};

function getSprayInfo(sprayList, spray) {
  let sprayInfo;
  for (let index = 0; index < sprayList.length; index++) {
    let temp = sprayList[index];
    if (temp.type === spray) {
      sprayInfo = temp;
      break;
    }
  }
  return sprayInfo;
}

export const send = ({ spray }) => {
  return (dispatch, getState) => {
    let sprayInfo,
      state = getState(),
      sprayList = state.sprayList;
    sprayInfo = getSprayInfo(sprayList, spray);
    if (sprayInfo && sprayInfo.count > 0) {
      let url = `/txactivity/ks/bottle/confirmgive?_t=${new Date().getTime()}`;
      // @mock sendSpray(url)
      getJSON(url, {
        action: urlUtilInstance.getParam('action'),
      })
        .then((result) => {
          let data = toastToggle('赠送成功，你已随机获得新喷雾', 'success'),
            dialog = state.dialog;
          dialog.show = false;
          data.dialog = Object.assign({}, dialog);
          sprayInfo.count = sprayInfo.count - 1;
          data.sprayList = [...sprayList];
          dispatch(data);
          setTimeout(() => {
            dispatch(
              showDialog({
                spray: result.spray.type,
                type: result.type,
                increase: true,
              })
            );
          }, 1000);
        })
        .catch(() => {
          dispatch(toastToggle('网络错误'));
        });
    } else {
      dispatch(toastToggle('你也没有呢～'));
    }
  };
};

export const share = (shareConfig = {}) => {
  return (dispatch) => {
    let action = shareGuideToggle(true, shareConfig);
    action.data.dialog = {
      show: false,
    };
    dispatch(action);
  };
};

export const qiu = (spray) => {
  return (dispatch) => {
    let url = `/txactivity/ks/bottle/ask?_t=${new Date().getTime()}`;
    // @mock qiuzengurl(url)
    getJSON(url, {
      type: spray,
      localId,
    })
      .then((result) => {
        const sprayInfo = getSpray(spray);
        dispatch(
          share({
            title: `万能的票圈，求一瓶${sprayInfo.name} 喷雾`,
            desc: '赠人喷雾，考神还会再随机给你一瓶新的哟',
            link: urlUtil(result.jumpUrl).setParam('from58', 'tc_pwqzs'),
          })
        );
      })
      .catch(() => {
        dispatch(toastToggle('网络错误'));
      });
  };
};

export const collect = () => {
  document.getElementById('task-list').scrollIntoView();
  return showDialog({
    show: false,
  });
};

export const openbonus = () => {
  return (dispatch) => {
    let url = `/txactivity/ks/openbonus/${localId}?_t=${new Date().getTime()}`;
    //@mock openbonusurl(url)
    getJSON(url)
      .then((result) => {
        window.location.href = result.jumpUrl;
      })
      .catch(() => {
        dispatch(toastToggle('网络错误'));
      });
  };
};

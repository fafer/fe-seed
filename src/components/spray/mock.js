let Mock = require('mockjs');
// 任务列表
export const fetchTaskList = url => {
  Mock.mock(url, {
    data: {
      'taskList|4': [
        {
          'totalTimes|1-4': 1,
          state: 2,
          'currentTimes|0-1': 0,
          'type|+1': 1
        }
      ],
      date: '',
      openId: ''
    },
    code: 0,
    msg: ''
  });
};
// 签到
export const fetchSignIn = url => {
  Mock.mock(url, {
    data: {
      spray: {
        type: 1
      },
      type: 94
    },
    code: 0,
    msg: ''
  });
};
// 任务分享
export const shareTask = url => {
  Mock.mock(url, {
    data: {
      jumpUrl: 'http://mtongzhen.58.com/130129203000'
    },
    code: 0,
    msg: ''
  });
};
// 任务领取
export const taskReward = url => {
  Mock.mock(url, {
    data: {
      spray: {
        type: 1
      },
      type: 1
    },
    code: 0,
    msg: ''
  });
};
//活动信息
export const info = (url = '/txactivity/ks/info') => {
  Mock.mock(url, {
    data: {
      name: '',
      lotteryTime: Date.parse(new Date()) + 6 * 1000,
      'state|2': 2,
      'bonus|10000-10000000': 1000,
      userInfo: {
        'state|2': 2
      }
    },
    code: 0,
    msg: ''
  });
};

//用户状态
export const userInfo = (url = '/txactivity/ks/userinfo') => {
  Mock.mock(url, {
    data: {
      'state|2': 2,
      openId: ''
    },
    code: 0,
    msg: ''
  });
};

//喷雾信息
export const sprayList = (url = '/txactivity/ks/bottle/list') => {
  Mock.mock(url, {
    data: {
      'sprayList|5': [
        {
          'count|0-100': 0,
          'type|+1': 1
        }
      ],
      openId: ''
    },
    code: 0,
    msg: ''
  });
};

//变身考神
export const change = (url = '/txactivity/ks/change') => {
  Mock.mock(url, {
    data: {},
    code: 0,
    msg: ''
  });
};

//获取弹框信息
export const dialogInfo = (url = '/txactivity/ks/action') => {
  Mock.mock(url, {
    data: {
      spray: {
        'type|1-5': 0
      },
      action: '',
      'canSend|0-4': 0,
      'type|1-4': 1
    },
    code: 0,
    msg: ''
  });
};

//确认赠送
export const sendSpray = (url = '/txactivity/ks/bottle/confirmgive') => {
  Mock.mock(url, {
    data: {
      spray: {
        'type|1-5': 0
      },
      'type|1-4': 1
    },
    code: 0,
    msg: ''
  });
};

//获取求赠链接
export const qiuzengurl = (url = '/txactivity/ks/bottle/ask') => {
  Mock.mock(url, {
    data: {
      jumpUrl:
        'http://tongxiao.58.com/spray.html?action=' + new Date().getTime()
    },
    code: 0,
    msg: ''
  });
};

//获取开奖链接
export const openbonusurl = (url = '/txactivity/ks/openbonus') => {
  Mock.mock(url, {
    data: {
      jumpUrl: 'http://tongxiao.58.com/openbonus'
    },
    code: 0,
    msg: ''
  });
};

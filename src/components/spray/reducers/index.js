import urlUtil from '../../../util/urlUtil';
const urlUtilInstance = urlUtil();
urlUtilInstance.removeParam('from58');
export default function(
  state = {
    init: false,
    info: {},
    userInfo: {},
    sprayList: [],
    taskList: [],
    toast: {
      show: false,
      tip: '',
      icon: ''
    },
    dialog: {
      show: false,
      type: '',
      spray: ''
    },
    shareConf: {
      title: '逢考必过喷雾大放送，咦，还有奖学金',
      desc: '考的全会蒙的都对，超常发挥高分不累',
      pic:
        'https://img.58cdn.com.cn/weitech/innovation-activity/spray-share.png',
      link: urlUtilInstance.removeParam('action')
    },
    shareShow: false
  },
  action
) {
  return { ...state, ...action.data };
}

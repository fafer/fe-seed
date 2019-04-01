export const SPRAY_ONE = 1; // 考的全会
export const SPRAY_TWO = 2; // 蒙的都对
export const SPRAY_THREE = 3; // 高分不累
export const SPRAY_FOUR = 4; // 超常发挥
export const SPRAY_FIVE = 5; // 欧气包围
export const USERSTATE_NOT_FULL = 0; // 未集齐
export const USERSTATE_FULL = 1; // 已集齐
export const USERSTATE_CHANGED = 2; // 已变身
export const USERSTATE_LOTTERY = 3; // 已开奖
export const USERSTATE_BINDPHONE = 4; // 已绑定手机号
export const INFOSTATE_NOT_START = 0; // 活动未开始
export const INFOSTATE_COLLECTING = 1; // 活动收集中
export const INFOSTATE_COLLECTEND = 2; // 活动收集结束
export const INFOSTATE_LOTTERYING = 3; // 活动开奖中
export const INFOSTATE_LOTTERYEND = 4; // 活动开奖结束
export const DIALOG_END = 0; // 活动结束弹框
export const DIALOG_QIU = 1; // 对方求喷雾弹框
export const DIALOG_HUOZENG = 2; // 获得喷雾弹框
export const DIALOG_TASK_HUODE = 3; // 任务获得喷雾弹框
export const DIALOG_ZENGYIDEYI = 4; // 赠一得一喷雾弹框
export const DIALOG_CHANKAN_YIYOU = 5; // 查看已有喷雾弹框
export const DIALOG_CHANKAN_MEIYOU = 6; // 查看无此喷雾弹框

export function getSpray(type) {
  switch (type) {
    case SPRAY_ONE:
      return {
        name: '考的全会',
        pic: '//img.58cdn.com.cn/weitech/innovation-activity/spray1.png',
        clickLog: 'jpw_kdqh'
      };
    case SPRAY_TWO:
      return {
        name: '蒙的都对',
        pic: '//img.58cdn.com.cn/weitech/innovation-activity/spray2.png',
        clickLog: 'jpw_mddd'
      };
    case SPRAY_THREE:
      return {
        name: '高分不累',
        pic: '//img.58cdn.com.cn/weitech/innovation-activity/spray3.png',
        clickLog: 'jpw_gfbl'
      };
    case SPRAY_FOUR:
      return {
        name: '超常发挥',
        pic: '//img.58cdn.com.cn/weitech/innovation-activity/spray4.png',
        clickLog: 'jpw_ccfh'
      };
    case SPRAY_FIVE:
      return {
        name: '欧气包围',
        pic: '//img.58cdn.com.cn/weitech/innovation-activity/spray5.png',
        clickLog: 'jpw_oqbw'
      };
    default:
      return {
        name: '',
        pic: ''
      };
  }
}

import ua from './ua';
import loadJS from './loadJS';

export default function envLibUtil() {
  if (ua.wbxiaoxiao) {
    return loadJS(
      '//j1.58cdn.com.cn/weitech/innovation-activity/lib/wbxiaoxiaosdk.js'
    );
  } else if (ua.wx) {
    return loadJS(
      '//j1.58cdn.com.cn/weitech/innovation-activity/lib/wxjs-1.4.0.js'
    );
  } else {
    return loadJS();
  }
}

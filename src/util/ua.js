function getUa() {
  const ua = navigator.userAgent;
  return {
    wx:
      !!ua.match(/MicroMessenger\/([\d.]+)/) &&
      window.__wxjs_environment !== 'miniprogram',
    miniprogram: window.__wxjs_environment === 'miniprogram',
    ios: !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
    android: ua.indexOf('Android') > -1 || ua.indexOf('Linux') > -1,
    iPhone: ua.indexOf('iPhone') > -1,
    iPhoneX:
      ua.indexOf('iphonex') > -1 ||
      (ua.indexOf('iPhone') > -1 &&
        (screen.height === 812 || screen.height === 896)),
    iPad: ua.indexOf('iPad') > -1,
    qq: ua.match(/QQ/i),
  };
}
const ua = getUa();

export default ua;

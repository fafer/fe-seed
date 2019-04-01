import loadScript from './loadScript';

//统计(PV，UV)：应用于除详情页外的其他页面
function loadTrackParam() {
  if (window.___json4fe && window.___json4fe.trackParam) {
    const trackParam = window.___json4fe.trackParam;
    window._trackURL = JSON.stringify({
      fromZZ: window.___json4fe.fromZZ || '',
      fromtype: window.___json4fe.fromtype || '',
      ...trackParam
    });
    loadScript('//tracklog.58.com/referrer_m.js');
  }
}

export default loadTrackParam;

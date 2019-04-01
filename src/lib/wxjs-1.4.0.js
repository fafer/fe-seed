//Promise
!function(e){function n(){}function t(e,n){return function(){e.apply(n,arguments)}}function o(e){if(!(this instanceof o))throw new TypeError("Promises must be constructed via new");if("function"!=typeof e)throw new TypeError("not a function");this._state=0,this._handled=!1,this._value=undefined,this._deferreds=[],a(e,this)}function i(e,n){for(;3===e._state;)e=e._value;if(0===e._state)return void e._deferreds.push(n);e._handled=!0,o._immediateFn(function(){var t=1===e._state?n.onFulfilled:n.onRejected;if(null===t)return void(1===e._state?r:f)(n.promise,e._value);var o;try{o=t(e._value)}catch(i){return void f(n.promise,i)}r(n.promise,o)})}function r(e,n){try{if(n===e)throw new TypeError("A promise cannot be resolved with itself.");if(n&&("object"==typeof n||"function"==typeof n)){var i=n.then;if(n instanceof o)return e._state=3,e._value=n,void u(e);if("function"==typeof i)return void a(t(i,n),e)}e._state=1,e._value=n,u(e)}catch(r){f(e,r)}}function f(e,n){e._state=2,e._value=n,u(e)}function u(e){2===e._state&&0===e._deferreds.length&&o._immediateFn(function(){e._handled||o._unhandledRejectionFn(e._value)});for(var n=0,t=e._deferreds.length;n<t;n++)i(e,e._deferreds[n]);e._deferreds=null}function c(e,n,t){this.onFulfilled="function"==typeof e?e:null,this.onRejected="function"==typeof n?n:null,this.promise=t}function a(e,n){var t=!1;try{e(function(e){t||(t=!0,r(n,e))},function(e){t||(t=!0,f(n,e))})}catch(o){if(t)return;t=!0,f(n,o)}}var s=setTimeout;o.prototype["catch"]=function(e){return this.then(null,e)},o.prototype.then=function(e,t){var o=new this.constructor(n);return i(this,new c(e,t,o)),o},o.all=function(e){return new o(function(n,t){function o(e,f){try{if(f&&("object"==typeof f||"function"==typeof f)){var u=f.then;if("function"==typeof u)return void u.call(f,function(n){o(e,n)},t)}i[e]=f,0==--r&&n(i)}catch(c){t(c)}}if(!e||"undefined"==typeof e.length)throw new TypeError("Promise.all accepts an array");var i=Array.prototype.slice.call(e);if(0===i.length)return n([]);for(var r=i.length,f=0;f<i.length;f++)o(f,i[f])})},o.resolve=function(e){return e&&"object"==typeof e&&e.constructor===o?e:new o(function(n){n(e)})},o.reject=function(e){return new o(function(n,t){t(e)})},o.race=function(e){return new o(function(n,t){for(var o=0,i=e.length;o<i;o++)e[o].then(n,t)})},o._immediateFn="function"==typeof setImmediate&&function(e){setImmediate(e)}||function(e){s(e,0)},o._unhandledRejectionFn=function(e){"undefined"!=typeof console&&console&&console.warn("Possible Unhandled Promise Rejection:",e)},o._setImmediateFn=function(e){o._immediateFn=e},o._setUnhandledRejectionFn=function(e){o._unhandledRejectionFn=e},"undefined"!=typeof module&&module.exports?module.exports=o:e.Promise||(e.Promise=o)}(this);
;(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    //AMD
    define(factory);
  } else if (typeof exports === 'object') {
    //Node, CommonJS之类的
    module.exports = factory();
  } else {
    //浏览器全局变量(root 即 window)
    root.wxjs = factory(root);
  }
}(this, function(){
    // "use strict";
    var wxjs = {
        version: '1.4.0',
        host: ((typeof wxjs_test != 'undefined' && wxjs_test) ? 'testweixin.test.58v5.cn' : 'weixin.58.com'),
        debug: (typeof wxjs_debug != 'undefined' && wxjs_debug)
    };
    wxjs.weixinJsUrl = '//res.wx.qq.com/open/js/jweixin-1.3.0.js';
    wxjs.configJsUrl = '//' + wxjs.host + '/weixinjsconfig/config?t=' + Math.random() + (wxjs.debug ? '&debug=true' : '');
    
    function loadScript(url) {
      return new Promise(function(resolve) {
        var head = document.getElementsByTagName('head')[0]
        var script = document.createElement('script')
        var done = false
        script.type = 'text/javascript'
        script.src = url
        script.onload = script.onreadystatechange = function() {
          if (!done && (!this.readyState || /loaded|complete/.test(script.readyState))) {
            done = true
            resolve()
            script.onload = script.onreadystatechange = null
            head.removeChild(script)
            head = script = null
          }
        }
        head.appendChild(script)
      })
    }
    
    // include weixinjs
    var weixinJsUrlPromise = loadScript(wxjs.weixinJsUrl);
    // include config
    weixinJsUrlPromise.then(function() {
      window.wx && wx.ready(function() {
        isReady = true
      });
      loadScript(wxjs.configJsUrl);
    })

    // 唯一对外接口
    window.wxjs = wxjs;

    // api
    var api = {
        // 分享相关
        share: {

            /**
			 * 设置分享的相关信息
			 * 1.参数个数为1时同时设置所有分享的信息：
			 * api.share.set({...});
			 * 2.参数个数为2时，第一个参数为分享类型：
			 * api.share.set("timeline", {...});
			 * 分享类型共4种："timeline", "appMessage", "qq", "weibo"，分别为分享到朋友圈、分享给朋友、分享到QQ、分享到微博
			 */
            set: function() {

                if(arguments.length == 1) {
                    var info = arguments[0];
                    ['timeline', 'appMessage', 'qq', 'weibo','qzone'].forEach(function(v, k) {
                        api.share.set(v, info);
                    });
                }

                if(arguments.length == 2) {
                    var shareName = arguments[0], info = arguments[1];
                    switch(shareName) {
                    case 'timeline':
                        wx.onMenuShareTimeline(info);
                        break;
                    case 'appMessage':
	      					wx.onMenuShareAppMessage(info);
                        break;
                    case 'qq':
	      					wx.onMenuShareQQ(info);
                        break;
                    case 'weibo':
	      					wx.onMenuShareWeibo(info);
                        break;
					    case 'qzone':
	      					wx.onMenuShareQZone(info);
                        break;
                    }

                }

            }
        }
    };

    // 所有对api的调用都需要放在ready方法的回调函数中, ready函数保证所需要的api已经声明完成
    var isReady = false;
    wxjs.ready = function(callback) {
      if(isReady) callback(api);
      weixinJsUrlPromise.then(function() {
        window.wx && wx.ready(function() {
          isReady = true;
          callback(api);
        });
      })
    };

    return  wxjs
}));
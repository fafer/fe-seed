/**
 * 获取服务端数据
 * @author fafer 2018年7月10日16:06:55
 */
import ajax from 'ajax-promise-simple';

/**
 * 获取数据
 * @param {string} url 请求地址
 * @param {object} params 参数，有值时，走POST方式，否则是GET方式
 */
export let getJSON = (url, params) => {
  let promise;
  if (typeof params === 'object') promise = ajax.postJSON(url, params);
  else promise = ajax.getJSON(url);
  return new Promise((resolve, reject) => {
    promise
      .then((data) => {
        if (data.code === 0) {
          try {
            if (typeof data.data === 'string')
              data.data = JSON.parse(data.data);
            resolve(data.data);
          } catch (e) {
            resolve(data.data);
          }
        } else throw new Error(data.code);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

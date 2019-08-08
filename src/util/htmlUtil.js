/**
 * html格式串转义、解转
 * @author fafer 2018年7月31日10:42:00
 */

'use strict';

let escapeMap = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
/* eslint-disable */
  '\'': '&#x27;',
  /* eslint-enable */
  '`': '&#x60;'
};
let unescapeMap = {
  '&amp;': '&',
  '&lt;': '<',
  '&gt;': '>',
  '&quot;': '"',
/* eslint-disable */
  '&#x27;': '\'',
  /* eslint-enable */
  '&#x60;': '`'
};

function keys(obj) {
  if (Object.keys) return Object.keys(obj);
  let keys = [];
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      keys.push(key);
    }
  }
  return keys;
}

let createEscaper = function(map) {
  let escaper = function(match) {
    return map[match];
  };
  let source = '(?:' + keys(map).join('|') + ')';
  let testRegexp = RegExp(source);
  let replaceRegexp = RegExp(source, 'g');
  return function(string) {
    string = string == null ? '' : '' + string;
    return testRegexp.test(string)
      ? string.replace(replaceRegexp, escaper)
      : string;
  };
};

export let htmlescape = createEscaper(escapeMap);
export let htmlunescape = createEscaper(unescapeMap);
export let clearEvent = function(str) {
  str = str || '';
  str = str.replace(/((\?on[a-z]+)=)/gi, ' ');
  str = str.replace(/((on[a-z]+)=)/gi, ' ');
  return str;
};

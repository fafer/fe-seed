import loadScript from './loadScript';

export default function loadJS(src) {
  return new Promise(resolve => {
    if (!src) {
      resolve();
      return;
    }
    loadScript(src, function() {
      resolve();
    });
  });
}

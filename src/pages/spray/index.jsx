import React from 'react';
import { render } from 'react-dom';
import '../../common/flexible';
import '../../common/base.css';
import '@babel/polyfill/dist/polyfill';
import Spray from '../../components/spray';
import envLibUtil from '../../util/envLibUitl';
import loadTrackParam from '../../util/loadTrackParam';
loadTrackParam();

const app = document.getElementById('app');
envLibUtil().finally(() => {
  render(<Spray skeleton={app.innerHTML} />, app);
});

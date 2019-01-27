import 'babel-polyfill';
import dva from 'dva';
import Loading from 'dva-loading';
import consentModel from './models/consent';

import './index.less';

// 1. Initialize
const app = dva({
  onError(err, dispatch) {
    console.log(err);
  },
});

// 2. Plugins
app.use(Loading({
  namespace: 'loading',
  // effects: enable effects level loading state
}));

// 3. Model
// Moved to router.js
app.model(consentModel);

// 4. Router
app.router(require('./router.jsx'));

// 5. Start
app.start('#root');

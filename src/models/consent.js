import { routerRedux } from 'dva/router';

import { giveContent } from '../services/consent';

export default {
  namespace: 'consent',

  state: {},

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
    },
  },

  effects: {
    *giveContent({ payload }, { call, put }) {  // eslint-disable-line
      yield call(giveContent, payload);
      yield put(routerRedux.push({
        pathname: '/consents',
      }));
    },
  },

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
  },

};

import { routerRedux } from 'dva/router';
import subscribe from 'dva-subscribe';

import { giveConsent, fetchConsents } from '../services/consent';

export default {
  namespace: 'consent',

  state: {},

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
      subscribe(
        history, dispatch,
        {
          url: '/consents',
          queries: ['page'],
          actionCreator: (page = '1') => ({ type: 'fetchConsents', payload: { page } }),
        },
      );
    },
  },

  effects: {
    *fetchConsents({ payload }, { call, put }) {  // eslint-disable-line
      const { data } = yield call(fetchConsents, payload);
      yield put({
        type: 'save',
        payload: data,
      });
    },

    *giveConsent({ payload }, { call, put }) {  // eslint-disable-line
      yield call(giveConsent, payload);
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

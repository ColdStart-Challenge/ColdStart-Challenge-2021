import GET_CATALOG from './mutation-types';

export default {
  strict: process.env.NODE_ENV !== 'production',
  namespaced: true,
  state: {
    catalog: [],
  },
  mutations: {
    [GET_CATALOG](state, catalog) {
      state.catalog = catalog;
    },
  },
  actions: {
  },
  getters: {
    catalog: (state) => state.catalog,
  },
};

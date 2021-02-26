import Vue from 'vue';
import Vuex from 'vuex';
import catalogModule from './modules/catalog';
import orderModule from './modules/order';

export * from './modules/mutation-types';

Vue.use(Vuex);

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  modules: {
    catalog: catalogModule,
    order: orderModule,
  },
  state: {
  },
});

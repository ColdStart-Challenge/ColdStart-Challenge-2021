import Vue from 'vue';
import Vuex from 'vuex';
import icecreamsModule from './modules/icecreams';
import catalogModule from './modules/catalog';
import recommendationsModule from './modules/recommendations';

Vue.use(Vuex);

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  modules: {
    icecreams: icecreamsModule,
    catalog: catalogModule,
    recommendations: recommendationsModule,
  },
  state: {
  },
});

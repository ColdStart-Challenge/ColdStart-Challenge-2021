import axios from 'axios';
import API from '../config';
import { parseList } from './action-utils';
import {
  GET_CATALOG,
  GET_RECOMMENDATIONS,
} from './mutation-types';

const captains = console;

export default {
  strict: process.env.NODE_ENV !== 'production',
  namespaced: true,
  state: {
    catalog: [],
    recommendations: [],
  },
  mutations: {
    [GET_CATALOG](state, catalog) {
      state.catalog = catalog;
    },
    [GET_RECOMMENDATIONS](state, recommendations) {
      state.recommendations = recommendations;
    },
  },
  actions: {
    async getCatalogAction({ commit }) {
      try {
        const response = await axios.get(`${API}/catalog`);
        const catalog = parseList(response);
        commit(GET_CATALOG, catalog);
        return catalog;
      } catch (error) {
        captains.error(error);
        throw new Error(error);
      }
    },
    async getRecommendationsAction({ commit }) {
      try {
        const response = await axios.get(`${API}/catalog`);
        const catalog = parseList(response);
        commit(GET_RECOMMENDATIONS, catalog);
        return catalog;
      } catch (error) {
        captains.error(error);
        throw new Error(error);
      }
    },

  },
  getters: {
    catalog: (state) => state.catalog,
    recommendations: (state) => state.recommendations,
  },
};

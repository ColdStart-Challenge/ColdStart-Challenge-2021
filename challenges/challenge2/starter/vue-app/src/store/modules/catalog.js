import axios from 'axios';
import API from '../config';
import { parseList, parseItem } from './action-utils';
import { GET_CATALOG, GET_RECOMMENDATION } from './mutation-types';

const captains = console;

export default {
  strict: process.env.NODE_ENV !== 'production',
  namespaced: true,
  state: {
    catalog: [],
    recommendation: {},
  },
  mutations: {
    [GET_CATALOG](state, catalog) {
      state.catalog = catalog;
    },
    [GET_RECOMMENDATION](state, recommendation) {
      state.recommendation = recommendation;
    },
  },
  actions: {
    async getCatalogAction({ commit }) {
      try {
        const response = await axios.get(`${API}/catalog`);
        const catalog = parseList(response);

        const responseR = await axios.get(`${API}/recommendation`);
        const recommendation = parseItem(responseR, 200);
        const icecreamId = parseInt(recommendation.rewardActionId, 10);
        const result = catalog.filter((obj) => obj.Id === icecreamId)[0];

        // remove recommended
        const index = catalog.indexOf(result);
        if (index > -1) {
          catalog.splice(index, 1);
        }

        result.EventId = recommendation.eventId;

        commit(GET_RECOMMENDATION, result);
        commit(GET_CATALOG, catalog);
      } catch (error) {
        captains.error(error);
        throw new Error(error);
      }
    },
  },
  getters: {
    catalog: (state) => state.catalog,
    recommendation: (state) => state.recommendation,
  },
};

import axios from 'axios';
import API from '../config';
import { parseList } from './action-utils';
import {
  GET_RECOMMENDATIONS,
} from './mutation-types';

const captains = console;

export default {
  strict: process.env.NODE_ENV !== 'production',
  namespaced: true,
  state: {
    recommendations: [],
  },
  mutations: {
    [GET_RECOMMENDATIONS](state, recommendations) {
      state.recommendations = recommendations;
    },
  },
  actions: {
    async getRecommendationsAction({ commit }) {
      try {
        const response = await axios.get(`${API}/recommendations`);
        const recommendations = parseList(response);
        commit(GET_RECOMMENDATIONS, recommendations);
        return recommendations;
      } catch (error) {
        captains.error(error);
        throw new Error(error);
      }
    },

  },
  getters: {
    recommendations: (state) => state.recommendations,
  },
};

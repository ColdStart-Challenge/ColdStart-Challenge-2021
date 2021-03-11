import axios from 'axios';
import API from '../config';
import { POST_REWARD } from './mutation-types';


const captains = console;

export default {
  strict: process.env.NODE_ENV !== 'production',
  namespaced: true,
  state: {
    reward: {},
  },
  mutations: {
    [POST_REWARD](state, reward) {
      state.reward = reward;
    },
  },
  actions: {
    async postRewardAction({ commit }, ret) {
      try {
        const response = await axios.post(`${API}/rewards`, ret);
        commit(POST_REWARD, response);
      } catch (error) {
        captains.error(error);
        throw new Error(error);
      }
    },
  },
  getters: {
    reward: (state) => state.reward,
  },
};

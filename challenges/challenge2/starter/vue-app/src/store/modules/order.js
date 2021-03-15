import axios from 'axios';
import API from '../config';
import { POST_ORDER } from './mutation-types';
import { parseItem } from './action-utils';

const captains = console;

export default {
  strict: process.env.NODE_ENV !== 'production',
  namespaced: true,
  state: {
    order: {},
  },
  mutations: {
    [POST_ORDER](state, order) {
      state.order = order;
    },
  },
  actions: {
    async postOrderAction({ commit }, ret) {
      try {
        const response = await axios.post(`${API}/orders`, ret);
        const order = parseItem(response, 201);
        commit(POST_ORDER, order);
        return order;
      } catch (error) {
        captains.error(error);
        throw new Error(error);
      }
    },
  },
  getters: {
    order: (state) => state.order,
  },
};

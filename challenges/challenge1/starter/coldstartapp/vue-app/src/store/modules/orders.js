import axios from 'axios';
import API from '../config';
import { parseItem } from './action-utils';
import { POST_ORDER } from './mutation-types';

const captains = console;

export default {
  strict: process.env.NODE_ENV !== 'production',
  namespaced: true,
  state: {
    orders: [],
  },
  mutations: {
    [POST_ORDER](state, order) {
      state.orders.push(order);
    },
  },
  actions: {
    async placePreOrderAction({ commit }, itemId) {
      try {
        const response = await axios.post(`${API}/orders`, { itemId });
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
    orders: (state) => state.orders,
  },
};

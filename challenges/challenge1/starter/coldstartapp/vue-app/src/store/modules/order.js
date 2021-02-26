import axios from 'axios';
import API from '../config';
import POST_ORDER from './mutation-types';
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
        console.log("Enter postOrderAction");
        console.log(ret);
        try {
            console.log("Enter postOrderAction");
            console.log("Before POST");
            const response = await axios.post(`${API}/orders`, ret);
            console.log("After POST");
            console.log("Before Parse");
            const order = parseItem(response);
            console.log("After Parse");
            console.log(order);
            commit(POST_ORDER, order);
            console.log("Leave postOrderAction");
            return order;
        } catch (error) {
            captains.error(error);
            throw new Error(error);
        }
      },
    },
    getters: {
      catalog: (state) => state.order,
    },
  };
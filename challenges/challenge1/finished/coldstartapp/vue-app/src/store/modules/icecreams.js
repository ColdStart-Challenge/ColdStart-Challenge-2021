import axios from 'axios';
import API from '../config';
import { parseItem, parseList } from './action-utils';
import {
  GET_ICECREAMS,
  ADD_ICECREAM,
} from './mutation-types';

const captains = console;

export default {
  strict: process.env.NODE_ENV !== 'production',
  namespaced: true,
  state: {
    icecreams: [],
  },
  mutations: {
    [GET_ICECREAMS](state, icecreams) {
      state.icecreams = icecreams;
    },
    [ADD_ICECREAM](state, icecream) {
      state.icecreams.unshift(icecream);
    },
  },
  actions: {
    // actions let us get to ({ state, getters, commit, dispatch }) {
    async getIcecreamsAction({ commit }) {
      try {
        const response = await axios.get(`${API}/orders`);
        const icecreams = parseList(response);
        commit(GET_ICECREAMS, icecreams);
        return icecreams;
      } catch (error) {
        captains.error(error);
        throw new Error(error);
      }
    },
    async buyIcecreamAction({ commit }, icecream) {
      try {
        const response = await axios.post(`${API}/orders`, icecream);
        const addedIcecream = parseItem(response, 201);
        commit(ADD_ICECREAM, addedIcecream);
        return addedIcecream;
      } catch (error) {
        captains.error(error);
        throw new Error(error);
      }
    },
  },
  getters: {
    icecreams: (state) => state.icecreams,
  },
};

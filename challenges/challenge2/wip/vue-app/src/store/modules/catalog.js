import axios from 'axios';
import API from '../config';
import { parseList } from './action-utils';
import {
  GET_CATALOG,
  GET_PERSONALIZER,
} from './mutation-types';

const captains = console;

export default {
  strict: process.env.NODE_ENV !== 'production',
  namespaced: true,
  state: {
    catalog: [],
    recommended: [],
  },
  mutations: {
    [GET_CATALOG](state, catalog) {
      state.catalog = catalog;
    },
    [GET_PERSONALIZER](state, recommended) {
      state.recommended = recommended;
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
    async getPersonalizerAction({ commit }) {
      try {
        const response = await axios.get(`${API}/personalizer`);
        const recommended = parseList(response);
        commit(GET_PERSONALIZER, recommended);
        return recommended;
      } catch (error) {
        captains.error(error);
        throw new Error(error);
      }
    },
  },
  getters: {
    catalog: (state) => state.catalog,
    recommended: (state) => state.recommended,
  },
};

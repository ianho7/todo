import Vue from 'vue'
import Vuex from 'vuex'
import { ITodoState } from '@/store/modules/todo'

Vue.use(Vuex)

export interface RootState {
  todo: ITodoState;
}

export default new Vuex.Store<RootState>({})

import Vue from 'vue'
import Vuex from 'vuex'
import { TodoState } from '@/store/modules/todo'

Vue.use(Vuex)

export interface RootState {
  todoStore: TodoState;
}

export default new Vuex.Store<RootState>({})

import { VuexModule, Module, Mutation, Action, getModule } from 'vuex-module-decorators'
import store from '@/store'
import ITodo from '@/types/ITodo'

interface TodoStore {
  trashes: ITodo[];
}

@Module({ dynamic: true, store, name: 'config' })
class TodoStore extends VuexModule implements TodoStore {
  public trashes: ITodo[] = [];

  @Mutation
  private ADD_TRASH (todo: ITodo) {
    this.trashes.push(todo)
  }

  public get trashCount () {
    return this.trashes.length
  }

  @Action({ rawError: false })
  public addTrash (todo: ITodo) {
    this.ADD_TRASH(todo)
  }
};

export const TodoStoreModule = getModule(TodoStore)

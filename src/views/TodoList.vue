<template>
  <div class="todo-container">
    <div class="todo-header">🌞 Todo List 🌞</div>
    <div class="todo-content">
      <!-- input field -->
      <div class="title">新增</div>
      <input
        v-model="content"
        ref="input"
        placeholder="✏️ 写点什么呗..."
        class="todo-input-field"
        @keydown.enter="save"
      />
      <div class="title">待完成{{todoCount}}</div>
      <!-- todos -->
      <todo-item
        v-for="(todo, i) in todos"
        :key="todo.time.getTime()"
        :todo="todo"
        @click="complete(i)"/>
      <!-- default -->
      <div v-show="todos.length <= 0" class="default-todo-content">
        暂无待完成事项
      </div>
      <div class="title">已完成{{trashCount}}</div>
      <!-- todos -->
      <todo-item
        v-for="todo in trashes"
        :key="todo.time.getTime()"
        type="trash"
        :todo="todo"/>
      <!-- default -->
      <div v-show="trashes.length <= 0" class="default-todo-content">
        暂无已完成事项
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import ITodo from '@/types/ITodo'
import TodoItem from '@/components/TodoItem.vue'
import { TodoModule } from '@/store/modules/todo'

@Component({
  name: 'TodoList',
  components: {
    TodoItem
  }
})
export default class extends Vue {
  // 输入框内容
  private content = '';

  // 待完成
  private todos: ITodo[] = [
    { content: '分享一篇文章', time: new Date() }
  ];

  // 待完成数量
  get todoCount () {
    const { length } = this.todos
    return length > 0 ? `（共${length}项）` : ''
  }

  // 已完成数量
  get trashCount () {
    return TodoModule.trashCount > 0
      ? `（共${TodoModule.trashCount}项）`
      : ''
  }

  // 已完成数量
  get trashes () {
    return TodoModule.trashes
  }

  // 将待办项设为完成
  public complete (index: number) {
    const targetTodo = this.todos.splice(index, 1)
    TodoModule.addTrash(targetTodo[0])
  }

  // 保存输入框内容
  public save () {
    this.todos.push({
      content: this.content,
      time: new Date()
    })

    this.content = '';
    // 取消聚焦
    (this.$refs.input as HTMLInputElement).blur()
  }
}
</script>

<style scoped>
.todo-header {
  font-size: 24px;
}
.title {
  margin-top: 40px;
  font-size: 16px;
  font-weight: 500;
  text-align: left;
}
.default-todo-content {
  margin-top: 20px;
  color: grey;
}
.todo-input-field {
  width: 100%;
  height: 40px;
  margin-top: 10px;
  padding-left: 10px;
  box-sizing: border-box;
  font-size: 16px;
  text-align: left;
  line-height: 40px;
}
</style>

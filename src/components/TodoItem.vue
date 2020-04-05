<template>
  <div
    class="todo-item"
    @click="complete">
    {{todo.content}}
    <template v-if="type === 'trash'">☑️</template>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import ITodo from '@/types/ITodo'

@Component({
  name: 'TodoItem'
})
export default class extends Vue {
  @Prop({ default: 'todo' }) private type!: string;
  @Prop({ required: true }) private todo!: ITodo;

  public complete () {
    this.$emit('click')
  }
}
</script>

<style scoped>
.todo-item {
  position: relative;
  width: 100%;
  height: 40px;
  padding-left: 30px;
  box-sizing: border-box;
  font-size: 16px;
  text-align: left;
  line-height: 40px;
}
.todo-item::before {
  position: absolute;
  content: '';
  top: 14px;
  left: 10px;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: 1px solid grey;
}
.todo-item::after {
  position: absolute;
  content: '';
  bottom: 0;
  left: 10px;
  width: calc(100% - 10px);
  border-bottom: 1px solid #2c3e50;
  transform: scaleY(.3);
}
</style>

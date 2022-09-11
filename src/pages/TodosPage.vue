<template>
  <div v-if="user" class="page">
    <div class="page__header">Мои задачи</div>
    <div class="create-todo">
      <label>
        <input
          placeholder="Напишите, что вы хотите сделать..."
          class="create-todo__input"
          :value="inputValue"
          @input="onInput"
          @keypress.enter="addNewTodo"
        />
      </label>
      <button class="create-todo__button" @click="addNewTodo">Создать</button>
    </div>
    <div class="todo-table">
      <div class="todo-table__header">
        <div class="title">Название</div>
        <div class="action">Действие</div>
      </div>
      <div v-if="todos.length === 0" class="list-check">Список пуст</div>
      <div class="todos" v-else>
        <div class="todo" v-for="(todo, indx) in todos" :key="todo.id">
          <label>
            <input
              type="checkbox"
              class="todo__checkbox"
              :checked="todo.isDone"
              @click="onCheckboxInput(todo.id, indx)"
            />
            <div class="checkbox"></div>
            <div class="todo__text">{{ todo.title }}</div>
          </label>
          <div class="todo__actions">
            <img
              src="../../src/assets/img/pen.svg"
              alt="edit"
              class="edit"
              @click="editTodo(todo.id, todo)"
            />
            <img
              src="../../src/assets/img/pannier.svg"
              alt="delete"
              class="delete"
              @click="deleteTodo(todo.id)"
            />
          </div>
        </div>
      </div>
      <div class="counter">Количество задач: {{ todos.length }}</div>
    </div>
  </div>
</template>

<script>
import ModalWindow from "@/components/ModalWindowEditTodo";
import plugin from "@/store/plugin";

import { axiosInstance } from "@/api/axiosInstance";

export default {
  name: "MainPage",
  props: {
    todos: {
      type: Array,
      required: true,
    },
    isEditModalOpen: {
      type: Boolean,
      required: false,
      default: false,
    },
    user: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      title: "",
      inputValue: "",
      currentTodo: null,
      count: 0,
      titleValue: "",
    };
  },
  created() {
    this.getTodos();
  },
  methods: {
    getTodos() {
      this.$emit("update-todo");
    },
    onInput(event) {
      this.inputValue = event.target.value;
    },
    addNewTodo() {
      if (this.inputValue.length !== 0) {
        this.$myStore
          .newTodo(this.inputValue, false)
          .then(() => this.getTodos());
        this.inputValue = "";
      }
    },
    editTodo(id, todo) {
      this.currentTodo = todo;
      this.openModal();
    },
    onCheckboxInput(id) {
      const todo = this.todos.find((todo) => todo.id === id);
      todo.isDone = !todo.isDone;
      this.$myStore
        .updateTodo(todo.title, todo.isDone, todo.id)
        .then(() => this.getTodos(id));
    },
    openModal() {
      this.$emit("open-edit");
      this.$emit("currentTodo", this.currentTodo, this.isDone);
    },
    deleteTodo(id) {
      this.$myStore.deleteTodo(id).then(() => this.getTodos());
    },
  },
};
</script>

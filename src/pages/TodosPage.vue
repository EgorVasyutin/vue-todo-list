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
              @click="isDoneController(todo.id, indx)"
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
export default {
  name: "MainPage",
  props: {
    user: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      title: "",
      inputValue: "",
      todos: [],
      currentTodo: null,
      isDone: false,
      count: 0,
      isEditModalOpen: false,
    };
  },
  created() {
    // this.getTodos();
  },
  methods: {
    getTodos() {
      fetch("http://localhost:1000/api/todo")
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          this.todos = data;
          this.todos.sort((a, b) => (a.id > b.id ? 1 : -1));
        });
    },
    onInput(event) {
      this.inputValue = event.target.value;
    },
    addNewTodo() {
      if (this.inputValue.length !== 0) {
        fetch("http://localhost:1000/api/todo", {
          method: "POST",
          body: JSON.stringify({
            title: this.inputValue,
            isDone: false,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }).then(() => this.getTodos());
        this.inputValue = "";
      }
    },
    editTodo(id, todo) {
      this.currentTodo = todo;
      this.openModal();
    },
    isDoneController(id, indx) {
      if (!this.todos[indx].isDone) {
        this.isDone = true;
        console.log(true);
      } else {
        this.isDone = false;
        console.log(false);
      }
      fetch(`http://localhost:1000/api/todo/${id}`, {
        method: "PUT",
        body: JSON.stringify({
          title: this.todos[indx].title,
          isDone: this.isDone,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then(() => this.getTodos(id));
    },
    openModal() {
      this.isEditModalOpen = true;
    },
    closeEditModal() {
      this.isEditModalOpen = false;
    },
    deleteTodo(id) {
      fetch(`http://localhost:1000/api/todo/${id}`, {
        method: "DELETE",
      }).then(() => this.getTodos());
    },
  },
};
</script>

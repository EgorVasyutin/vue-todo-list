<template>
  <app-header :user="user" @open-singin="openAuthModal" />

  <todos-page
    v-if="user"
    :user="user"
    :todos="todos"
    :isEditModalOpen="isEditModalOpen"
    @open-edit="onEditClose"
    @currentTodo="currentTodoInTodo"
    @update-todo="getTodos"
  />

  <modal-window
    :is-open="isAuthModalOpen"
    :title="modalTitle"
    @close="closeAuthModal"
  >
    <sign-in-form
      v-if="action === 'sign-in'"
      v-model:email="signInForm.email"
      v-model:password="signInForm.password"
    />
    <sign-up-form
      v-else-if="action === 'sign-up'"
      v-model:username="signUpForm.username"
      v-model:email="signUpForm.email"
      v-model:password="signUpForm.password"
      v-model:repeat-password="signUpForm.repeatPassword"
    />

    <template v-slot:footer>
      <div v-if="action === 'sign-in'" class="flex flex-col gap-16 w-full">
        <app-button class="w-full" :disabled="!isFormValid" @click="signIn">
          Войти
        </app-button>
        <app-button type="secondary" @click="() => (action = 'sign-up')">
          Зарегистрироваться
        </app-button>
      </div>

      <div v-else-if="action === 'sign-up'" class="flex flex-col gap-16 w-full">
        <app-button class="w-full" :disabled="!isFormValid" @click="signUp">
          Создать аккаунт
        </app-button>
        <app-button type="secondary" @click="() => (action = 'sign-in')">
          Войти
        </app-button>
      </div>
    </template>
  </modal-window>
  <modal-window-edit-todo
    :isEditModalOpen="isEditModalOpen"
    :todo="todo"
    :is-done="isDone"
    @update-todo="getTodos"
    @close-modal="onEditClose"
  />
</template>

<script>
let action;

import AppHeader from "@/components/AppHeader.vue";
import TodosPage from "@/pages/TodosPage.vue";
import ModalWindow from "@/components/ModalWindow.vue";
import { AppButton, AppInput } from "@/components/ui";
import SignInForm from "@/components/SignInForm";
import SignUpForm from "@/components/SignUpForm";
import modalWindowEditTodo from "@/components/ModalWindowEditTodo";

import { axiosInstance } from "@/api/axiosInstance";

export default {
  components: {
    AppHeader,
    TodosPage,
    AppButton,
    ModalWindow,
    SignInForm,
    SignUpForm,
    modalWindowEditTodo,
  },
  data() {
    return {
      todos: [],
      isDone: false,
      todo: null,
      token: "",
      isEditModalOpen: false,
      user: null,
      isAuthModalOpen: false,
      signUpForm: {
        username: "",
        email: "",
        password: "",
        repeatPassword: "",
      },
      signInForm: {
        email: "vaspovas@gmail.com",
        password: "123123",
      },
      action: "sign-in",
    };
  },
  created() {
    this.$myStore
      .checkAuth()
      .then(() => {
        this.user = this.$myStore.user;
        this.isAuthModalOpen = !this.user;
      })
      .catch(() => {
        this.openAuthModal();
      });
  },
  computed: {
    modalTitle() {
      return this.action === "sign-in" ? "Вход" : "Регистрация";
    },
    isEmailValid() {
      return (
        this.signInForm.email.includes(".com") ||
        this.signInForm.email.includes(".ru")
      );
    },
    isPasswordValid() {
      return this.signInForm.password.length >= 6;
    },
    isFormValid() {
      return this.isEmailValid && this.isPasswordValid;
    },
  },
  methods: {
    logout() {
      this.$myStore.logout();
      this.user = null;
    },
    getTodos() {
      const authHeader = `Bearer ${localStorage.getItem("accessToken")}`;

      this.$myStore.getTodos().then((response) => {
        this.todos = response.data;
        this.todos.sort((a, b) => (a.id > b.id ? 1 : -1));
      });
    },
    currentTodoInTodo(todo, isDone) {
      this.isDone = isDone;
      this.todo = todo;
    },
    openAuthModal() {
      this.logout();
      this.isAuthModalOpen = true;
    },

    closeAuthModal() {
      this.isAuthModalOpen = false;
    },

    onEditClose() {
      this.isEditModalOpen = !this.isEditModalOpen;
    },
    signUp() {
      this.$myStore
        .registration(
          this.signUpForm.username,
          this.signUpForm.email,
          this.signUpForm.password
        )
        .then(() => {
          this.user = this.$myStore.user;
          this.closeAuthModal();
        })
        .catch((e) => {
          console.log(e);
        });
    },

    signIn() {
      this.$myStore
        .login(this.signInForm.email, this.signInForm.password)
        .then(() => {
          this.user = this.$myStore.user;
          this.closeAuthModal();
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
};
</script>

<style lang="scss">
@import "assets/styles/style.scss";
</style>

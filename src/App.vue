<template>
  <app-header :user="user" @open-singin="onClose" />

  <todos-page
    v-if="user"
    :user="user"
    :isEditModalOpen="isEditModalOpen"
    @open-edit="onEditClose"
  />

  <modal-window :is-open="isAuthModalOpen" :title="modalTitle" @close="onClose">
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
  <modal-window-edit-todo :isEditModalOpen="isEditModalOpen" />
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
      token: [],
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
        email: "egit@mail.ru",
        password: "123456",
      },
      action: "sign-in",
    };
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
    onClose() {
      console.log(123);
      this.isAuthModalOpen = !this.isAuthModalOpen;
    },
    onEditClose() {
      this.isEditModalOpen = !this.isEditModalOpen;
    },
    signUp() {
      if (this.signUpForm.repeatPassword === this.signUpForm.password) {
        const payload = {
          username: this.signUpForm.username,
          email: this.signUpForm.email,
          password: this.signUpForm.password,
        };

        axiosInstance
          .post("sign-up", payload)
          .then((response) => {
            console.log(response);
            this.user = response.user.data;
            this.token.push(response.headers.authorization.token);
            this.onClose();
          })
          .catch((axiosError) => {
            console.error(`Ошибка: ${axiosError.response.user.data}`);
          });
      } else {
        console.error("Паполь не верен повтору паролю");
      }
    },
    signIn() {
      const payload = {
        email: this.signInForm.email,
        password: this.signInForm.password,
      };

      axiosInstance
        .post("sign-in", payload)
        .then((response) => {
          this.user = response.data;
          this.onClose();
        })
        .catch((axiosError) => {
          console.error(`Ошибка: ${axiosError.response.candidate.data}`);
        });
    },
  },
};
</script>

<style lang="scss">
@import "assets/styles/style.scss";
</style>

<template>
  <app-header :user="user" />

  <todos-page v-if="user" :user="user" />

  <modal-window :is-open="isAuthModalOpen" :title="modalTitle" @close="onClose">
    <sign-in-form
      v-if="action === 'sign-in'"
      v-model:email="signInForm.email"
      v-model:password="signInForm.password"
    />
    <sign-up-form
      v-else-if="action === 'sign-up'"
      v-model:email="signInForm.email"
      v-model:password="signInForm.password"
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
</template>

<script>
import AppHeader from "@/components/AppHeader.vue";
import TodosPage from "@/pages/TodosPage.vue";
import ModalWindow from "@/components/ModalWindow.vue";
import { AppButton, AppInput } from "@/components/ui";
import SignInForm from "@/components/SignInForm";
import SignUpForm from "@/components/SignUpForm";

import { axiosInstance } from "@/api/axiosInstance";

export default {
  components: {
    AppHeader,
    TodosPage,
    ModalWindow,
    AppButton,
    SignInForm,
    SignUpForm,
  },
  data() {
    return {
      user: null,
      isAuthModalOpen: true,
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
      this.isAuthModalOpen = !this.isAuthModalOpen;
    },
    signUp() {
      console.log(123);
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
          console.error(`Ашипка: ${axiosError.response.data}`);
        });
    },
  },
};
</script>

<style lang="scss">
@import "assets/styles/style.scss";
</style>

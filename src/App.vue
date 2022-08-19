<template>
  <app-header :user="user" />

  <todos-page v-if="user" :user="user" />

  <modal-window :is-open="isAuthModalOpen" title="Вход" @close="onClose">
    <form class="flex flex-col gap-24">
      <app-input
        v-model:model-value="signInForm.email"
        label="Электронная почта"
        placeholder="myemail@gmail.com"
        type="email"
      />
      <app-input
        v-model:model-value="signInForm.password"
        label="Пароль"
        placeholder="минимум 6 символов"
        type="password"
      />
    </form>

    <template v-slot:footer>
      <div class="flex flex-col gap-16 w-full">
        <app-button class="w-full" :disabled="!isFormValid" @click="signIn">
          Войти
        </app-button>
        <app-button type="secondary">Зарегистрироваться</app-button>
      </div>
    </template>
  </modal-window>
</template>

<script>
import AppHeader from "@/components/AppHeader.vue";
import TodosPage from "@/pages/TodosPage.vue";
import ModalWindow from "@/components/ModalWindow.vue";
import { AppButton, AppInput } from "@/components/ui";

import { axiosInstance } from "@/api/axiosInstance";

export default {
  components: {
    AppHeader,
    TodosPage,
    ModalWindow,
    AppButton,
    AppInput,
  },
  data() {
    return {
      user: null,
      isAuthModalOpen: true,
      signInForm: {
        email: "egit@mail.ru",
        password: "123456",
      },
    };
  },
  computed: {
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

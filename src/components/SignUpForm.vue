<template>
  <form class="flex flex-col gap-24">
    <app-input
      v-model:model-value="usernameModel"
      label="Полное имя"
      placeholder="Иванов Иванович"
      type="email"
    />
    <app-input
      v-model:model-value="emailModel"
      label="Электронная почта"
      placeholder="myemail@gmail.com"
      type="email"
    />
    <app-input
      v-model:model-value="passwordModel"
      label="Пароль"
      placeholder="минимум 6 символов"
      type="password"
    />
    <app-input
      v-model:model-value="repeatPasswordModel"
      label="Повторите пароль"
      placeholder="минимум 6 символов"
      type="password"
    />
  </form>
</template>

<script>
import { AppInput } from "@/components/ui";

export default {
  name: "SignInForm",
  components: {
    AppInput,
  },
  props: {
    username: {
      type: String,
      default: "",
    },
    email: {
      type: String,
      default: "",
    },
    password: {
      type: String,
      default: "",
    },
    repeatPassword: {
      type: String,
      default: "",
    },
  },
  emits: [
    "update:email",
    "update:password",
    "update:username",
    "update:repeatPassword",
  ],
  data() {
    return {
      usernameModel: this.username,
      emailModel: this.email,
      passwordModel: this.password,
      repeatPasswordModel: this.repeatPassword,
    };
  },
  watch: {
    usernameModel() {
      this.$emit("update:username", this.usernameModel);
    },
    emailModel() {
      this.$emit("update:email", this.emailModel);
    },
    passwordModel() {
      this.$emit("update:password", this.passwordModel);
    },
    repeatPasswordModel() {
      this.$emit("update:repeat-password", this.repeatPasswordModel);
    },
  },
};
</script>

<style scoped></style>

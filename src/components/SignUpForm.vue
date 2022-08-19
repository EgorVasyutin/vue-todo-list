<template>
  <form class="flex flex-col gap-24">
    <app-input
      v-model:email="emailModel"
      label="Электронная почта"
      placeholder="myemail@gmail.com"
      type="email"
    />
    <app-input
      v-model:password="passwordModel"
      label="Пароль"
      placeholder="минимум 6 символов"
      type="password"
    />
    <app-input
      v-model:password="repeatPasswordModel"
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
  emits: ["update:email", "update:password"],
  data() {
    return {
      emailModel: this.email,
      passwordModel: this.password,
      repeatPasswordModel: this.repeatPassword,
    };
  },
  watch: {
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

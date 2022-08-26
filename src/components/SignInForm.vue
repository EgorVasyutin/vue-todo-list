<template>
  <form class="flex flex-col gap-24">
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
  },
  emits: ["update:email", "update:password"],
  data() {
    return {
      emailModel: this.email,
      passwordModel: this.password,
    };
  },
  watch: {
    emailModel() {
      this.$emit("update:email", this.emailModel);
    },
    passwordModel() {
      this.$emit("update:password", this.passwordModel);
    },
  },
};
</script>

<style scoped></style>

<template>
  <label class="flex flex-col gap-2 app-input">
    <span class="label-text">{{ label }}</span>
    <input v-bind="$attrs" :value="modelValue" class="input" @input="onInput" />
  </label>
</template>

<script>
export default {
  name: "AppInput",
  props: {
    label: {
      type: String,
      default: "",
    },
    modelValue: {
      type: String,
      default: "",
    },
  },
  emits: ["update:model-value"],
  created() {
    console.log(this.label);
  },
  methods: {
    onInput(event) {
      this.$emit("update:model-value", event.target.value);
    },
  },
};
</script>

<style lang="scss" scoped>
.app-input {
}

.label-text {
  font: 14px "lato-regular", sans-serif;
  color: #5a5a5a;
}

.input {
  padding: 12px 16px 13px;
  background-color: #f3f3f3;
  outline: none;
  border-radius: 8px;
}
</style>

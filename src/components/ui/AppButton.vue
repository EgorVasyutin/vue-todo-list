<template>
  <button class="app-button" :class="styleClass">
    <slot />
  </button>
</template>

<script>
export default {
  name: "AppButton",
  props: {
    type: {
      type: String,
      default: "primary",
    },
  },
  computed: {
    styleClass() {
      return `app-button-${this.type}`;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/vars.scss";

.app-button {
  padding: 10px 16px;
  border-radius: 8px;
  font-size: 16px;
  line-height: 24px;

  &-primary {
    background-color: $color-primary;
    color: white;
  }
  &-secondary {
    background-color: $color-secondary;
    color: $color-text-primary;
  }
}
</style>

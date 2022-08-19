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
  cursor: pointer;
  transition: background-color 0.2s;

  &-primary {
    background-color: $color-primary;
    color: white;

    &:hover {
      background-color: darken($color-primary, 5);
    }
  }

  &-secondary {
    background-color: $color-secondary;
    color: $color-text-primary;

    &:hover {
      background-color: darken($color-secondary, 5);
    }
  }

  &:focus {
    outline: 1px solid $color-primary;
    outline-offset: 2px;
  }

  &:active {
    outline: 3px solid $color-primary;
    outline-offset: 2px;
  }

  &:disabled {
    background-color: #f2f2f2;
    color: #d9d9d9;
    cursor: not-allowed;
  }
}
</style>

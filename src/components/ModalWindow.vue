<template>
  <div v-show="isOpen" class="modal-overlay">
    <div class="modal">
      <header class="modal-header">
        <div class="modal-title">{{ title }}</div>
        <img
          :src="require('@/assets/img/close.svg')"
          alt="close"
          class="close"
          @click="close"
        />
      </header>

      <slot />

      <footer class="modal-footer">
        <slot name="footer">
          <app-button>Войти</app-button>
          <app-button type="secondary">Отмена</app-button>
        </slot>
      </footer>
    </div>
  </div>
</template>

<script>
import AppButton from "@/components/ui/AppButton";

export default {
  name: "ModalWindow",
  props: {
    isOpen: {
      type: Boolean,
      required: false,
      default: false,
    },
    title: {
      type: String,
      default: "",
    },
  },
  components: {
    AppButton,
  },
  watch: {
    todo() {
      this.inputValue = this.todo.title;
    },
  },
  data() {
    return {
      inputValue: "",
    };
  },
  methods: {
    close() {
      this.$emit("close");
    },
  },
};
</script>

<style lang="scss" scoped>
.modal-overlay {
  background-color: rgba(0, 0, 0, 0.3);
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1;
}

.modal {
  margin: 200px auto 0;
  width: 500px;
  padding: 20px 24px;
  border-radius: 8px;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  gap: 24px;

  &-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &-title {
    font: bold 24px "lato-bold", sans-serif;
    line-height: 32px;
  }

  &-footer {
    display: flex;
    gap: 24px;
  }
}

.close {
  cursor: pointer;
}
</style>

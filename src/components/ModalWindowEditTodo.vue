<template>
  <div v-show="isEditModalOpen" class="modal-overlay" @open-edit="close">
    <div v-if="true" class="modal">
      <div class="container">
        <div class="modal-text">Редактировать задачу</div>
        <div class="close" @click="close">
          <img src="@/assets/img/close.svg" alt="close" />
        </div>
      </div>
      <div class="input-text">Название задачи</div>
      <input
        class="modal-input"
        :value="inputValue"
        @input="(event) => (inputValue = event.target.value)"
      />
      <div class="modal-actions">
        <app-button
          type="primary"
          class="modal-btm redact"
          @click="editTodo(todo.id, isDone)"
        >
          Редактировать
        </app-button>
        <app-button @click="close" type="secondary">Отмена</app-button>
      </div>
    </div>
  </div>
</template>

<script>
import { AppButton, AppInput } from "@/components/ui";
import axiosInstance from "@/api/axiosInstance";
export default {
  name: "ModalWindow",
  components: { AppButton },
  props: {
    isDone: {
      type: Boolean,
      required: false,
      default: false,
    },
    isEditModalOpen: {
      type: Boolean,
      required: false,
      default: false,
    },
    isOpen: {
      type: Boolean,
      required: false,
      default: false,
    },
    todo: {
      type: Object,
      default: null,
    },
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
      this.$emit("close-modal");
    },
    editTodo(id, isDone) {
      axiosInstance
        .put(`todos/${id}`, { title: this.inputValue, isDone })
        .then(() => {
          this.$emit("update-todo");
          this.close();
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.input-text {
  font: 14px "lato-regular", sans-serif;
  color: #5a5a5a;
  line-height: 17px;
  padding: 15px 0 0 15px;
}
.container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px 0 0 15px;
  margin-bottom: 10px;

  .close {
    padding-right: 15px;
    cursor: pointer;
  }
}
.modal {
  width: 500px;
  height: 207px;
  background-color: #fff;
  z-index: 2;
  margin-top: 200px;
  border-radius: 5px;
  opacity: 1;

  &-text {
    font: bold 24px "lato-bold", sans-serif;
    line-height: 32px;
    color: black;
  }
  &-input {
    width: 70%;
    margin: 2px 0 0 15px;
    padding: 12px 16px 13px;
    background-color: #f3f3f3;
    outline: none;
    border-radius: 8px;
  }
  &-actions {
    display: flex;
    align-items: flex-end;
    justify-content: flex-end;
    padding-top: 20px;
    gap: 10px;
    margin-right: 15px;

    .modal-btm {
      height: 44px;
      font-family: "lato-regular", sans-serif;
      border-radius: 8px;
      font-weight: 400;
      font-size: 14px;
      line-height: 22px;
      cursor: pointer;
      background-color: #3178c6;
      color: white;
    }
  }
}

.modal-overlay {
  background-color: rgba(112, 128, 144, 0.9);
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1;
  display: flex;
  justify-content: center;
}
</style>

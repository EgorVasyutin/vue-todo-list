<template>
  <!--  <div class="modal-overlay" :style="{ display: isOpen ? 'flex' : 'none' }">-->
  <div v-show="isOpen" class="modal-overlay">
    <div v-if="todo" class="modal">
      <div class="modal-text">Редактировать задачу</div>
      <input
        class="modal-input"
        :value="inputValue"
        @input="(event) => (inputValue = event.target.value)"
      />
      <div class="modal-actions">
        <button class="modal-btm redact" @click="editTodo(todo.id)">
          Редактировать
        </button>
        <button class="modal-btm" @click="close">Отмена</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ModalWindow",
  props: {
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
    editTodo(id) {
      fetch(`http://localhost:1000/api/todo/${id}`, {
        method: "PUT",
        body: JSON.stringify({
          title: this.inputValue,
          isDone: this.isDone,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then(() => {
          this.$emit("update-todo");
          this.close();
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.modal {
  width: 500px;
  height: 170px;
  background-color: #fff;
  z-index: 2;
  margin-top: 200px;
  border-radius: 5px;
  opacity: 1;

  &-text {
    font-family: "lato-bold", sans-serif;
    font-size: 20px;
    padding: 15px 0 0 15px;
  }
  &-input {
    margin: 15px 0 0 15px;
    border-radius: 5px;
    width: 300px;
    height: 20px;
    border: 2px solid black;
    font-family: "lato-bold", sans-serif;
    font-size: 20px;
    padding: 5px;
    margin-top: 30px;
  }
  &-actions {
    display: flex;
    align-items: flex-end;
    justify-content: flex-end;
    padding-top: 20px;
    gap: 10px;
    margin-right: 15px;

    .modal-btm {
      width: 100px;
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

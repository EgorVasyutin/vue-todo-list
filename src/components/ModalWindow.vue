<template>
  <div class="modal-overlay">
    <div class="modal">
      <div class="modal-text">Редактировать задачу</div>
      <input class="modal-input" />
      <div class="modal-actions">
        <button class="modal-btm redact" @click="close()">Редактировать</button>
        <button class="modal-btm" @click="close()">Отмена</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ModalWindow",
  data() {
    return {};
  },
  methods: {
    close() {
      document.querySelector(".modal-overlay").style.display = "none";
    },
  },
};
</script>

<style lang="scss">
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
  background-color: slategray;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1;
  display: none;
  justify-content: center;
  opacity: 0.9;
}
</style>

<template>
  <app-header :user="user" />

  <todos-page :user="user" />

  <modal-window :is-open="isAuthModalOpen" @close="onClose">
    <h1>alsdfjlas</h1>
    <p>1212312312312</p>
  </modal-window>
</template>

<script>
import AppHeader from "@/components/AppHeader.vue";
import TodosPage from "@/pages/TodosPage.vue";
import ModalWindow from "@/components/ModalWindow.vue";

export default {
  components: {
    AppHeader,
    TodosPage,
    ModalWindow,
  },
  data() {
    return {
      user: null,
      isAuthModalOpen: true,
    };
  },
  methods: {
    onClose() {
      this.isAuthModalOpen = !this.isAuthModalOpen;
    },
  },
};
</script>

<style lang="scss">
@import "assets/styles/style.scss";
</style>

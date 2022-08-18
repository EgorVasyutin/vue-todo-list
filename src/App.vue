<template>
  <app-header />
  <router-view />
</template>

<script>
import AppHeader from "@/components/AppHeader";

export default {
  components: {
    AppHeader,
  },
};
</script>

<style lang="scss">
@import "assets/styles/style.scss";
</style>

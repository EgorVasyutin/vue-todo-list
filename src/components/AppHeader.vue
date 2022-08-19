<template>
  <header class="header">
    <div class="user">
      <span class="user-icon">
        <img
          src="../../src/assets/img/person-icon.svg"
          class="user-icon-img"
          alt="user-icon"
        />
      </span>

      <p v-if="user" class="user-name">{{ user.username }}</p>

      <img :src="actionIconPath" :alt="userAction" />
    </div>
  </header>
</template>

<script>
export default {
  name: "AppHeader",
  props: {
    user: {
      type: Object,
      default: null,
    },
  },
  computed: {
    userAction() {
      return this.user ? "logout" : "login";
    },
    actionIconPath() {
      return require(`@/assets/img/${this.userAction}.svg`);
    },
  },
};
</script>

<style lang="scss" scoped>
.header {
  width: 100vw;
  background-color: #f2f2f2;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px 0;
  margin-bottom: 52px;
}

.user {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;

  &-icon {
    border-radius: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    background-color: #d9d9d9;
  }
  &-name {
    font-family: lato-regular, sans-serif;
    font-size: 18px;
    line-height: 22px;
  }
}

.reg-log__container {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  position: absolute;
  top: 25px;
  right: 50px;

  .login {
    width: 100px;
    height: 40px;
    border-radius: 12px;
    background-color: #3178c6;
    color: white;
    font-family: "lato-regular", sans-serif;
    font-weight: 400;
    font-size: 18px;
    line-height: 22px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .register {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 200px;
    height: 40px;
    border-radius: 12px;
    background-color: white;
    color: slategray;
    font-family: "lato-regular", sans-serif;
    font-weight: 400;
    font-size: 18px;
    line-height: 22px;
  }
}
</style>

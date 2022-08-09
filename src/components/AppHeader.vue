<template>
  <header class="header">
    <div class="ellipse">
      <img
        src="../../src/assets/img/person-icon.svg"
        class="header__img"
        alt="user"
      />
    </div>
    <div class="header__text">Egor Vasyutin</div>
    <div class="reg-log__container">
      <a href="/login" onclick="router()" class="login">Войти</a>
      <a href="/register" onclick="router()" class="register"
        >Зарегистрироваться</a
      >
    </div>
  </header>
</template>

<script>
export default {
  name: "AppHeader",
};
</script>

<style lang="scss">
.header {
  width: 100vw;
  background-color: #f2f2f2;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 26px 0 26px 0;
  margin-bottom: 52px;

  .ellipse {
    border-radius: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    background-color: #d9d9d9;
  }
  &__img {
  }
  &__text {
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

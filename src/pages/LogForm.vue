<template>
  <div class="form">
    <h1 class="form-text">Login Account</h1>
    <div class="form-platforms">
      <div class="form-platforms__container">
        <img
          src="../../src/assets/img/google.svg"
          alt="Google"
          style="padding: 0px 10px 0px 5px"
        />
        <div class="form-platforms__text">Sign in with Google</div>
      </div>
      <div class="form-platforms__container">
        <img
          src="../../src/assets/img/facebook.svg"
          alt="facebook"
          class="form-platforms__img"
          style="padding: 0px 13px 0px 8px"
        />
        <div class="form-platforms__text">Sign in with Facebook</div>
      </div>
    </div>
    <div class="form-text__or">-OR-</div>
    <form class="form-inputs">
      <input
        placeholder="Fullname"
        class="form-inputs__input"
        :value="username"
        @input="username = $event.target.value"
      />
      <input
        placeholder="Email Address"
        class="form-inputs__input"
        :value="email"
        @input="email = $event.target.value"
      />
      <input
        placeholder="Password"
        class="form-inputs__input"
        :value="email"
        @input="email = $event.target.value"
      />
    </form>
    <div class="form-footer">
      <button class="form-footer__button">Login Account</button>
      <div class="form-footer__text">Already have an account? Log in</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AppForm",
  data() {
    return {
      users: null,
      username: "",
      email: "",
      password: "",
    };
  },
  created() {
    this.getUsers();
  },
  methods: {
    getUsers() {
      fetch("http://localhost:1000/api/todo")
        .then((response) => response.json())
        .then((data) => {
          this.users = data;
        });
    },
    checkUser() {
      if (
        this.users.find(
          (user) =>
            user.username === this.username &&
            user.email === this.email &&
            user.password === this.password
        )
      ) {
        //подключение тудушек
      }
    },
  },
};
</script>

<style scoped>
.form {
  margin-top: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.form-text {
  font-family: "roboto-bold", serif;
  font-weight: 700;
  font-size: 30px;
  line-height: 30px;
  margin-bottom: 50px;
}

.form-platforms {
  display: flex;
  gap: 50px;
  margin-bottom: 75px;
}

.form-platforms__container {
  border: 1px solid #969696;
  width: 275px;
  height: 55px;
  border-radius: 10px;
  display: flex;
  align-items: center;
}

.form-platforms__text {
  font-weight: 100;
  font-size: 18px;
  line-height: 0;
  font-family: "roboto-thin", serif;
}

.form-text__or {
  font-family: roboto-thin, serif;
  font-size: 18px;
  margin-bottom: 30px;
}

.form-inputs {
  display: flex;
  flex-direction: column;
  gap: 50px;
  margin-bottom: 80px;
}

.form-inputs__input {
  width: 435px;
  font-family: "roboto-thin", serif;
  font-size: 18px;
  border: none;
  border-bottom: 1px solid #e4e4ea;
  outline: none;
  padding-left: 10px;
  padding-bottom: 5px;
}

.form-footer {
}

.form-footer__button {
  font-family: "roboto-bold", serif;
  width: 434px;
  height: 53px;
  font-size: 18px;
  background: #d5dff6;
  border-radius: 15px;
  margin-bottom: 12px;
}

.form-footer__text {
  font-family: "roboto-thin", serif;
  font-size: 13px;
}
</style>

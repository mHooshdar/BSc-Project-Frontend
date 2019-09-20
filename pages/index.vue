<template>
  <form class="login-container text-center d-flex flex-column pb-4" @submit.prevent="submitLoginForm">
    <p class="login-container__title font-weight-bold py-4">
      ورود به حساب کاربری
    </p>
    <input v-model="username" class="mx-4 my-2 p-3 login-container__input" type="text" placeholder="نام کاربری" name="username">
    <input v-model="password" class="mx-4 my-2 p-3 login-container__input" type="password" placeholder="رمز عبور" name="password">
    <div v-if="!username" class="text-danger">
      * پر کردن نام کاربری اجباری است
    </div>
    <div v-if="!password" class="text-danger">
      * پر کردن رمز عبور اجباری است
    </div>
    <div v-if="error" class="text-danger">
      * نام کاربری یا رمز عبور اشتباه است
    </div>
    <input :disabled="loading" class="mx-4 my-2 p-3 login-container__button btn btn-success" type="submit" value="ورود به سامانه">
  </form>
</template>
<script>

export default {
  data () {
    return {
      username: '',
      password: '',
      loading: false,
      error: false,
    }
  },
  mounted () {
  },
  methods: {
    submitLoginForm () {
      this.loading = true;
      // get the jwt from rest api...
      this.$axios.$post('api/token/', {
        username: this.username,
        password: this.password,
      }).then(response => {
        this.loading = false;
        this.error = false;
        if (process.browser) {
          localStorage.setItem('token', response.token);
          localStorage.setItem('user_id', response.id);
        }
        this.$router.push('upload')
      }).catch(error => {
        this.loading = false;
        this.error = true;
      });
    }
  },
}
</script>

<style lang="scss" scoped>
  @import "~vars";

  .login-container {
    box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);
    width: 500px;
    margin: auto;
    background: white;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);

    &__title {
      font-size: 20px;
    }

    &__input {
      background: #f2f2f2;
      outline: none;
      border: none;
    }
    &__button {
      font-size: 15px;
      background: $button-success;
      border-radius: 0;
      &:hover {
        background: darken($button-success, 10%);
      }
    }
  }

</style>

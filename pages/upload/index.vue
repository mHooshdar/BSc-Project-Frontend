<template>
  <div class="container py-3">
    <div class="d-flex justify-content-between">
      <button class="btn btn-warning" @click="gotoImages">
        مشاهده تمام عکس‌ها
      </button>

      <label class="custom-file-upload m-0" @click="uploadImage">
        <input type="file">
        <span class="btn btn-info m-0">
          اپلود عکس
        </span>
      </label>

      <button class="btn btn-danger" @click="logout">
        خروج از حساب کاربری
      </button>
    </div>
  </div>
</template>

<script>

export default {
  data () {
    return {
      file: null,
    }
  },
  mounted () {
    if (process.browser && (!localStorage.getItem('token') || !localStorage.getItem('user_id'))) {
      this.$router.push('/');
    }
  },
  methods: {
    logout () {
      localStorage.removeItem('token')
      localStorage.removeItem('user_id')
      this.$router.push('/');
    },
    uploadImage (e) {

    },
    inputFile () {

    },
    gotoImages () {
      this.$router.push('images')
    }
  }
}
</script>

<style lang="scss" scoped>
  .custom-file-upload {
    display: inline-block;

    input[type="file"] {
      display: none;
    }
  }

</style>

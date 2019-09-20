<template>
  <div class="container py-3">
    <div class="d-flex justify-content-between">
      <button class="btn btn-warning" @click="gotoUpload">
        رفتن به صفحه آپلود
      </button>

      <button class="btn btn-danger" @click="logout">
        خروج از حساب کاربری
      </button>
    </div>
  </div>
</template>

<script>
export default {
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
    gotoUpload () {
      this.$router.push('upload')
    },
  }
}
</script>

<style lang="scss" scoped>

</style>

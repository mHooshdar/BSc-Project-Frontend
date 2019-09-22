<template>
  <div class="body position-relative">
    <nuxt />
  </div>
</template>

<style lang="scss">
@import "~vars";
html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  box-sizing: border-box;
}

.body {
  min-height: 100vh;
  background: rgba($green-bg, 0.3);
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}

</style>

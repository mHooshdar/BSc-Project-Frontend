<template>
  <div class="container py-3">
    <div class="d-flex justify-content-between">
      <button class="btn btn-warning" @click="gotoImages">
        مشاهده تمام عکس‌ها
      </button>

      <label class="custom-file-upload m-0">
        <input ref="input" type="file" @input="inputImage">
        <span class="btn btn-info m-0">
          اپلود عکس
        </span>
      </label>

      <button class="btn btn-danger" @click="logout">
        خروج از حساب کاربری
      </button>
    </div>
    <div v-if="error" class="my-3 text-danger text-center font-weight-bold error">
      {{ error }}
    </div>
    <template v-else-if="file">
      <span class="title text-right font-weight-bold mt-4 d-block text-success">عکس آپلود شده: </span>
      <img class="my-3 preview-image" :src="file " alt="">
      <clip-loader v-if="loading" class="my-3" margin="auto" size="100px" />
      <div v-else-if="!imageResponse" class="buttons-container d-flex">
        <button class="btn btn-success" @click="uploadImage">
          ارسال عکس
        </button>
        <button class="btn btn-danger" @click="deleteImage">
          حذف عکس
        </button>
      </div>
      <div v-else-if="imageResponse">
        <span class="title text-right font-weight-bold mt-4 d-block text-success">عکس نهایی: </span>
        <img class="my-3 preview-result-image" :src="imageResponse.result" alt="">
        <div class="description-text text-right my-3">
          <span class="text-info font-weight-bold">برچسب پیشبینی شده به زبان انگلیسی:</span>
          <span>{{ imageResponse.description }}</span>
        </div>
        <div class="description-text text-right my-3">
          <span class="text-info font-weight-bold">برچسب پیشبینی شده به زبان فارسی:</span>
          <span>{{ imageResponse.description_fa }}</span>
        </div>
        <table class="table table-bordered text-center bg-white">
          <tr>
            <th class="text-center">
              احتمال
            </th>
            <th class="text-center">
              برچسب انگلیسی
            </th>
            <th class="text-center">
              برچسب فارسی
            </th>
            <th class="text-center">
              Y Min
            </th>
            <th class="text-center">
              Y Max
            </th>
            <th class="text-center">
              X Min
            </th>
            <th class="text-center">
              X Max
            </th>
          </tr>

          <tr v-for="(category, index) in imageResponse.categories" :key="`category ${index}`">
            <td>{{ category.score }}</td>
            <td>{{ category.class_name }}</td>
            <td>{{ category.class_name_fa }}</td>
            <td>{{ category.ymin }}</td>
            <td>{{ category.ymax }}</td>
            <td>{{ category.xmin }}</td>
            <td>{{ category.xmax }}</td>
          </tr>
        </table>
      </div>
    </template>
  </div>
</template>

<script>
import ClipLoader from 'vue-spinner/src/ClipLoader.vue'

export default {
  components: {
    ClipLoader,
  },
  data () {
    return {
      file: null,
      loading: false,
      error: '',
      fileData: null,
      imageResponse: null,
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
    inputImage (input) {
      console.log(input, 'sssssss')
      this.imageResponse = null;
      const reader = new FileReader();
      this.fileData = input.target.files[0];
      reader.onload = e => {
        this.file = e.target.result;
      }
      reader.readAsDataURL(input.target.files[0]);
    },
    deleteImage () {
      this.file = null;
      this.fileData = null;
      this.imageResponse = null;
      this.$refs.input.value = null;
    },
    uploadImage () {
      const userId = localStorage.getItem('user_id');
      const token = localStorage.getItem('token');
      const formData = new FormData();
      formData.append('file', this.fileData);
      formData.append('user', userId);
      this.loading = true;
      this.error = '';
      this.imageResponse = '';
      this.$axios.$put('api/files/', formData, {
        headers: {
          'Authorization': 'Token ' + token,
        }
      }).then(response => {
        this.imageResponse = response;
        this.loading = false;
      }).catch(e => {
        this.loading = false;
        this.error = 'مشکل سرور';
      })
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

  .title {
    font-size: 20px;
  }

  .description-text {
    font-size: 18px;
  }

  .loading {
    position: absolute !important;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .error {
    font-size: 30px;
  }

  .preview-image {
    width: 100%;
    height: 400px;
    object-fit: contain;
  }

  .preview-result-image {
    width: 100%;
    height: 600px;
    object-fit: contain;
  }

  .buttons-container {
    justify-content: space-evenly;
  }

</style>

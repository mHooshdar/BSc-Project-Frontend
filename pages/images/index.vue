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

    <div v-if="error" class="font-weight-bold my-5 text-center not-found text-danger">
      {{ error }}
    </div>
    <div v-else-if="images.length !== 0">
      <div v-for="image in images" :key="`image ${image.id}`" class="image-box d-flex my-3">
        <div class="d-flex px-3 right-container">
          <img class="image align-self-center" :src="image.result" :alt="image.description">
        </div>
        <div class="d-flex flex-column px-3 w-100 align-items-start left-container">
          <div class="d-flex w-100">
            <div class="d-flex flex-column text-right">
              <span class="my-2">
                <span class="font-weight-bold">بر چسب انگلیسی: </span>
                {{ image.description }}
              </span>
              <span class="mb-2">
                <span class="font-weight-bold">بر چسب فارسی: </span>
                {{ image.description_fa }}
              </span>
            </div>
            <button class="btn btn-danger align-self-center my-2 mr-auto" :disabled="loading" @click="showDelete(image)">
              حذف عکس
            </button>
          </div>

          <span class="mb-2 font-weight-bold">
            برجسب‌های یافت شده:
          </span>

          <table class="table table-bordered text-center bg-white categories-container">
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

            <tr v-for="(category, index) in image.categories" :key="`category ${index}`">
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
      </div>
    </div>
    <div v-else class="font-weight-bold my-5 text-center not-found">
      عکسی یافت نشد.
    </div>
    <modal class="xs" header-class="font-weight-bold" :show.sync="deleteModal" @close="hideDelete">
      <span slot="title">
        حذف عکس
      </span>
      <span class="title font-weight-bold text-right d-block mx-2">
        آیا از حذف عکس مطمئن هستید؟
      </span>
      <div class="d-flex justify-content-around">
        <button class="my-3 my-button btn btn-success" @click="deleteImage(selectedImage.id)">
          بله
        </button>
        <button class="my-3 my-button btn btn-danger" @click="hideDelete">
          خیر
        </button>
      </div>
    </modal>
  </div>
</template>

<script>

export default {
  components: {
    Modal,
  },
  data () {
    return {
      images: [],
      deleteModal: false,
      loading: false,
      selectedImage: null,
      error: '',
    }
  },
  mounted () {
    if (process.browser && (!localStorage.getItem('token') || !localStorage.getItem('user_id'))) {
      this.$router.push('/');
    } else {
      const userId = localStorage.getItem('user_id');
      const token = localStorage.getItem('token');
      this.$axios.$get('api/files/user/' + userId, {
        headers: {
          'Authorization': 'Token ' + token,
        }
      }).then(response => {
        this.images = response;
        this.loading = false;
      }).catch(e => {
        this.loading = false;
        this.error = 'مشکل سرور';
      })
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
    showDelete (image) {
      this.deleteModal = true;
      this.selectedImage = image;
    },
    hideDelete () {
      this.deleteModal = false;
      this.selectedImage = null;
    },
    deleteImage (imageId) {
      const token = localStorage.getItem('token');
      this.$axios.$delete('api/files/' + imageId, {
        headers: {
          'Authorization': 'Token ' + token,
        }
      }).then(response => {
        this.images = this.images.filter(image => image.id !== response.file_id)
        this.loading = false;
        this.hideDelete();
      }).catch(e => {
        this.loading = false;
        this.error = 'مشکل سرور';
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "~vars";

.image-box {
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);
  background: white;

  .right-container {
    flex: 4;
    .image {
      object-fit: cover;
      width: 100%;
    }
  }

  .left-container {
    flex: 5;
    .categories-container {
      width: 100%;
    }
  }
}

.my-button {
  width: 100px;
}

.title {
  font-size: 15px;
}

.not-found {
  font-size: 20px;
}
</style>

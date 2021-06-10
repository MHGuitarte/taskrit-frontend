<template>
  <div class="container-flex landing--wrapper">
    <div v-if="isLogin" class="row">
      <AssetsImage
        src="landing-bg.jpg"
        alt="Landing Image"
        class="col-7 landing--image img-fluid"
      />
      <AccessForm class="col-5 m-0 p-0 landing--form" />
    </div>
    <div v-else class="row">
      <AccessForm class="col-5 m-0 p-0" />
      <AssetsImage
        src="landing-bg.jpg"
        alt="Landing Image"
        class="col-7 landing--image img-fluid landing--form"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

import AccessForm from '../components/Home/AccessForm.vue';
import AssetsImage from '../components/Base/AssetsImage.vue';

export default {
  name: 'Home',
  components: {
    AccessForm,
    AssetsImage,
  },
  computed: {
    ...mapGetters('access', ['isLogin']),
    ...mapGetters('user', ['user']),
  },
  mounted: async function() {
    if (this.$store.dispatch('user/userExists')) {
      this.$router.push({
        name: 'Boards',
        params: { id: this.user.username },
      });
    } else {
      this.$store.dispatch('user/removeUser');
    }

    if (this.$route.params?.removeUser) {
      this.$store.dispatch('user/removeUser');
    }
  },
};
</script>

<style lang="scss" scoped>
.landing {
  &--wrapper > * {
    background-color: $background;
  }

  &--image {
    object-fit: cover;
    min-height: 100vh;
  }
}
</style>

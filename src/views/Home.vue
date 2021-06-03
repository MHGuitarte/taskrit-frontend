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

    <div class="modal" id="landing--modal">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Modal title</h5>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { Modal } from 'bootstrap';

import AccessForm from '../components/Home/AccessForm.vue';
import AssetsImage from '../components/Base/AssetsImage.vue';

export default {
  name: 'Home',
  components: {
    AccessForm,
    AssetsImage,
  },
  computed: {
    ...mapGetters('access', ['isLogin', 'showAccessModal']),
  },
  mounted: function() {
    this.$store.watch(
      (state) => state.access.showAccessModal,
      () => {
        const modal = new Modal(document.getElementById('landing--modal'));
        if (this.showAccessModal) {
          modal.show();
        } else {
          modal.hide();
        }
      }
    );
  },
};
</script>

<style lang="scss" scoped>
.landing {
  &--image {
    object-fit: cover;
    min-height: 100vh;
  }
}
</style>

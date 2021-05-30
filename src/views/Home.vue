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
      <div class="oa"></div>
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
import { mapGetters } from "vuex";

import AccessForm from "../components/Home/AccessForm.vue";
import AssetsImage from "../components/Base/AssetsImage.vue";

export default {
  name: "Home",
  components: {
    AccessForm,
    AssetsImage,
  },
  computed: {
    ...mapGetters("landing", ["isLogin"]),
  },
};
</script>

<style lang="scss" scoped>
.landing {
  &--image {
    object-fit: cover;
    min-height: 100vh;
  }

  .bounce-to-left {
    animation: rtl 3s;

    @keyframes rtl {
      0% {
        position: absolute;
        right: 0;
      }

      25% {
        right: 43%;
      }

      99% {
        left: 0;
      }

      100% {
        position: relative;
      }
    }
  }

  .bounce-to-right {
    animation: ltr 3s;

    @keyframes ltr {
      0% {
        position: absolute;
        left: 0;
      }

      25% {
        left: 43%;
      }

      99% {
        right: 0;
      }

      100% {
        position: relative;
      }
    }
  }
}
</style>

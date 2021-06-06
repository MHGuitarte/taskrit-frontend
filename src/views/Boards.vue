<template>
  <div class="container-flex boards--wrapper">
    <LateralMenu :user="getUser" />
    <h1 class="h1 row col-9 offset-1 pt-3 boards--user-title">
      Bienvenido, {{ getUser.username }}
    </h1>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import LateralMenu from "@/components/Base/LateralMenu.vue";

export default {
  components: { LateralMenu },
  computed: {
    ...mapGetters("access", ["getUser"]),
  },
};
</script>

<style lang="scss">
.boards {
  &--wrapper {
    min-height: 100vh;
    background-image: url("../assets/board-bg.png");
    background-repeat: repeat;
  }

  &--user-title {
    color: $primary;
    font-family: $heading-bold;
  }
}
</style>

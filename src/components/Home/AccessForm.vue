<template>
  <div class="container access--container">
    <div class="row">
      <AssetsImage
        src="logo.png"
        alt="taskrIt Logo"
        class="mx-auto mt-4 pt-4 access--image"
      />
      <h1 class="text-center access--title">
        {{ isLogin ? "Bienvenido" : "taskrIt" }}
      </h1>
    </div>
    <form></form>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import AssetsImage from "../Base/AssetsImage.vue";

export default {
  ame: "AccessForm",
  components: { AssetsImage },
  computed: {
    ...mapGetters("landing", ["isLogin"]),
  },
  methods: {
    ...mapActions("landing", ["changeLoginPage"]),
    login: function () {
      console.log("login");
    },
    register: function () {
      console.log("register");
    },
  },
};
</script>

<style lang="scss">
.access {
  &--image {
    width: 30%;
  }

  &--title {
    font-family: $heading-bold;
    font-size: $access-title;
    color: $primary;
    margin: auto;
  }
}
</style>
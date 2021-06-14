<template>
  <div id="app" class="container-flex">
    <router-view />
  </div>
</template>

<script>
export default {
  methods: {
    toggleModal: function () {
      this.$store.dispatch("access/toggleAccessModal");
    },
  },
};
</script>

<style lang="scss" global>
#app {
  overflow-x: hidden;
  display: contents;
}

.app-background {
  background: url("./assets/board-bg.png") repeat;
}

.regular-background {
  background-color: $background;
}
</style>

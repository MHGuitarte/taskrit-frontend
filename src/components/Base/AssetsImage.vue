<template>
  <img
    :src="require(`@/assets/${src}`)"
    :alt="alt"
    :loading="isLazy ? 'lazy' : 'auto'"
    class="assets-image"
  />
</template>

<script>
export default {
  name: "AssetsImage",
  props: {
    src: {
      type: String,
      required: true,
    },
    alt: {
      type: String,
      default: "",
    },
    isLazy: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss" scoped>
.assets-image {
  margin: 0;
  padding: 0;
}
</style>
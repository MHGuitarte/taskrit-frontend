<template>
  <div class="row task--container"></div>
</template>

<script>
export default {
  props: {
    task: {
      type: Object,
      default: () => {},
    },
  },
};
</script>

<style lang="scss">
.task {
  &--container {
    &:hover {
      cursor: pointer;
    }
  }
}
</style>

<template>
  <div class="list--container">
    <div class="container-flex title-container">
      <div class="row p-4">
        <h2 class="col-9 list--title">Mis listas</h2>
        <font-awesome-icon
          icon="plus"
          class="col-3 text-right list--add-icon"
          @click.prevent="$emit('open-task-modal', list.id)"
        />
      </div>
    </div>
    <div class="container-flex">
      <Task />
    </div>
  </div>
</template>

<script>
import Task from './Task.vue';
export default {
  components: { Task },
  props: {
    tasks: {
      type: Array,
      default: () => [],
    },
  },
};
</script>

<style lang="scss">
.list {
  &--container {
    background-color: $background;
    border-radius: 10px;
    border: 3px solid $primary;
    box-shadow: 0 3px 6px $primary;
    overflow-y: auto;
    overflow-x: hidden;

    & .title-container {
      border: 3px solid $primary;
      border-top: 0px;
      border-right: 0px;
      border-left: 0px;
    }
  }

  &--title {
    font-size: $h2;
    color: $primary-light;
  }

  &--add-icon {
    color: $accent;
    font-size: $h1;
    min-width: 20%;
    width: 25% !important;
  }
}
</style>

<template>
  <div class="list--container">
    <input type="hidden" :name="`list-id--${id}`" />
    <div class="container-flex title-container">
      <div class="row p-4">
        <h3 class="col-9 list--title">{{ name }}</h3>
        <font-awesome-icon
          icon="plus"
          class="col-3 text-right list--add-icon"
          @click.prevent="createTask"
        />
      </div>
    </div>
    <div class="container-flex py-4 list--task-container">
      <Task v-for="task of tasks" :key="task.id" :task="task" :list="id" />
    </div>
  </div>
</template>

<script>
import Task from "./Task.vue";
export default {
  components: { Task },
  props: {
    id: {
      type: String,
      default: "",
    },
    name: {
      type: String,
      default: "",
    },
    tasks: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    createTask() {
      this.$store.dispatch("boards/setSelectedListId", { selectedListId: this.id });
      this.$store.dispatch("boards/setModalInfo", {
        modalTitle: "Crear tarea",
        modalTargetForm: "create-task-form",
      });
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
    height: 400px;
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
    font-size: $h3;
    color: $primary-light;
  }

  &--add-icon {
    color: $accent;
    font-size: $h2;
    min-width: 20%;
    width: 25% !important;

    &:hover {
      cursor: pointer;
    }
  }

  &--task-container {
    padding-left: 4rem;
    padding-right: 4rem;
  }
}
</style>

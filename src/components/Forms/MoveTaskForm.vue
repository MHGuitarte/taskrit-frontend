<template>
  <form id="move-task-form" class="px-5 pt-2" @submit.prevent="moveTask">
    <div class="my-3 px-5">
      <label for="task-move-input" class="create-board--label">
        Lista objetivo
      </label>
      <select
        name="task-move"
        id="task-move-input"
        class="form-select form-select-lg"
        aria-label="Lista objetivo"
        v-model="listId"
      >
        <option value="default" selected="true" disabled="disabled">
          Escoge una lista
        </option>
        <option
          v-for="list of listsWithoutActualList"
          :key="list.id"
          :value="list.id"
        >
          {{ list.name }}
        </option>
      </select>
    </div>
  </form>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  props: {
    user: {
      type: Object,
      default: () => {},
    },
    boardId: {
      type: String,
      default: "",
    },
  },
  data: function () {
    return {
      listId: "",
    };
  },
  computed: {
    ...mapGetters("boards", ["lists", "selectedListId", "selectedTaskId"]),
    listsWithoutActualList() {
      return this.lists.filter((list) => list.id !== this.selectedListId);
    },
  },
  methods: {
    moveTask: async function () {
      const response = await this.$store.dispatch("boards/moveTask", {
        user: this.user,
        taskId: this.selectedTaskId,
        listId: this.listId,
        boardId: this.boardId,
      });

      if (response) {
        this.clearForm();
        this.$emit("ok");
      } else {
        this.$emit("ko");
      }
    },
    clearForm: function () {
      this.listId = "default";
    },
  },
};
</script>
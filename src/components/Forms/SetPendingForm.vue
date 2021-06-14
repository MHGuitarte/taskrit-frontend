<template>
  <form id="set-pending-form" class="px-5 pt-2" @submit.prevent="setPending">
    <div class="my-3">
      <label class="create-board--label" for="set-pending-input">
        Tiempo Restante (Estimación Inicial:
        {{ task.estimate }}h)
      </label>
      <input
        type="number"
        step="0.5"
        min="0.5"
        max="100"
        name="task-pending"
        id="set-pending-input"
        class="form-control form-control-lg"
        placeholder="¿Cuanto te queda?"
        aria-label="Tiempo restante"
        v-model="pending"
      />
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
    task: {
      type: Object,
      default: () => {},
    },
  },
  data: function () {
    return {
      pending: 0,
    };
  },
  computed: {
    ...mapGetters("boards", [
      "selectedListId",
      "selectedTaskId",
    ]),
  },
  mounted: function () {
    this.pending = this.task.pending;
  },
  methods: {
    setPending: async function () {
      const response = await this.$store.dispatch("boards/setTaskPending", {
        user: this.user,
        taskId: this.selectedTaskId,
        pending: this.pending,
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
      this.pending = this.task.pending;
    },
  },
};
</script>
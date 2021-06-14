<template>
  <form id="create-task-form" class="px-5 pt-2" @submit.prevent="createTask">
    <div class="my-3">
      <label for="task-title-input" class="create-board--label">
        Nombre de la tarea
      </label>
      <input
        type="text"
        name="task-title"
        id="task-title-input"
        class="form-control form-control-lg"
        placeholder="¿Qué necesitas hacer?"
        aria-label="Título de la tarea"
        v-model="title"
      />
    </div>

    <div class="my-3">
      <label class="create-board--label" for="task-description-input">
        (Opcional) Descripción
      </label>
      <textarea
        type="text"
        name="task-description"
        id="task-description-input"
        class="form-control form-control-lg"
        placeholder="Explica los detalles de tu plan"
        aria-label="Descripción de la tarea"
        v-model="description"
      />
    </div>

    <div class="my-3">
      <div class="col">
        <label class="create-board--label" for="task-effort-input">
          Puntos de esfuerzo
        </label>
        <input
          type="number"
          step="1"
          min="1"
          max="100"
          name="task-effort"
          id="task-effort-input"
          class="form-control form-control-lg"
          placeholder="¿Es difícil tu tarea?"
          aria-label="Puntos de esfuerzo"
          v-model="effort"
        />
      </div>
      <div class="col">
        <label class="create-board--label" for="task-estimate-input">
          Estimación (en horas)
        </label>
        <input
          type="number"
          step="0.5"
          min="0.5"
          max="100"
          name="task-estimate"
          id="task-estimate-input"
          class="form-control form-control-lg"
          placeholder="¿Cuanto tiempo tardarás?"
          aria-label="Estimación"
          v-model="estimate"
        />
      </div>
    </div>
  </form>
</template>

<script>
export default {
  props: {
    user: {
      type: Object,
      default: () => {},
    },
    listId: {
      type: String,
      default: "",
    },
    boardId: {
      type: String,
      default: "",
    },
  },
  data: function () {
    return {
      title: "",
      description: "",
      effort: 1,
      estimate: 0.5,
    };
  },
  methods: {
    createTask: async function () {
      const response = await this.$store.dispatch("boards/createTask", {
        user: this.user,
        title: this.title,
        description: this.description,
        effort: this.effort,
        estimate: this.estimate,
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
      this.name = "";
      this.description = "";
      this.effort = 1;
      this.estimate = 0.5;
    },
  },
};
</script>
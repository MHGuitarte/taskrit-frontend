<template>
  <div id="task-details" class="px-5 pt-2">
    <div class="my-3">
      <label for="task-title" class="create-board--label">
        Título de la tarea
      </label>
      <h5 id="task-title">{{ task.title }}</h5>
    </div>

    <div class="my-3">
      <label class="create-board--label" for="task-description">
        Descripción
      </label>
      <p id="task-description">{{ task.description }}</p>
    </div>

    <div class="my-3">
      <div class="col">
        <label class="create-board--label" for="task-effort">
          Puntos de esfuerzo
        </label>
        <h5 id="task-effort">{{ task.effort }}</h5>
      </div>
      <div class="col">
        <label class="create-board--label" for="task-estimate">
          Estimación (en horas)
        </label>
        <h5 id="task-estimate">{{ task.estimate }}</h5>
      </div>
      <div class="col">
        <label for="task-pending" class="create-board--label">
          Tiempo Restante
        </label>
        <h5 id="task-pending">{{ task.pending }}</h5>
      </div>
    </div>
  </div>
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
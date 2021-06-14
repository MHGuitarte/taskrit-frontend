<template>
  <div
    id="taskrit-toast"
    class="toast align-items-center text-white bottom-0 end-0 position-stick"
    :class="status"
    role="alert"
    aria-live="assertive"
    aria-atomic="true"
  >
    <div class="d-flex">
      <div class="toast-body">
        {{ message }}
      </div>
      <button
        type="button"
        class="btn-close btn-close-white me-2 m-auto"
        data-bs-dismiss="toast"
        aria-label="Cerrar toast"
      ></button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    status: {
      type: String,
      default: "bg-success",
    },
    message: {
      type: String,
      default: "",
    },
  },
};
</script>

<style>
</style>
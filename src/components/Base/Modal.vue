<template>
  <div
    class="modal"
    id="tsk-modal"
    tabindex="-1"
    aria-hidden="true"
    aria-labelledby="#modal--title"
    data-bs-backdrop="static"
  >
    <div class="modal-dialog modal-lg">
      <div class="modal-content" id="modal--container">
        <div class="modal-header">
          <h5 class="modal-title" id="modal--title">{{ modalTitle }}</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <slot></slot>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-danger"
            data-bs-dismiss="modal"
            @click="$emit('ko')"
          >
            {{ dismissText }}
          </button>
          <button
            v-if="targetForm"
            :form="targetForm"
            type="submit"
            class="btn btn-success"
          >
            {{ confirmText }}
          </button>
          <button
            v-else
            type="submit"
            class="btn btn-success"
            @click="$emit('ok')"
          >
            {{ confirmText }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    modalTitle: {
      type: String,
      default: "",
    },
    confirmText: {
      type: String,
      default: "Confirmar",
    },
    dismissText: {
      type: String,
      default: "Cancelar",
    },
    targetForm: {
      type: String,
      required: false,
    },
  },
};
</script>

<style lang="scss">
#modal {
  &--container {
    background-color: $background;
  }

  &--title {
    font-size: $h2;
    color: $primary;
  }
}
</style>

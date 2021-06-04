<template>
  <div id="app" class="container-flex">
    <router-view />

    <div class="modal" id="landing--modal" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Modal title</h5>
            <button
              type="button"
              class="btn-close"
              @click="toggleModal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <p>Modal body text goes here.</p>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              @click="toggleModal"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    toggleModal: function() {
      this.$store.dispatch('access/toggleAccessModal');
    },
  },
};
</script>

<style lang="scss" global>
#app {
  overflow-x: hidden;
}
</style>

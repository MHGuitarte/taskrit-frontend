<template>
  <div class="container-flex boards--wrapper">
    <LateralMenu :user="getUser" />
    <h1 class="row col-9 offset-1 pt-3 boards--user-title">
      Bienvenido, {{ getUser.username }}
    </h1>

    <div class="container">
      <div class="row mt-5">
        <div class="col-8 offset-2 board-list--wrapper">
          <div class="container-flex">
            <div class="row my-2">
              <h2 class="col-8 board-list--title">Mis listas</h2>
              <font-awesome-icon
                icon="plus"
                class="col-4 text-right board-list--add-icon"
                data-bs-toggle="modal"
                data-bs-target="#tsk-modal"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <Modal modalTitle="Crear nuevo tablero" targetForm="create-board-id">
      <form
        id="create-board-id"
        @submit.prevent="createBoard"
        class="px-5 pt-5"
      >
        <input
          id="board-name-input"
          class="form-control form-control-lg"
          type="text"
          placeholder="¿Qué nombre le pondrás a tu nuevo tablero?"
          aria-label="Nombre del tablero"
          v-model="boardName"
        />
      </form>
    </Modal>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Cookies from 'js-cookie';
import { Modal as BootstrapModal } from 'bootstrap';
import LateralMenu from '@/components/Base/LateralMenu.vue';
import Modal from '@/components/Base/Modal.vue';

export default {
  components: { LateralMenu, Modal },
  data: function() {
    return {
      boardName: '',
    };
  },
  computed: {
    ...mapGetters('access', ['getUser']),
  },
  mounted: function() {
    if (this.getUser.username === '') {
      const user =
        Cookies.getJSON('user') || JSON.parse(sessionStorage.getItem('user'));

      this.$store.dispatch('access/setUser', user);
    }
  },
  methods: {
    createBoard: function() {
      console.log('OLEEE');
      const tskModal = new BootstrapModal(document.getElementById('tsk-modal'));
      // TODO por algún motivo no se esconde xd
      tskModal.hide();
    },
  },
};
</script>

<style lang="scss">
.boards {
  &--wrapper {
    min-height: 100vh;
    background-image: url('../assets/board-bg.png');
    background-repeat: repeat;
  }

  &--user-title {
    color: $primary;
    font-family: $heading-bold;
  }
}

.board-list {
  &--wrapper {
    background-color: $background;
    border-radius: 10px;
  }

  &--title {
    color: $primary;
    padding-left: 3rem;
  }

  &--add-icon {
    min-width: 33.3333333333%;
    font-size: $h1;
    color: $accent;

    &:hover {
      cursor: pointer;
    }
  }
}
</style>

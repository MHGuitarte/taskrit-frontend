<template>
  <div class="container-flex boards--wrapper">
    <LateralMenu :user="user || {}" />
    <h1 class="row col-9 offset-1 pt-3 boards--user-title">
      Bienvenido, {{ user.username || '' }}
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
                @click.prevent="toggleModal"
              />
            </div>
          </div>
          <div class="container">
            <BoardListItem
              v-for="board in boards"
              :key="board.id"
              :board="board"
            />
          </div>
        </div>
      </div>
    </div>
    <Modal modalTitle="Crear nuevo tablero" targetForm="create-board-id">
      <form
        id="create-board-id"
        @submit.prevent="createBoard"
        class="px-5 pt-2"
      >
        <div class="my-3">
          <label class="create-board--label" for="board-name-input"
            >Nombre del tablero</label
          >
          <input
            type="text"
            name="board-name"
            id="board-name-input"
            class="form-control form-control-lg"
            placeholder="¿Qué nombre le pondrás a tu nuevo tablero?"
            aria-label="Nombre del tablero"
            v-model="boardName"
          />
        </div>
        <div class="my-3">
          <label class="create-board--label" for="board-description-input"
            >(Opcional) Descripción</label
          >
          <textarea
            type="text"
            name="board-description"
            id="board-description-input"
            class="form-control form-control-lg"
            placeholder="¿Para qué usarás este tablero?"
            aria-label="Descripción del tablero"
            v-model="boardDescription"
          />
        </div>
      </form>
    </Modal>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { Modal as BSModal } from 'bootstrap';
import LateralMenu from '@/components/Base/LateralMenu.vue';
import BoardListItem from '@/components/Boards/BoardListItem.vue';
import Modal from '@/components/Base/Modal.vue';

export default {
  components: { LateralMenu, Modal, BoardListItem },
  data: function() {
    return {
      boardName: '',
      boardDescription: '',
      modal: {},
    };
  },
  computed: {
    ...mapGetters('boards', ['boards', 'selectedBoard']),
    ...mapGetters('user', ['user']),
  },
  mounted: async function() {
    this.$store.dispatch('setAppBackground');

    await this.$store.dispatch('user/setUserState');
    await this.$store.dispatch('boards/getBoards', { user: this.user });

    this.modal = new BSModal(document.getElementById('tsk-modal'), {});
  },
  methods: {
    toggleModal: function() {
      this.modal.toggle();
    },
    createBoard: async function() {
      const isBoardCreated = await this.$store.dispatch('boards/createBoard', {
        user: this.user,
        name: this.boardName,
        description: this.boardDescription,
      });

      if (isBoardCreated) {
        await this.$store.dispatch('boards/getBoards', { user: this.user });
        this.clearForm();
        this.toggleModal();

        this.$router.push({
          name: 'Board',
          params: {
            id: this.selectedBoard.id,
          },
        });
      } else {
        this.createBoardError =
          'Error a la hora de crear un nuevo tablero. Por favor, inténtalo más tarde';
      }
    },
    clearForm() {
      this.boardName = '';
      this.boardDescription = '';
    },
    getBoardById(boardId) {
      return this.boards.filter(({ id }) => id === boardId);
    },
  },
};
</script>

<style lang="scss">
.boards {
  &--wrapper {
    min-height: 100vh;
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

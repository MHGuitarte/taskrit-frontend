<template>
  <div class="container-flex board--wrapper">
    <LateralMenu :user="user" />
    <h1 class="row col-9 offset-1 pt-3 boards--user-title">
      {{ selectedBoard.name || "" }}
    </h1>

    <div class="container mt-5">
      <div class="row">
        <div class="col-12 mt-5 pb-3 board--lists--container">
          <List
            v-for="list of selectedBoard.lists"
            :key="list.id"
            :id="list.id"
            :name="list.name"
            :tasks="list.tasks"
          />
        </div>
      </div>
    </div>
    <Modal
      :modalTitle="modalInfo.modalTitle"
      :targetForm="modalInfo.modalTargetForm"
    >
      <CreateListForm
        v-if="modalInfo.modalTargetForm.startsWith('create-list')"
        :user="user"
        :boardId="selectedBoard.id"
        @ok="showToast('ok')"
        @ko="showToast('ko')"
      />

      <CreateTaskForm
        v-else-if="modalInfo.modalTargetForm.startsWith('create-task')"
        :user="user"
        :boardId="selectedBoard.id"
        :listId="selectedListId"
        @ok="showToast('ok')"
        @ko="showToast('ko')"
      />

      <MoveTaskForm
        v-else-if="modalInfo.modalTargetForm.startsWith('move-task')"
        :user="user"
        :boardId="selectedBoard.id"
        @ok="showToast('ok')"
        @ko="showToast('ko')"
      />

      <SetPendingForm
        v-else-if="modalInfo.modalTargetForm.startsWith('set-pending')"
        :user="user"
        :boardId="selectedBoard.id"
        :task="getSelectedTaskInfo"
        @ok="showToast('ok')"
        @ko="showToast('ko')"
      />

      <TaskDetailsForm
        v-else-if="modalInfo.modalTitle.startsWith('Detalles')"
        :task="getSelectedTaskInfo"
      />
    </Modal>
    <Toast :status="toastStatus" :message="toastMessage" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { Modal as BSModal, Toast as BSToast } from "bootstrap";

import LateralMenu from "@/components/Base/LateralMenu.vue";
import List from "@/components/BoardDetails/List.vue";
import Modal from "@/components/Base/Modal.vue";
import Toast from "@/components/Base/Toast.vue";

import CreateListForm from "@/components/Forms/CreateListForm.vue";
import CreateTaskForm from "@/components/Forms/CreateTaskForm.vue";
import MoveTaskForm from "@/components/Forms/MoveTaskForm.vue";
import SetPendingForm from "@/components/Forms/SetPendingForm.vue";
import TaskDetailsForm from "@/components/Forms/TaskDetailsForm.vue";

export default {
  components: {
    LateralMenu,
    List,
    Modal,
    Toast,
    CreateListForm,
    CreateTaskForm,
    MoveTaskForm,
    SetPendingForm,
    TaskDetailsForm,
  },
  data: function () {
    return {
      toastStatus: "bg-success",
      toastMessage: "Mensaje del toast",
      modal: {},
      toast: {},
    };
  },
  computed: {
    ...mapGetters("user", ["user"]),
    ...mapGetters("boards", [
      "selectedBoard",
      "modalInfo",
      "selectedListId",
      "getSelectedTaskInfo",
    ]),
  },
  mounted: async function () {
    this.$store.dispatch("boards/clearModalInfo");
    this.$store.dispatch("setAppBackground");

    if (!this.user.id) {
      await this.$store.dispatch("user/setUserState");
    }

    if (!this.selectedBoard.id) {
      if (this.$route.params.id && this.user.id) {
        this.$store.dispatch("boards/getBoardById", {
          user: this.user,
          boardId: this.$route.params.id,
        });
      } else {
        this.$router.push({
          name: "Boards",
          params: {
            id: this.user.username,
          },
        });
      }
    }

    this.modal = new BSModal(document.getElementById("tsk-modal"), {});
    this.toast = new BSToast(document.getElementById("taskrit-toast"), {});

    this.$store.watch(
      (state, getters) => getters["boards/modalInfo"],
      () => {
        if (this.modalInfo.modalTitle) {
          this.toggleModal();
        }
      }
    );
  },
  methods: {
    toggleModal: function () {
      this.modal.toggle();
    },
    showToast: function (type) {
      if (type === "ok") {
        this.toastStatus = "bg-success";
        this.toastMessage = "Acción realizada correctamente";
        this.toggleModal();
      } else if (type === "ko") {
        this.toastStatus = "bg-danger";
        this.toastMessage = "Error durante confirmación. Inténtelo más tarde";
      } else {
        this.toastStatus = "bg-danger";
        this.toastMessage = "Error desconocido. Inténtelo más tarde";
      }

      this.toast.show();

      /* implementation of toast based on action
      if(modalInfo.modalTargetForm.startsWith('create-list')) {
        this.toastMessage
      }*/
    },
  },
};
</script>

<style lang="scss">
.board {
  &--wrapper {
    min-height: calc(100% + 100vh);
  }

  &--lists {
    &--container {
      display: grid;
      grid-template-columns: 48% 48%;
      grid-auto-rows: minmax(400px, 100%);
      row-gap: 10%;
      column-gap: 2%;
    }
  }
}

.draggable {
  margin: 10px;
}

.draggable:hover {
  cursor: grab;
}

.dragging {
  cursor: grabbing;
}

.mirror-index {
  z-index: 1;
}
</style>

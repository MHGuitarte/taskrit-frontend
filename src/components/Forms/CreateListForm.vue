<template>
  <form id="create-list-form" class="px-5 pt-2" @submit.prevent="createList">
    <div class="my-3">
      <label for="list-name-input" class="create-board--label">
        Nombre de la lista
      </label>
      <input
        type="text"
        name="list-name"
        id="list-name-input"
        class="form-control form-control-lg"
        placeholder="Escribe el nombre de tu lista"
        aria-label="Nombre de la lista"
        v-model="name"
      />
    </div>
    <div class="my-3">
      <label class="create-board--label" for="list-description-input">
        (Opcional) Descripción
      </label>
      <textarea
        type="text"
        name="list-description"
        id="list-description-input"
        class="form-control form-control-lg"
        placeholder="¿Qué vas a poner en esta lista?"
        aria-label="Descripción de la lista"
        v-model="description"
      />
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
    boardId: {
      type: String,
      default: "",
    },
  },
  data: function () {
    return {
      name: "",
      description: "",
    };
  },
  methods: {
    createList: async function () {
      const response = await this.$store.dispatch("boards/createList", {
        user: this.user,
        name: this.name,
        description: this.description,
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
    },
  },
};
</script>
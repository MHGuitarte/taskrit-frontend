<template>
  <div class="board-list--item" @click="goToBoard">
    <h3>{{ board.name }}</h3>
    <h6>{{ board.description }}</h6>
  </div>
</template>

<script>
export default {
  props: {
    board: {
      type: Object,
      default: () => {},
    },
  },
  methods: {
    goToBoard() {
      this.$store.dispatch('boards/setSelectedBoard', {
        selectedBoard: this.board,
      });

      this.$router.push({
        name: 'Board',
        params: { id: this.board.id },
      });
    },
  },
};
</script>

<style lang="scss">
.board-list {
  &--item {
    margin: 0.5rem;
    border: 2px solid $secondary;
    &:hover {
      cursor: pointer;
    }
  }
}
</style>

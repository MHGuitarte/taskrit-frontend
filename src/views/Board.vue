<template>
  <div class="container-flex board--wrapper">
    <LateralMenu :user="user" />
    <h1 class="row col-9 offset-1 pt-3 boards--user-title">
      {{ board.name || '' }}
    </h1>

    <div class="container board--lists--container">
      <div>
        <h3>ejemplo 1</h3>
      </div>
      <div>
        <h3>ejemplo 2</h3>
      </div>
      <div>
        <h3>ejemplo 3</h3>
      </div>
      <div>
        <h3>ejemplo 4</h3>
      </div>
    </div>
  </div>
</template>

<script>
import LateralMenu from '@/components/Base/LateralMenu.vue';
import { mapGetters } from 'vuex';

export default {
  components: {
    LateralMenu,
  },
  computed: {
    ...mapGetters('user', ['user']),
    ...mapGetters('boards', ['selectedBoard']),
  },
  mounted: function() {
    //TODO: get board by Id board
    if (!this.selectedBoard.id) {
      this.$store.dispatch('boards/setSelectedBoard', {
        selectedBoard: this.board,
      });
    }
  },
};
</script>

<style lang="scss">
.board {
  &--wrapper {
    min-height: 100vh;
    background-image: url('../assets/board-bg.png');
    background-repeat: repeat;
  }

  &--lists {
    &--container {
      display: grid;
      grid-template-columns: repeat(50% 50%);
    }
  }
}
</style>

<template>
  <div class="container-flex board--wrapper">
    <LateralMenu :user="user" />
    <h1 class="row col-9 offset-1 pt-3 boards--user-title">
      {{ selectedBoard.name || '' }}
    </h1>

    <div class="container mt-5">
      <div class="row">
        <div class="col-12 mt-5 pb-3 board--lists--container">
          <List />
          <div class="list--container p-1">
            <h2>Lista 2</h2>
          </div>
          <div class="list--container p-1">
            <h2>Lista 3</h2>
          </div>
          <div class="list--container p-1">
            <h2>Lista 4</h2>
          </div>
          <div class="list--container p-1">
            <h2>Lista 4</h2>
          </div>
          <div class="list--container p-1">
            <h2 class="list--title">Lista 5</h2>
          </div>          <div class="list--container p-1">
            <h2 class="list--title">Lista 5</h2>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

import LateralMenu from '@/components/Base/LateralMenu.vue';
import List from '@/components/BoardDetails/List.vue';

export default {
  components: {
    LateralMenu,
    List,
  },
  computed: {
    ...mapGetters('user', ['user']),
    ...mapGetters('boards', ['selectedBoard']),
  },
  mounted: async function() {
    this.$store.dispatch('setAppBackground');

    if (!this.user.id) {
      await this.$store.dispatch('user/setUserState');
    }

    if (!this.selectedBoard.id) {
      if (this.$route.params.id && this.user.id) {
        this.$store.dispatch('boards/getBoardById', {
          user: this.user,
          boardId: this.$route.params.id,
        });
      } else {
        this.$router.push({
          name: 'Boards',
          params: {
            id: this.user.username,
          },
        });
      }
    }
  },
};
</script>

<style lang="scss">
.board {
  &--wrapper {
    min-height: 100vh;
    max-height: 100%;
  }

  &--lists {
    &--container {
      display: grid;
      grid-template-columns: 48% 48%;
      grid-auto-rows: minmax(100%, 100px);
      row-gap: 10%;
      column-gap: 2%;
    }
  }
}
</style>

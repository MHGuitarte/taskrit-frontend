<template>
  <div class="lateral-menu--wrapper">
    <div class="lateral-menu--body">
      <img v-if="user.avatar" :src="user.avatar" alt="profile picture" />
      <font-awesome-icon
        v-else
        icon="user"
        class="lateral-menu--icon lateral-menu--icon--user"
      />
      <font-awesome-icon
        v-if="$route.name === 'Board'"
        icon="plus"
        class="lateral-menu--icon lateral-menu--icon--plus"
        @click="$emit('createList')"
      />
      <div class="d-flex flex-column justify-content-evenly align-items-center">
        <font-awesome-icon
          v-if="$route.name === 'Board'"
          icon="home"
          class="lateral-menu--icon lateral-menu--icon--home"
          @click="goToBoards"
        />
        <font-awesome-icon
          icon="sign-out-alt"
          class="lateral-menu--icon lateral-menu--icon--exit"
          @click="logout"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    user: {
      type: Object,
      default: () => {},
    },
  },
  methods: {
    async logout() {
      await this.$store.dispatch('access/logout');
      this.$router.push({ name: 'Home' });
    },

    async goToBoards() {
      await this.$store.dispatch('boards/clearSelectedBoard');
      this.$router.push({ name: 'Boards', params: { id: this.user.username } });
    },
  },
};
</script>

<style lang="scss">
.lateral-menu {
  &--wrapper {
    width: 4%;
    position: fixed;
    top: 0;
    left: 0;
    visibility: visible;
    bottom: 0;
    z-index: 10;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    background-color: $secondary;
    background-clip: padding-box;
    outline: 0;
  }

  &--body {
    flex-grow: 1;
    padding: 1rem 0.3rem;
    overflow-y: hidden;
    overflow-x: hidden;
    align-items: center;
    justify-content: space-between;
    display: flex;
    flex-direction: column;
  }

  &--icon {
    font-size: $h1;
    margin: 0.5rem 0;

    &:hover {
      cursor: pointer;
    }

    &--user {
      color: $primary-light;
    }

    &--plus {
      color: $accent;
    }

    &--home {
      color: $primary-light;
    }

    &--config {
      color: $primary-light;
    }

    &--exit {
      color: $accent;
    }
  }
}
</style>

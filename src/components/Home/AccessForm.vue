<template>
  <div class="container access--container">
    <div
      class="row"
      :class="isLogin ? 'access--title-column' : ' access--title-row'"
    >
      <AssetsImage
        src="logo.png"
        alt="taskrIt Logo"
        class="mx-auto access--image"
        :class="{ 'mt-4 pt-4': isLogin }"
      />
      <h1 class="access--title" :class="{ 'text-center': isLogin }">
        {{ isLogin ? 'Bienvenido' : 'taskrIt' }}
      </h1>
    </div>
    <form class="px-5 pt-5">
      <div class="my-3">
        <label for="user-input" class="access--label">Nombre de Usuario</label>
        <input
          id="user-input"
          class="form-control form-control-lg"
          type="text"
          placeholder="Escribe tu usuario..."
          aria-label="Nombre de Usuario"
          v-model="username"
        />
      </div>
      <div v-if="!isLogin" class="my-3">
        <label for="email-input" class="access--label"
          >Correo electrónico</label
        >
        <input
          id="email-input"
          class="form-control form-control-lg"
          type="email"
          placeholder="Escribe tu correo..."
          aria-label="Correo electrónico"
          v-model="email"
        />
      </div>
      <div class="my-3">
        <label for="pass-input" class="access--label">Contraseña</label>
        <input
          id="pass-input"
          class="form-control form-control-lg"
          type="password"
          placeholder="Escribe una contraseña segura"
          aria-label="Contraseña"
          v-model="password"
        />
      </div>
    </form>
    <div
      class="my-3 mx-5 p-2 alert"
      :class="
        `d-${accessMsg.message ? 'block' : 'none'} alert-${accessMsg.type}`
      "
      role="alert"
    >
      {{ accessMsg.message }}
    </div>
    <div class="container mt-5">
      <div class="row d-flex justify-content-evenly">
        <button
          class="d-inline m-1 px-5 py-2 btn btn-lg access--btn access--btn--change"
          @click.prevent="changeLoginPage"
        >
          {{ isLogin ? 'Registro' : 'Acceso' }}
        </button>
        <button
          class="d-inline m-1 px-5 py-2 btn btn-lg access--btn access--btn--continue"
          @click.prevent="isLogin ? login() : register()"
        >
          {{ isLogin ? 'Acceder' : 'Registrarse' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import AssetsImage from '../Base/AssetsImage.vue';

export default {
  name: 'AccessForm',
  components: { AssetsImage },
  data: function() {
    return {
      username: '',
      email: '',
      password: '',
    };
  },
  computed: {
    ...mapState({
      accessError: (state) => state.access.accessError,
    }),
    ...mapGetters('access', ['isLogin', 'accessMsg']),
  },
  methods: {
    register: function() {
      this.$store.dispatch('access/registerUser', {
        username: this.username,
        email: this.email,
        password: this.password,
      });
    },
    login: function() {
      this.$store.dispatch('access/loginUser', {
        user: this.username,
        password: this.password,
      });
    },
    changeLoginPage: function() {
      this.$store.dispatch('access/changeLoginPage');
    },
  },
};
</script>

<style lang="scss">
.access {
  &--image {
    width: 20%;
  }

  &--title {
    font-family: $heading-bold;
    font-size: $access-title;
    color: $primary;
    margin: auto;

    &-column {
      flex-flow: column;
      margin-left: 0;
      margin-right: 0;
    }

    &-row {
      flex-flow: row;
      margin: 3rem 2rem 2rem 2rem;
    }
  }

  &--label {
    margin-bottom: 1rem;
    font-size: $h3;
    font-family: $heading;
    color: $primary;
  }

  &--btn {
    color: $white;
    font-family: $heading-bold;
    font-size: $h2;
    margin: auto;
    width: 40%;

    &--change {
      background-color: $primary;
    }

    &--continue {
      background-color: $positive;
    }
  }
}
</style>

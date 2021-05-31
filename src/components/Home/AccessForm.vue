<template>
  <div class="container access--container">
    <div
      class="row"
      :class="isLogin ? 'access--title-column' : ' access--title-row my-5'"
    >
      <AssetsImage
        src="logo.png"
        alt="taskrIt Logo"
        class="mx-auto access--image"
        :class="{ 'mt-4 pt-4': isLogin }"
      />
      <h1 class="access--title" :class="{ 'text-center': isLogin }">
        {{ isLogin ? "Bienvenido" : "taskrIt" }}
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
        />
      </div>
      <div class="my-3">
        <label for="mail-input" class="access--label">Correo electrónico</label>
        <input
          id="mail-input"
          class="form-control form-control-lg"
          type="email"
          placeholder="Escribe tu correo..."
          aria-label="Correo electrónico"
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
        />
      </div>
    </form>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import AssetsImage from "../Base/AssetsImage.vue";

export default {
  ame: "AccessForm",
  components: { AssetsImage },
  computed: {
    ...mapGetters("landing", ["isLogin"]),
  },
  methods: {
    ...mapActions("landing", ["changeLoginPage"]),
    login: function () {
      console.log("login");
    },
    register: function () {
      console.log("register");
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
    }

    &-row {
      flex-flow: row;
      margin: auto;
    }
  }

  &--label {
    margin-bottom: 1rem;
    font-size: $h3;
    font-family: $heading;
    color: $primary;
  }
}
</style>
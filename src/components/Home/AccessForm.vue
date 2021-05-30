<template>
  <div>
    <button @click="changeLoginPage">Cambiar</button>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "AccessForm",
  methods: {
    ...mapActions("landing", ["changeLoginPage"]),
  },
};
</script>

<style>
</style>
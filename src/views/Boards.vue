<template>
  <div class="container-flex boards-wrapper">
    <div class="lateral-menu--wrapper">
      <div class="lateral-menu--body">
        <h6>hola</h6>
      </div>
    </div>
  </div>
</template>

<script>
// TODO menu lateral aparece solo tras recarga y no cambia su width
import { Offcanvas } from "bootstrap";
export default {
  created: function () {
    const lateralMenu = new Offcanvas(
      document.getElementById("lateral-menu-wrapper")
    );
    lateralMenu.show();
  },
};
</script>

<style lang="scss">
.boards {
  &--wrapper {
    min-height: 100vh;
  }
}

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
    padding: 0.3rem;
    overflow-y: auto;
    justify-content: center;
    display: flex;
  }
}
</style>

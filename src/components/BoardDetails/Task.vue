<template>
  <div class="row task--container my-3">
    <input type="hidden" :name="`task-id--${task.id}`" />
    <div class="container-flex">
      <div class="row">
        <div
          class="col-9 p-2 task--info--container"
          @click="sendEmit('details')"
        >
          <h4 class="mb-3 row px-2 py-1 task--info--title">{{ task.title }}</h4>
          <p class="row px-2 py-1 task--info--description">
            {{ limitDescription }}
          </p>
        </div>
        <div
          class="
            col-3
            task--additional--container
            d-flex
            flex-column
            justify-content-evenly
          "
        >
          <div class="row justify-content-center py-2">
            <div class="col-6">
              <font-awesome-icon
                icon="exchange-alt"
                class="text-right task--icon task--icon--change"
                @click.prevent="sendEmit('move-task')"
              />
            </div>
            <div class="col-6">
              <font-awesome-icon
                icon="clock"
                class="text-right task--icon task--icon--clock"
                @click.prevent="sendEmit('set-pending')"
              />
            </div>
          </div>
          <h6 class="row justify-content-left task--additional--estimate px-1">
            Est: {{ task.estimate }}
          </h6>
          <h6 class="row justify-content-left task--additional--pending px-1">
            Pend: {{ parsePending }}
          </h6>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    task: {
      type: Object,
      default: () => {},
    },
    list: {
      type: String,
      default: "",
    },
  },
  computed: {
    limitDescription() {
      if (this.task.description) {
        if (this.task.description.length > 120) {
          return `${this.task.description.substring(0, 117)}...`;
        } else {
          return this.task.description;
        }
      } else {
        return "";
      }
    },
    parsePending() {
      return Number.parseFloat(this.task.pending).toFixed(1);
    },
  },
  methods: {
    sendEmit(action) {
      switch (action) {
        case "details": {
          this.$store.dispatch("boards/setSelectedTaskId", {
            selectedTaskId: this.task.id,
          });
          this.$store.dispatch("boards/setSelectedListId", {
            selectedListId: this.list,
          });

          this.$store.dispatch("boards/setModalInfo", {
            modalTitle: "Detalles de la tarea",
            modalTargetForm: "",
          });

          break;
        }

        case "move-task": {
          this.$store.dispatch("boards/setSelectedTaskId", {
            selectedTaskId: this.task.id,
          });
          this.$store.dispatch("boards/setSelectedListId", {
            selectedListId: this.list,
          });

          this.$store.dispatch("boards/setModalInfo", {
            modalTitle: "Mover tarea",
            modalTargetForm: "move-task-form",
          });

          break;
        }

        case "set-pending": {
          this.$store.dispatch("boards/setSelectedTaskId", {
            selectedTaskId: this.task.id,
          });
          this.$store.dispatch("boards/setSelectedListId", {
            selectedListId: this.list,
          });

          this.$store.dispatch("boards/setModalInfo", {
            modalTitle: "Cambiar tiempo pendiente",
            modalTargetForm: "set-pending-form",
          });

          break;
        }

        default: {
          this.$store.dispatch("boards/clearModalInfo");

          break;
        }
      }
    },
  },
};
</script>

<style lang="scss">
.task {
  &--container {
    border: 3px solid $secondary;
    border-radius: 10px;
  }

  &--icon {
    font-size: $h3;
    min-width: 2rem;

    &:hover {
      cursor: pointer;
    }

    &--change {
      color: $accent;
    }

    &--clock {
      color: $primary;
    }
  }

  &--info {
    &--container {
      &:hover {
        cursor: pointer;
      }
    }

    &--title {
      color: $primary-light;
    }

    &--description {
      color: $secondary;
    }
  }

  &--additional {
    &--container {
      border: 3px solid $secondary;
      border-top: 0px;
      border-right: 0px;
      border-bottom: 0px;
    }

    &--estimate {
      color: $primary;
      font-weight: bold;
    }

    &--pending {
      color: $primary;
      font-weight: bold;
    }
  }
}
</style>

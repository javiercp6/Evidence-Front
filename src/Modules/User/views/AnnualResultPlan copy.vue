<template>
  <div class="flex flex-center bg-blue-grey-10">
    <div
      class="q-ma-md container-objectives"
      style="background-color: rgba(255, 255, 255, 0.1)"
    >
      <div class="text-h5 q-pa-md text-blue-grey-1">Objetivos</div>
      <q-scroll-area class="area-scroll">
        <div
          v-for="n in 16"
          :key="n"
          class="row q-ma-sm container-item-objectives"
        >
          <div class="text-blue-grey-1">
            <q-circular-progress
              show-value
              font-size="12px"
              :value="value"
              size="50px"
              :thickness="0.22"
              color="teal"
              track-color="grey-3"
              class="q-ma-sm"
            >
              {{ value }}%
            </q-circular-progress>
          </div>
          <div class="col text-blue-grey-1 objectives q-ma-sm">
            Participar en al menos dos espacios de diálogo y debate (1 en el
            edificio docente y 1 en la residencia estudiantil) con los
            estudiantes, demostrando su formación integral y preparación
            política-ideológica
          </div>
        </div>
      </q-scroll-area>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import useAuth from "src/Modules/auth/composables/useAuth";

export default defineComponent({
  name: "IndexPage",

  setup() {
    return {
      value: 80,
    };
  },
});
</script>
<style lang="sass" scoped>
.container-objectives
  width: 100%
  height: calc(100vh - (50px + 48px))
  border-radius:10px

.area-scroll
  width: 100%
  height: calc(calc(100vh - (50px + 48px)) - 64px)


.container-item-objectives
  border-radius:10px
  cursor: pointer
  background-color: rgba(255, 255, 255, 0.1)
</style>

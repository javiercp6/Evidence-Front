<template>
  <q-dialog v-model="promptDeleteArea" persistent>
    <q-card class="bg-blue-grey-10 card-evidencia" style="min-width: 350px">
      <q-card-section style="background-color: rgba(255, 255, 255, 0.1)">
      </q-card-section>

      <q-card-section
        class="q-pt-none"
        style="background-color: rgba(255, 255, 255, 0.1)"
      >
        <div class="text-subtitle1 text-center text-blue-grey-1 q-pa-xs">
          ¿Está seguro que desea eliminar esta area de resultado clave?
        </div>
      </q-card-section>

      <q-card-actions
        align="right"
        class="text-primary q-pa-md"
        style="background-color: rgba(255, 255, 255, 0.1)"
      >
        <q-btn flat rounded label="Cancelar" v-close-popup @click="reset" />
        <q-btn
          color="primary"
          rounded
          label="Eliminar"
          v-close-popup
          @click="onDeleteArea"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { defineComponent, inject, ref } from "vue";
//import useAuth from "../composables/useAuth";
import useArea from "../composables/useArea";
import { useQuasar } from "quasar";

export default defineComponent({
  name: "FormDeleteArea",
  setup() {
    const { deleteArea } = useArea();
    const $q = useQuasar();
    const promptDeleteArea = inject("promptDeleteArea");
    const areaForm = inject("areaForm");
    const reset = () => {
      areaForm.value.id = null;
      areaForm.value.name = "";
      areaForm.value.objectives = [""];
    };

    return {
      promptDeleteArea,
      reset,
      onDeleteArea: async () => {
        const { ok, message } = await deleteArea(areaForm.value.id);
        if (!ok)
          $q.notify({
            message,
            color: "negative",
          });
        if (ok) {
          $q.notify({
            message: "Area Eliminada",
            color: "positive",
          });
        }
        reset();
      },
    };
  },
});
</script>

<style lang="sass" scoped>
.card-evidencia
  border-radius: 10px

.q-field__control
  background: yellow !important

.input-textarea
  color: #ffffffa3
</style>

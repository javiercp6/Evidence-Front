<template>
  <q-dialog v-model="promptEditObjective" persistent>
    <q-card
      class="bg-blue-grey-10 card-evidencia"
      :style="$q.screen.gt.sm ? 'min-width: 850px' : 'min-width: 100%'"
    >
      <q-form @submit.prevent="onSubmitEditObjective">
        <q-card-section style="background-color: rgba(255, 255, 255, 0.1)">
          <div class="text-h6 text-blue-grey-1">Modificar Objetivo</div>
        </q-card-section>

        <q-card-section
          class="q-pt-none"
          style="background-color: rgba(255, 255, 255, 0.1)"
        >
          <q-input
            outlined
            dense
            class="q-pa-xs"
            type="textarea"
            rows="3"
            input-style=" color: #ffffffa3 "
            placeholder="Objetivo"
            v-model="objectiveForm.name"
          />
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
            label="Aceptar"
            v-close-popup
            type="submit"
          />
        </q-card-actions>
      </q-form>
    </q-card>
  </q-dialog>
</template>

<script>
import { defineComponent, inject } from "vue";
import { useQuasar } from "quasar";
//import useAuth from "../composables/useAuth";
import useArea from "../composables/useArea";
export default defineComponent({
  name: "FormEditObjective",
  setup() {
    const { editObjective } = useArea();
    const $q = useQuasar();
    const promptEditObjective = inject("promptEditObjective");
    const objectiveForm = inject("objectiveForm");

    const reset = () => {
      objectiveForm.value.idArea = null;
      objectiveForm.value.id = "";
      objectiveForm.value.name = "";
      objectiveForm.value.criterions = [""];
    };

    return {
      promptEditObjective,
      objectiveForm,

      reset,

      onSubmitEditObjective: async () => {
        console.log("editar");
        const { ok, message } = await editObjective(objectiveForm.value);

        if (!ok)
          $q.notify({
            message,
            color: "negative",
          });
        if (ok) {
          $q.notify({
            message: "Objetivo Estratégico Modificado",
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

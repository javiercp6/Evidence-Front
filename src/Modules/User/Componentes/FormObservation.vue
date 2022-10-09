<template>
  <q-dialog v-model="promptObservation" persistent>
    <q-card
      class="bg-blue-grey-10 card-evidencia"
      :style="$q.screen.gt.sm ? 'min-width: 850px' : 'min-width: 100%'"
    >
      <q-form @submit.prevent="onSubmitObsetvation">
        <q-card-section style="background-color: rgba(255, 255, 255, 0.1)">
          <div class="text-h6 text-blue-grey-1">Añadir Observación</div>
        </q-card-section>

        <q-card-section
          class="q-pt-none"
          style="background-color: rgba(255, 255, 255, 0.1)"
        >
          <q-input
            outlined
            autofocus
            dense
            class="q-pa-xs"
            type="textarea"
            rows="3"
            input-style=" color: #ffffffa3 "
            label="Observación"
            :rules="[
              (val) => (val && val.length > 0) || 'Este campo es obligatorio',
              (val) =>
                exp2.test(val) ||
                `Este campo contie un texto o caracter no válido `,
            ]"
            v-model="observation"
          />
        </q-card-section>

        <q-card-actions
          align="right"
          class="text-primary q-pa-md"
          style="background-color: rgba(255, 255, 255, 0.1)"
        >
          <q-btn flat rounded label="Cancelar" v-close-popup @click="reset" />
          <q-btn color="primary" rounded label="Aceptar" type="submit" />
        </q-card-actions>
      </q-form>
    </q-card>
  </q-dialog>
</template>

<script>
import { defineComponent, inject, ref } from "vue";
import { useQuasar } from "quasar";

import useUser from "../composables/useUser";

export default defineComponent({
  name: "FormObservation",
  setup() {
    const $q = useQuasar();

    const { createObservation } = useUser();
    const observation = inject("observation");
    const promptObservation = inject("promptObservation");
    const idIndicator = inject("idIndicator");

    const reset = () => {
      observation.value = "";
      promptObservation.value = false;
    };
    //editFormIndicator.value = false;
    return {
      observation,
      promptObservation,
      reset,
      exp2: /^(|[A-Za-zñÑáéíóúàèìòùÁÉÍÓÚÀÈÌÒÙüÜçÇ0-9](|[A-Za-zñÑáéíóúàèìòùÁÉÍÓÚÀÈÌÒÙüÜçÇ0-9!¡?¿"@/().;,:\r\n\s]+$))+$/,

      onSubmitObsetvation: async () => {
        const { ok, message } = await createObservation(
          observation.value,
          idIndicator.value
        );

        if (!ok)
          $q.notify({
            message,
            color: "negative",
          });
        if (ok) {
          $q.notify({
            message: "Observación Añadida",
            color: "positive",
          });
        }
        console.log("Crear");

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

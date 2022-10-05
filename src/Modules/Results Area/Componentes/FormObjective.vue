<template>
  <q-dialog v-model="promptObjective" persistent>
    <q-card
      class="bg-blue-grey-10 card-evidencia"
      :style="$q.screen.gt.sm ? 'min-width: 850px' : 'min-width: 100%'"
    >
      <q-form @submit.prevent="onSubmitObjective">
        <q-card-section style="background-color: rgba(255, 255, 255, 0.1)">
          <div class="text-h6 text-blue-grey-1">Nuevo Objetivo</div>
        </q-card-section>

        <q-card-section
          class="q-pt-none"
          style="background-color: rgba(255, 255, 255, 0.1)"
        >
          <q-input
            outlined
            dense
            class="q-pa-xs"
            input-style=" color: #ffffffa3 "
            type="textarea"
            rows="3"
            placeholder="Objetivo"
            :rules="[
              (val) => (val && val.length > 0) || 'Este campo es obligatorio',
              (val) =>
                exp2.test(val) || 'Este campo no acepta caracteres especiales',
            ]"
            v-model="objectiveForm.name"
          />
          <div class="row q-pt-sm">
            <div class="text-subtitle1 text-blue-grey-1 q-pa-xs">Criterios</div>
            <div class="row q-ml-sm justify-center items-center">
              <div>
                <q-btn
                  class="q-ma-xs"
                  round
                  icon="remove"
                  color="primary"
                  size="xs"
                  @click="removeInputObjetives()"
                />
                <q-btn
                  round
                  icon="add"
                  color="primary"
                  size="xs"
                  @click="addInputObjetives()"
                />
              </div>
            </div>
          </div>
          <q-input
            v-for="(criterion, index) in objectiveForm.criterions"
            :key="index"
            outlined
            dense
            class="q-pa-xs q-pb-sm"
            input-style=" color: #ffffffa3 "
            type="textarea"
            rows="3"
            :placeholder="'Criterio ' + (index + 1)"
            :rules="[
              (val) => (val && val.length > 0) || 'Este campo es obligatorio',
              (val) =>
                exp2.test(val) || 'Este campo no acepta caracteres especiales',
            ]"
            v-model="objectiveForm.criterions[index]"
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
//import useAuth from "../composables/useAuth";
import useArea from "../composables/useArea";
export default defineComponent({
  name: "FormObjective",
  setup() {
    const { createObjective } = useArea();
    const $q = useQuasar();
    const promptObjective = inject("promptObjective");
    const objectiveForm = inject("objectiveForm");

    const reset = () => {
      objectiveForm.value.name = "";
      objectiveForm.value.criterions = [""];
      promptObjective.value = false;
    };

    return {
      promptObjective,
      objectiveForm,
      exp2: /^[A-Za-zñÑáéíóúàèìòùÁÉÍÓÚÀÈÌÒÙüÜçÇ0-9 !¡?¿"@/().;,:]+$/,
      reset,
      addInputObjetives() {
        objectiveForm.value.criterions.length++;
      },
      removeInputObjetives() {
        if (objectiveForm.value.criterions.length > 1) {
          objectiveForm.value.criterions.length--;
        }
      },

      onSubmitObjective: async () => {
        const { ok, message } = await createObjective(objectiveForm.value);

        if (!ok)
          $q.notify({
            message,
            color: "negative",
          });
        if (ok) {
          $q.notify({
            message: "Objetivo Estratégico Creado",
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

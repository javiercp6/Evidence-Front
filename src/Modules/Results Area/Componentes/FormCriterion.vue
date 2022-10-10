<template>
  <q-dialog v-model="promptCriterion" persistent>
    <q-card
      class="bg-blue-grey-10 card-evidencia"
      :style="$q.screen.gt.sm ? 'min-width: 850px' : 'min-width: 100%'"
    >
      <q-form @submit.prevent="onSubmitCriterion">
        <q-card-section style="background-color: rgba(255, 255, 255, 0.1)">
          <div class="text-h6 text-blue-grey-1">{{ title() }}</div>
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
            label="Criterio de medida"
            :rules="[
              (val) => (val && val.length > 0) || 'Este campo es obligatorio',
              (val) =>
                exp2.test(val) ||
                `Este campo contie un texto o caracter no válido `,
            ]"
            v-model="criterionForm.name"
          />
          <q-input
            outlined
            dense
            class="q-pa-xs q-pt-md"
            input-style=" color: #ffffffa3 "
            label="Catidad de cumplimientos"
            mask="###"
            :rules="[
              (val) => (val && val.length > 0) || 'Este campo es obligatorio',
            ]"
            v-model="criterionForm.todo"
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
  name: "FormCriterion",
  setup() {
    const { createCriterion, editCriterion } = useArea();
    const $q = useQuasar();
    const promptCriterion = inject("promptCriterion");
    const criterionForm = inject("criterionForm");
    const editFormCriterion = inject("editFormCriterion");
    const reset = () => {
      criterionForm.value.idObjective = null;
      criterionForm.value.name = "";
      criterionForm.value.todo = null;
      editFormCriterion.value = false;
      promptCriterion.value = false;
    };

    return {
      promptCriterion,
      criterionForm,
      editFormCriterion,
      exp2: /^(|[A-Za-zñÑáéíóúàèìòùÁÉÍÓÚÀÈÌÒÙüÜçÇ0-9](|[A-Za-zñÑáéíóúàèìòùÁÉÍÓÚÀÈÌÒÙüÜçÇ0-9!¡?¿"@/().;,:\r\n\s]+$))+$/,
      reset,
      title: () => {
        return editFormCriterion.value
          ? "Modificar Criterio de Medida"
          : "Nuevo Criterio de Medida";
      },

      onSubmitCriterion: async () => {
        if (editFormCriterion.value) {
          const { ok, message } = await editCriterion(criterionForm.value);
          if (!ok)
            $q.notify({
              message,
              color: "negative",
            });
          if (ok) {
            $q.notify({
              message: "Criterio de Medidada  Modificado",
              color: "positive",
            });
          }
        } else {
          const { ok, message } = await createCriterion(criterionForm.value);

          if (!ok)
            $q.notify({
              message,
              color: "negative",
            });
          if (ok) {
            $q.notify({
              message: "Criterio de Medidada  Creado",
              color: "positive",
            });
          }
        }
        editFormCriterion.value = false;
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

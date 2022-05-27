<template>
  <q-dialog v-model="prompt" persistent>
    <q-card
      class="bg-blue-grey-10 card-evidencia"
      :style="$q.screen.gt.sm ? 'min-width: 850px' : 'min-width: 100%'"
    >
      <q-form @submit.prevent="onSubmitCriterion">
        <q-card-section style="background-color: rgba(255, 255, 255, 0.1)">
          <div class="text-h6 text-blue-grey-1">Nuevo Criterio</div>
        </q-card-section>

        <q-card-section
          class="q-pt-none"
          style="background-color: rgba(255, 255, 255, 0.1)"
        >
          <!-- <q-input
          dense
          v-model="address"
          autofocus
          @keyup.enter="prompt = false"
        /> -->
          <q-input
            outlined
            dense
            class="q-pa-xs"
            type="textarea"
            rows="3"
            input-style=" color: #ffffffa3 "
            placeholder="Criterio de medida"
            v-model="criterionForm.name"
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
import { defineComponent, inject, ref } from "vue";
import { useQuasar } from "quasar";
//import useAuth from "../composables/useAuth";
import useArea from "../composables/useArea";
export default defineComponent({
  name: "FormCriterion",
  setup() {
    const { createCriterion } = useArea();
    const $q = useQuasar();
    const prompt = inject("prompt");
    const criterionForm = inject("criterionForm");
    const editFormCriterion = inject("editFormCriterion");
    const reset = () => {
      criterionForm.value.idObjective = null;
      criterionForm.value.name = "";
    };

    return {
      prompt,
      criterionForm,
      editFormCriterion,
      address: ref(null),
      reset,

      onSubmitCriterion: async () => {
        if (editFormCriterion.value == true) {
          /* console.log("Editar");
          const { ok, message } = await editArea(areaForm.value);
          if (!ok)
            $q.notify({
              message,
              color: "negative",
            });
          if (ok) {
            $q.notify({
              message,
              color: "positive",
            });
          } */
        } else {
          console.log({ criterionForm }, "submitCriterion");
          const { ok, message } = await createCriterion(criterionForm.value);

          if (!ok)
            $q.notify({
              message,
              color: "negative",
            });
          if (ok) {
            $q.notify({
              message: "Area Creada",
              color: "positive",
            });
          }
          console.log("Crear");
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

<template>
  <q-dialog v-model="promptArea" persistent>
    <q-card
      class="bg-blue-grey-10 card-evidencia"
      :style="$q.screen.gt.sm ? 'min-width: 850px' : 'min-width: 100%'"
    >
      <q-form @submit.prevent="onSubmitArea">
        <q-card-section style="background-color: rgba(255, 255, 255, 0.1)">
          <div class="text-h6 text-blue-grey-1">Nueva Área</div>
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
            autofocus
            outlined
            dense
            class="q-pa-xs"
            input-style=" color: #ffffffa3 "
            :rules="[
              (val) => (val && val.length > 0) || 'Este campo es obligatorio',
              (val) => exp.test(val) || 'Este campo solo acepta letras',
            ]"
            label="Nombre"
            v-model="areaForm.name"
          />
          <div v-show="!editFormArea" class="row q-pt-sm">
            <div class="text-subtitle1 text-blue-grey-1 q-pa-xs">Objetivos</div>
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
          <div v-if="!editFormArea">
            <q-input
              v-for="(objective, index) in areaForm.objectives"
              :key="index"
              outlined
              dense
              class="q-pa-xs q-pb-sm"
              input-style=" color: #ffffffa3 "
              type="textarea"
              rows="3"
              :label="'Objetivo ' + (index + 1)"
              :rules="[
                (val) =>
                  exp2.test(val) ||
                  `Este campo contie un texto o caracter no válido `,
              ]"
              v-model="areaForm.objectives[index]"
            />
          </div>
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
  name: "FormArea",
  setup() {
    const { createArea, editArea } = useArea();
    const $q = useQuasar();
    const exp = /^[A-Za-zñÑáéíóúàèìòùÁÉÍÓÚÀÈÌÒÙüÜçÇ\s]+$/;
    const exp2 =
      /^(|[A-Za-zñÑáéíóúàèìòùÁÉÍÓÚÀÈÌÒÙüÜçÇ0-9](|[A-Za-zñÑáéíóúàèìòùÁÉÍÓÚÀÈÌÒÙüÜçÇ0-9!¡?¿"@/().;,:\r\n\s]+$))+$/;

    const promptArea = inject("promptArea");
    const areaForm = inject("areaForm");
    const editFormArea = inject("editFormArea");

    const reset = () => {
      areaForm.value.id = null;
      areaForm.value.name = "";
      areaForm.value.objectives = [""];
      editFormArea.value = false;
      promptArea.value = false;
    };

    return {
      promptArea,
      editFormArea,
      areaForm,
      exp,
      exp2,

      reset,
      addInputObjetives() {
        console.log(areaForm.value.objectives.length);
        areaForm.value.objectives.length++;
      },
      removeInputObjetives() {
        console.log(areaForm.value.objectives.length);
        if (areaForm.value.objectives.length > 1) {
          areaForm.value.objectives.length--;
        }
      },

      onSubmitArea: async () => {
        if (editFormArea.value) {
          console.log("vvvv");
          const { ok, message } = await editArea(areaForm.value);

          if (!ok)
            $q.notify({
              message,
              color: "negative",
            });
          if (ok) {
            $q.notify({
              message: "Área Modificada",
              color: "positive",
            });
          }
          console.log("editar");
        } else {
          const { ok, message } = await createArea(areaForm.value);

          if (!ok)
            $q.notify({
              message,
              color: "negative",
            });
          if (ok) {
            $q.notify({
              message: "Área Creada",
              color: "positive",
            });
          }
          console.log("Crear");
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

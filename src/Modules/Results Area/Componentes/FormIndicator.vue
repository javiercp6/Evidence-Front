<template>
  <q-dialog v-model="promptIndicator" persistent>
    <q-card
      class="bg-blue-grey-10 card-evidencia"
      :style="$q.screen.gt.sm ? 'min-width: 850px' : 'min-width: 100%'"
    >
      <q-form @submit.prevent="onSubmitIndicator">
        <q-card-section style="background-color: rgba(255, 255, 255, 0.1)">
          <div class="text-h6 text-blue-grey-1">Nuevo Indicador</div>
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
            autofocus
            dense
            class="q-pa-xs"
            type="textarea"
            rows="3"
            input-style=" color: #ffffffa3 "
            label="Indicador"
            :rules="[
              (val) => (val && val.length > 0) || 'Este campo es obligatorio',
              (val) =>
                exp2.test(val) ||
                `Este campo contie un texto o caracter no válido `,
            ]"
            v-model="indicatorForm.name"
          />
          <div class="column q-py-xs">
            <div class="text-subtitle1 text-blue-grey-1 q-pa-xs">Categoría</div>
            <q-radio
              class="q-pa-xs text-blue-grey-1"
              dense
              v-model="indicatorForm.category"
              val="TRABAJO DOCENTE-EDUCATIVO EN PREGRADO Y POSGRADO"
              label="TRABAJO DOCENTE-EDUCATIVO EN PREGRADO Y POSGRADO"
              dark
            />
            <q-radio
              class="q-pa-xs text-blue-grey-1"
              dense
              v-model="indicatorForm.category"
              val="TRABAJO POLÍTICO-IDEOLÓGICO"
              label="TRABAJO POLÍTICO-IDEOLÓGICO"
              dark
            />
            <q-radio
              class="q-pa-xs text-blue-grey-1"
              dense
              v-model="indicatorForm.category"
              val="TRABAJO METODOLÓGICO"
              label="TRABAJO METODOLÓGICO"
              dark
            />
            <q-radio
              class="q-pa-xs text-blue-grey-1"
              dense
              v-model="indicatorForm.category"
              val="TRABAJO DE INVESTIGACIÓN E INNOVACIÓN"
              label="TRABAJO DE INVESTIGACIÓN E INNOVACIÓN"
              dark
            />
            <q-radio
              class="q-pa-xs text-blue-grey-1"
              dense
              v-model="indicatorForm.category"
              val="SUPERACIÓN"
              label="SUPERACIÓN"
              dark
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
  name: "FormIndicator",
  setup() {
    const { editIndicator, createIndicator } = useArea();
    const $q = useQuasar();
    const promptIndicator = inject("promptIndicator");
    const indicatorForm = inject("indicatorForm");
    const editFormIndicator = inject("editFormIndicator");

    const reset = () => {
      indicatorForm.value.id = null;
      indicatorForm.value.name = "";
      indicatorForm.value.category =
        "TRABAJO DOCENTE-EDUCATIVO EN PREGRADO Y POSGRADO";
      editFormIndicator.value = false;
      promptIndicator.value = false;
    };

    return {
      promptIndicator,
      indicatorForm,
      editFormIndicator,
      exp2: /^(|[A-Za-zñÑáéíóúàèìòùÁÉÍÓÚÀÈÌÒÙüÜçÇ0-9](|[A-Za-zñÑáéíóúàèìòùÁÉÍÓÚÀÈÌÒÙüÜçÇ0-9!¡?¿"@/().;,:\r\n\s]+$))+$/,
      reset,

      onSubmitIndicator: async () => {
        if (editFormIndicator.value) {
          console.log("Editar");
          const { ok, message } = await editIndicator(indicatorForm.value);
          if (!ok)
            $q.notify({
              message,
              color: "negative",
            });
          if (ok) {
            $q.notify({
              message: "Indicador Modificado",
              color: "positive",
            });
          }
        } else {
          const { ok, message } = await createIndicator(indicatorForm.value);

          if (!ok)
            $q.notify({
              message,
              color: "negative",
            });
          if (ok) {
            $q.notify({
              message: "Indicador Creado",
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

<template>
  <q-dialog v-model="promptIndicatorPersonal" persistent>
    <q-card
      class="bg-blue-grey-10 card-evidencia"
      :style="$q.screen.gt.sm ? 'min-width: 850px' : 'min-width: 100%'"
    >
      <q-form @submit.prevent="onSubmitIndicatorPersonal">
        <q-card-section style="background-color: rgba(255, 255, 255, 0.1)">
          <div class="text-h6 text-blue-grey-1">Nuevo Indicador Personal</div>
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
            label="Indicador"
            :rules="[
              (val) => (val && val.length > 0) || 'Este campo es obligatorio',
              (val) =>
                exp2.test(val) ||
                `Este campo contie un texto o caracter no válido `,
            ]"
            v-model="indicatorPersonalForm.name"
          />
          <div class="column q-py-xs">
            <div class="text-subtitle1 text-blue-grey-1 q-pa-xs">Categoría</div>
            <q-radio
              class="q-pa-xs text-blue-grey-1"
              dense
              v-model="indicatorPersonalForm.category"
              val="TRABAJO DOCENTE-EDUCATIVO EN PREGRADO Y POSGRADO"
              label="TRABAJO DOCENTE-EDUCATIVO EN PREGRADO Y POSGRADO"
              dark
            />
            <q-radio
              class="q-pa-xs text-blue-grey-1"
              dense
              v-model="indicatorPersonalForm.category"
              val="TRABAJO POLÍTICO-IDEOLÓGICO"
              label="TRABAJO POLÍTICO-IDEOLÓGICO"
              dark
            />
            <q-radio
              class="q-pa-xs text-blue-grey-1"
              dense
              v-model="indicatorPersonalForm.category"
              val="TRABAJO METODOLÓGICO"
              label="TRABAJO METODOLÓGICO"
              dark
            />
            <q-radio
              class="q-pa-xs text-blue-grey-1"
              dense
              v-model="indicatorPersonalForm.category"
              val="TRABAJO DE INVESTIGACIÓN E INNOVACIÓN"
              label="TRABAJO DE INVESTIGACIÓN E INNOVACIÓN"
              dark
            />
            <q-radio
              class="q-pa-xs text-blue-grey-1"
              dense
              v-model="indicatorPersonalForm.category"
              val="SUPERACIÓN"
              label="SUPERACIÓN"
              dark
            />
            <q-radio
              class="q-pa-xs text-blue-grey-1"
              dense
              v-model="indicatorPersonalForm.category"
              val="EXTENSIÓN UNIVERSITARIA"
              label="EXTENSIÓN UNIVERSITARIA"
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
import useAuth from "../../auth/composables/useAuth";
import useUser from "../composables/useUser";

export default defineComponent({
  name: "FormIndicatorPersonal",
  setup() {
    const $q = useQuasar();
    const { uid } = useAuth();
    const { createIndicatorsPersonal } = useUser();
    const promptIndicatorPersonal = inject("promptIndicatorPersonal");
    const indicatorPersonalForm = inject("indicatorPersonalForm");
    const editFormIndicatorPersonal = inject("editFormIndicatorPersonal");

    const reset = () => {
      indicatorPersonalForm.value.id = null;
      indicatorPersonalForm.value.name = "";
      indicatorPersonalForm.value.category =
        "TRABAJO DOCENTE-EDUCATIVO EN PREGRADO Y POSGRADO";
      promptIndicatorPersonal.value = false;
    };
    //editFormIndicator.value = false;
    return {
      promptIndicatorPersonal,
      indicatorPersonalForm,
      exp2: /^(|[A-Za-zñÑáéíóúàèìòùÁÉÍÓÚÀÈÌÒÙüÜçÇ0-9](|[A-Za-zñÑáéíóúàèìòùÁÉÍÓÚÀÈÌÒÙüÜçÇ0-9!¡?¿"@/().;,:\r\n\s]+$))+$/,
      reset,

      onSubmitIndicatorPersonal: async () => {
        if (editFormIndicatorPersonal.value) {
          const { ok, message } = await editIndicator(
            indicatorPersonalForm.value
          );
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
          const { ok, message } = await createIndicatorsPersonal(
            indicatorPersonalForm.value,
            uid.value
          );

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

<template>
  <q-dialog v-model="promptEvaluation" persistent>
    <q-card
      class="bg-blue-grey-10 card-evidencia"
      :style="$q.screen.gt.sm ? 'min-width: 650px' : 'min-width: 100%'"
    >
      <q-form
        @submit.prevent="onSubmitEvaluation"
        style="background-color: rgba(255, 255, 255, 0.1)"
      >
        <q-card-section>
          <div class="text-h6 text-blue-grey-1">Evaluación</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <div
            style="
              background-color: rgba(255, 255, 255, 0.07);
              border-radius: 10px;
            "
            class="q-pa-xs q-my-md"
          >
            <div class="text-subtitle1 text-blue-grey-1 q-pa-xs">
              TRABAJO DOCENTE-EDUCATIVO EN PREGRADO Y POSGRADO
            </div>
            <div class="q-gutter-sm">
              <q-radio
                dense
                class="text-blue-grey-1 q-px-xs"
                dark
                color="red-5"
                v-model="arrayNumber[0]"
                :val="1"
                label="Mal"
              />
              <q-radio
                class="text-blue-grey-1 q-px-xs"
                color="orange-4"
                v-model="arrayNumber[0]"
                dark
                dense
                :val="2"
                label="Regular"
              />
              <q-radio
                class="text-blue-grey-1 q-px-xs"
                dark
                dense
                color="green"
                v-model="arrayNumber[0]"
                :val="3"
                label="Bien"
              />
              <q-radio
                class="text-blue-grey-1 q-px-xs"
                dark
                dense
                color="primary"
                v-model="arrayNumber[0]"
                :val="4"
                label="Exelente"
              />
            </div>
          </div>
          <div
            style="
              background-color: rgba(255, 255, 255, 0.07);
              border-radius: 10px;
            "
            class="q-pa-xs q-my-md"
          >
            <div class="text-subtitle1 text-blue-grey-1 q-pa-xs">
              TRABAJO POLÍTICO-IDEOLÓGICO
            </div>
            <div class="q-gutter-sm">
              <q-radio
                dense
                class="text-blue-grey-1 q-px-xs"
                dark
                color="red-5"
                v-model="arrayNumber[1]"
                :val="1"
                label="Mal"
              />
              <q-radio
                class="text-blue-grey-1 q-px-xs"
                color="orange-4"
                v-model="arrayNumber[1]"
                dark
                dense
                :val="2"
                label="Regular"
              />
              <q-radio
                class="text-blue-grey-1 q-px-xs"
                dark
                dense
                color="green"
                v-model="arrayNumber[1]"
                :val="3"
                label="Bien"
              />
              <q-radio
                class="text-blue-grey-1 q-px-xs"
                dark
                dense
                color="primary"
                v-model="arrayNumber[1]"
                :val="4"
                label="Exelente"
              />
            </div>
          </div>
          <div
            style="
              background-color: rgba(255, 255, 255, 0.07);
              border-radius: 10px;
            "
            class="q-pa-xs q-my-md"
          >
            <div class="text-subtitle1 text-blue-grey-1 q-pa-xs">
              TRABAJO METODOLÓGICO
            </div>
            <div class="q-gutter-sm">
              <q-radio
                dense
                class="text-blue-grey-1 q-px-xs"
                dark
                color="red-5"
                v-model="arrayNumber[2]"
                :val="1"
                label="Mal"
              />
              <q-radio
                class="text-blue-grey-1 q-px-xs"
                color="orange-4"
                v-model="arrayNumber[2]"
                dark
                dense
                :val="2"
                label="Regular"
              />
              <q-radio
                class="text-blue-grey-1 q-px-xs"
                dark
                dense
                color="green"
                v-model="arrayNumber[2]"
                :val="3"
                label="Bien"
              />
              <q-radio
                class="text-blue-grey-1 q-px-xs"
                dark
                dense
                color="primary"
                v-model="arrayNumber[2]"
                :val="4"
                label="Exelente"
              />
            </div>
          </div>
          <div
            style="
              background-color: rgba(255, 255, 255, 0.07);
              border-radius: 10px;
            "
            class="q-pa-xs q-my-md"
          >
            <div class="text-subtitle1 text-blue-grey-1 q-pa-xs">
              TRABAJO DE INVESTIGACIÓN E INNOVACIÓN
            </div>
            <div class="q-gutter-sm">
              <q-radio
                dense
                class="text-blue-grey-1 q-px-xs"
                dark
                color="red-5"
                v-model="arrayNumber[3]"
                :val="1"
                label="Mal"
              />
              <q-radio
                class="text-blue-grey-1 q-px-xs"
                color="orange-4"
                v-model="arrayNumber[3]"
                dark
                dense
                :val="2"
                label="Regular"
              />
              <q-radio
                class="text-blue-grey-1 q-px-xs"
                dark
                dense
                color="green"
                v-model="arrayNumber[3]"
                :val="3"
                label="Bien"
              />
              <q-radio
                class="text-blue-grey-1 q-px-xs"
                dark
                dense
                color="primary"
                v-model="arrayNumber[3]"
                :val="4"
                label="Exelente"
              />
            </div>
          </div>
          <div
            style="
              background-color: rgba(255, 255, 255, 0.07);
              border-radius: 10px;
            "
            class="q-pa-xs q-my-md"
          >
            <div class="text-subtitle1 text-blue-grey-1 q-pa-xs">
              SUPERACIÓN
            </div>
            <div class="q-gutter-sm">
              <q-radio
                dense
                class="text-blue-grey-1 q-px-xs"
                dark
                color="red-5"
                v-model="arrayNumber[4]"
                :val="1"
                label="Mal"
              />
              <q-radio
                class="text-blue-grey-1 q-px-xs"
                color="orange-4"
                v-model="arrayNumber[4]"
                dark
                dense
                :val="2"
                label="Regular"
              />
              <q-radio
                class="text-blue-grey-1 q-px-xs"
                dark
                dense
                color="green"
                v-model="arrayNumber[4]"
                :val="3"
                label="Bien"
              />
              <q-radio
                class="text-blue-grey-1 q-px-xs"
                dark
                dense
                color="primary"
                v-model="arrayNumber[4]"
                :val="4"
                label="Exelente"
              />
            </div>
          </div>
          <div
            style="
              background-color: rgba(255, 255, 255, 0.07);
              border-radius: 10px;
            "
            class="q-pa-xs q-my-md"
          >
            <div class="text-subtitle1 text-blue-grey-1 q-pa-xs">
              EXTENSIÓN UNIVERSITARIA
            </div>
            <div class="q-gutter-sm">
              <q-radio
                dense
                class="text-blue-grey-1 q-px-xs"
                dark
                color="red-5"
                v-model="arrayNumber[5]"
                :val="1"
                label="Mal"
              />
              <q-radio
                class="text-blue-grey-1 q-px-xs"
                color="orange-4"
                v-model="arrayNumber[5]"
                dark
                dense
                :val="2"
                label="Regular"
              />
              <q-radio
                class="text-blue-grey-1 q-px-xs"
                dark
                dense
                color="green"
                v-model="arrayNumber[5]"
                :val="3"
                label="Bien"
              />
              <q-radio
                class="text-blue-grey-1 q-px-xs"
                dark
                dense
                color="primary"
                v-model="arrayNumber[5]"
                :val="4"
                label="Exelente"
              />
            </div>
          </div>
          <div
            style="
              background-color: rgba(255, 255, 255, 0.07);
              border-radius: 10px;
            "
            class="q-pa-xs q-my-md"
          >
            <div class="text-subtitle1 text-blue-grey-1 q-pa-xs">
              Evaluación Final
            </div>
            <div class="q-gutter-sm">
              <q-radio
                dense
                class="text-blue-grey-1 q-px-xs"
                dark
                color="red-5"
                v-model="arrayNumber[6]"
                :val="1"
                label="Mal"
              />
              <q-radio
                class="text-blue-grey-1 q-px-xs"
                color="orange-4"
                v-model="arrayNumber[6]"
                dark
                dense
                :val="2"
                label="Regular"
              />
              <q-radio
                class="text-blue-grey-1 q-px-xs"
                dark
                dense
                color="green"
                v-model="arrayNumber[6]"
                :val="3"
                label="Bien"
              />
              <q-radio
                class="text-blue-grey-1 q-px-xs"
                dark
                dense
                color="primary"
                v-model="arrayNumber[6]"
                :val="4"
                label="Exelente"
              />
            </div>
          </div>
        </q-card-section>

        <q-card-actions align="right" class="text-primary q-pa-md">
          <q-btn flat rounded label="Cancelar" v-close-popup />
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
import { defineComponent, inject, ref, watch } from "vue";
import useUser from "src/Modules/User/composables/useUser";
import { useQuasar } from "quasar";
export default defineComponent({
  name: "FormEvidencia",
  setup() {
    const { createEvaluationValue } = useUser();
    const $q = useQuasar();
    const promptEvaluation = inject("promptEvaluation");

    /* const reset = () => {
      evidence.value.id = null;
      evidence.value.description = "";
      evidence.value.files = null;
    }; */
    const evaluationForm = ref([
      "Exelente",
      "Exelente",
      "Exelente",
      "Exelente",
      "Exelente",
      "Exelente",
      "Exelente",
    ]);

    const arrayNumber = ref([4, 4, 4, 4, 4, 4, 4]);

    watch(
      () => {
        return (
          arrayNumber.value[0] +
          arrayNumber.value[1] +
          arrayNumber.value[2] +
          arrayNumber.value[3] +
          arrayNumber.value[4] +
          arrayNumber.value[5]
        );
      },
      (val) => {
        arrayNumber.value[6] = Math.trunc(val / 6);
      }
    );

    const valores = ref(["Otro", "Mal", "Regular", "Bien", "Exelente"]);

    return {
      prompt,
      promptEvaluation,
      evaluationForm,
      arrayNumber,

      onSubmitEvaluation: () => {
        arrayNumber.value.forEach((element, index) => {
          evaluationForm.value[index] = valores.value[element];
        });
        createEvaluationValue(evaluationForm.value);
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

<template>
  <q-page class="flex flex-center bg-blue-grey-10">
    <div class="q-ma-md container-objectives">
      <div class="row">
        <div class="text-h5 q-pa-md text-blue-grey-1">
          Evaluación del Profesor
          <q-badge
            v-show="evaluation.value"
            outline
            :text-color="colorBadge(evaluation.value)"
            rounded
            align="top"
            >{{ evaluation.value }}</q-badge
          >
          <!-- {{ idUser }} {{ admin }}  -->
        </div>
        <q-space />
        <div class="row items-center q-px-md">
          <div class="column justify-center q-pr-sm">
            <q-select
              outlined
              dense
              class="q-pa-xs q-pb-sm"
              input-style="color: #ffffffa3 "
              bg-color="green"
              popup-content-style="background-color: #37474f; color: white"
              v-model="year"
              :options="years"
            />
          </div>
          <div class="">
            <q-btn
              color="primary"
              icon="add"
              label="Evaluar"
              rounded
              @click="onAddEvaluation()"
            />
          </div>
          <div class="q-pl-sm">
            <q-btn
              :disable="!evaluation.value"
              color="primary"
              icon="picture_as_pdf"
              label=" Exportar PDF"
              rounded
              outline
              @click="onGeneratePDFEvaluation()"
            />
          </div>
        </div>
      </div>
      <ListEvaluation />
      <AddEvaluation />
    </div>
  </q-page>
</template>

<script>
import { defineComponent, defineAsyncComponent, provide, ref } from "vue";
import usePDFEvaluation from "../../User/composables/usePDFEvaluation";
import useUser from "src/Modules/User/composables/useUser";
import useArea from "src/Modules/Results Area/composables/useArea";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "UserEvaluation",

  components: {
    ListEvaluation: defineAsyncComponent(() =>
      import("../../User/Componentes/ListEvaluation.vue")
    ),
    AddEvaluation: defineAsyncComponent(() =>
      import("../../User/Componentes/AddEvaluation.vue")
    ),
  },

  setup() {
    const { generatePDFEvaluation } = usePDFEvaluation();
    const { evaluation, deleteEvaluationValue } = useUser();
    const { years, year } = useArea();
    const promptIndicatorPersonal = ref(false);
    const indicatorPersonalForm = ref({
      id: null,
      name: null,
      category: null,
    });

    const promptEvaluation = ref(false);
    const formEvaluation = ref({
      evaluation: [],
    });
    provide("promptIndicatorPersonal", promptIndicatorPersonal);
    provide("indicatorPersonalForm", indicatorPersonalForm);
    provide("promptEvaluation", promptEvaluation);
    provide("formEvaluation", formEvaluation);

    return {
      generatePDFEvaluation,
      evaluation,
      years,
      year,
      onAddEvaluation() {
        promptEvaluation.value = true;
      },
      colorBadge: (value) => {
        if (value === "Mal") {
          return "red-5";
        } else if (value === "Regular") {
          return "orange-4";
        } else if (value === "Bien") {
          return "green";
        } else if (value === "Exelente") {
          return "primary";
        }
      },
      onGeneratePDFEvaluation: () => {
        generatePDFEvaluation();
        deleteEvaluationValue();
      },
    };
  },
});
</script>
<style lang="sass" scoped>
.container-objectives
  width: 100%
  min-height: calc(100vh - (50px + 48px))
  border-radius:10px


.container-item-objectives
  border-radius:10px
  cursor: pointer
  background-color: rgba(255, 255, 255, 0.1)
</style>

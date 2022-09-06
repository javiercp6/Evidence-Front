<template>
  <q-page class="flex flex-center bg-blue-grey-10">
    <div class="q-ma-md container-objectives">
      <div class="row">
        <div class="text-h5 q-pa-md text-blue-grey-1">
          Evaluación del Profesor
          <!-- {{ idUser }} {{ admin }}  -->
        </div>
        <q-space />
        <div class="row items-center q-px-md">
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
              color="primary"
              icon="picture_as_pdf"
              label=" Exportar PDF"
              rounded
              outline
              @click="generatePDFEvaluation()"
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
      onAddEvaluation() {
        console.log("ggg");
        promptEvaluation.value = true;
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

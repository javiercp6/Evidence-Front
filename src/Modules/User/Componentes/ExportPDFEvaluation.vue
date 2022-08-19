<template>
  <div class="flex">
    <div class="text-h5 q-pa-md text-blue-grey-1">Objetivo</div>
  </div>
</template>

<script>
import { defineComponent, defineAsyncComponent, provide, ref } from "vue";
import useUser from "src/Modules/User/composables/useUser";
import { useRoute } from "vue-router";

export default defineComponent({
  name: "ExportPDFEvaluation",

  components: {
    /*    AddEvidence: defineAsyncComponent(() =>
      import("../Componentes/AddEvidence.vue")
    ), */
  },

  props: {
    /*  user: Boolean, */
  },

  setup() {
    const { getIndicatorById, indicator } = useUser();
    const route = useRoute();
    const idIndicator = ref(route.params.idIndicator);
    console.log(idIndicator);
    const prompt = ref(false);
    const evidence = ref({
      idIndicator: idIndicator.value,
      description: "",
      files: null,
    });
    provide("prompt", prompt);
    provide("evidence", evidence);
    getIndicatorById(idIndicator.value);

    return {
      prompt,
      indicator,
      dir,
    };
  },
});
</script>
<style lang="sass" scoped>
.text-h5
  padding: 5px

.container-objectives
  width: 100%
  min-height: calc(100vh - (50px + 48px))
  border-radius:10px
  padding: 16px 10px

.area-scroll
  width: 100%
  height: calc(calc(100vh - (50px + 48px)) - 64px)


.container-item-objectives
  border-radius:10px

  background-color: rgba(255, 255, 255, 0.1)
</style>

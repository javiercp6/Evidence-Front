<template>
  <q-page class="flex flex-center bg-blue-grey-10">
    <div class="q-ma-md container-objectives">
      <div class="row">
        <div class="text-h5 q-pa-md text-blue-grey-1">
          Plan Individual
          <!-- {{ idUser }} {{ admin }}  -->
        </div>
      </div>
      <ListIndicators :user="true" />
    </div>
  </q-page>
</template>

<script>
import { defineComponent, defineAsyncComponent } from "vue";

import { useRouter } from "vue-router";

export default defineComponent({
  name: "AnnualResultPlan",

  components: {
    ListIndicators: defineAsyncComponent(() =>
      import("../../User/Componentes/ListIndicators.vue")
    ),
  },

  setup() {
    const router = useRouter();

    return {
      toPlanItem(idIndicator) {
        router.push({
          name: "planitem",
          params: { idIndicator: `${idIndicator}` },
        });
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

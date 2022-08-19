<template>
  <q-page class="flex flex-center bg-blue-grey-10">
    <div
      class="q-ma-md container-objectives"
      style="background-color: rgba(255, 255, 255, 0.1)"
    >
      <EvidenceItems :user="true" />
    </div>
  </q-page>
</template>

<script>
import { defineComponent, defineAsyncComponent, provide, ref } from "vue";

export default defineComponent({
  name: "AnnualResultItems",

  components: {
    EvidenceItems: defineAsyncComponent(() =>
      import("../Componentes/EvidenceItems.vue")
    ),
  },

  setup() {},
});
</script>
<style lang="sass" scoped>
.container-objectives
  width: 100%
  min-height: calc(100vh - (50px + 48px))
  border-radius:10px
  padding: 16px 10px
</style>

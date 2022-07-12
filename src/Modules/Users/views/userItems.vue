<template>
  <q-page class="flex flex-center bg-blue-grey-10">
    <div class="q-ma-md container-objectives">
      <div class="row">
        <div class="text-h5 q-pa-md text-blue-grey-1">
          Plan Individualll
          <!-- {{ idUser }} {{ admin }}  -->
        </div>
        <FormEstablishIndicator />
        <q-space />
        <div class="row items-center q-pr-sm">
          <q-btn
            color="primary"
            label="Establecer Plan"
            rounded
            @click="promptEstablishIndicator = true"
          >
          </q-btn>
        </div>
      </div>
      <ListIndicators />
    </div>
  </q-page>
</template>

<script>
import {
  defineComponent,
  defineAsyncComponent,
  ref,
  provide,
  inject,
} from "vue";
import useUser from "src/Modules/User/composables/useUser";
import { useRouter, useRoute } from "vue-router";

export default defineComponent({
  name: "UserItems",

  components: {
    FormEstablishIndicator: defineAsyncComponent(() =>
      import("../Componentes/FormEstablishIndicator.vue")
    ),
    ListIndicators: defineAsyncComponent(() =>
      import("../../User/Componentes/ListIndicators.vue")
    ),
  },

  setup() {
    const { getIndicatorsByUser, indicators } = useUser();

    const router = useRouter();
    const route = useRoute();
    const idUser = ref(route.params.idUser);
    //const admin = ref(route.params.admin);
    //const nameUser = ref(route.params.nameUser);
    const promptEstablishIndicator = ref(false);
    provide("promptEstablishIndicator", promptEstablishIndicator);

    getIndicatorsByUser(idUser.value);

    return {
      indicators,
      idUser,
      promptEstablishIndicator,
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

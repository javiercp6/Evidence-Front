<template>
  <div class="q-pa-sm">
    <div v-if="!indicators.has" class="flex flex-center">
      <h6 class="text-blue-grey-1">No existe un plan asignado</h6>
    </div>
    <q-expansion-item
      v-else
      v-for="i in indicators.indicators"
      :key="i.category"
      dark
      dense
      style="background-color: rgba(255, 255, 255, 0.1); border-radius: 10px"
      :label="i.category"
      class="q-ma-sm"
    >
      <div
        v-for="indicator in i.indicators"
        :key="indicator._id"
        class="row q-ma-sm container-item-objectives"
      >
        <div
          @click="toPlanItem(indicator._id)"
          class="col text-blue-grey-1 q-ma-sm"
          @mouseover="showEditObj = true"
          @mouseleave="showEditObj = false"
        >
          <q-icon
            size="sm"
            :name="indicator.status ? 'check_circle' : 'circle'"
            :color="indicator.status ? 'green' : ''"
          />
          {{ indicator.name }}
        </div>
        <q-space />
        <div v-if="role === 'ROLE_CHIEF'" class="column q-ml-sm justify-center">
          <q-icon
            class="q-px-xs cursor-pointer"
            name="highlight_off"
            size="sm"
            color="red"
            @click="onDeleteIndicatorFromUser(indicator._id)"
          />
          <q-tooltip>Eliminar Indicador</q-tooltip>
        </div>
      </div>
    </q-expansion-item>
    <FormDeleteIndicator />
  </div>
</template>

<script>
import { defineComponent, defineAsyncComponent, ref, provide } from "vue";
import useUser from "src/Modules/User/composables/useUser";
import useAuth from "src/Modules/auth/composables/useAuth";
import { useRouter, useRoute } from "vue-router";

export default defineComponent({
  name: "ListIndicators",
  props: {
    user: Boolean,
  },

  components: {
    FormDeleteIndicator: defineAsyncComponent(() =>
      import("../Componentes/FormDeleteIndicator.vue")
    ),
  },

  setup(props) {
    const { getIndicatorsByUser, deleteIndicatorFromUser, indicators } =
      useUser();
    const { uid, role } = useAuth();

    const router = useRouter();
    const route = useRoute();
    const idUser = ref(route.params.idUser);
    const promptDeleteIndicator = ref(false);
    const idIndicator = ref(null);
    if (props.user) {
      getIndicatorsByUser(uid.value);
    } else {
      getIndicatorsByUser(idUser.value);
    }

    provide("promptDeleteIndicator", promptDeleteIndicator);
    provide("idIndicator", idIndicator);
    provide("idUser", idUser);

    return {
      indicators,
      role,
      toPlanItem(idIndicator) {
        if (props.user) {
          router.push({
            name: "planitem",
            params: { idIndicator: `${idIndicator}` },
          });
        } else {
          router.push({
            name: "userIndicator",
            params: { idIndicator: `${idIndicator}` },
          });
        }
      },
      onDeleteIndicatorFromUser(idInd) {
        promptDeleteIndicator.value = true;
        idIndicator.value = idInd;
      },
    };
  },
});
</script>
<style lang="sass" scoped>


.container-item-objectives
  border-radius:10px
  cursor: pointer
  background-color: rgba(255, 255, 255, 0.1)
</style>

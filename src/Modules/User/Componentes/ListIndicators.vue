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
        @click="toPlanItem(indicator._id)"
      >
        <div class="col text-blue-grey-1 q-ma-sm">
          <q-icon
            size="sm"
            :name="indicator.status ? 'check_circle' : 'circle'"
            :color="indicator.status ? 'green' : ''"
          />
          {{ indicator.name }}
        </div>
      </div>
    </q-expansion-item>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";
import useUser from "src/Modules/User/composables/useUser";
import useAuth from "src/Modules/auth/composables/useAuth";
import { useRouter, useRoute } from "vue-router";

export default defineComponent({
  name: "ListIndicators",
  props: {
    user: Boolean,
  },

  setup(props) {
    const { getIndicatorsByUser, indicators } = useUser();
    const { uid } = useAuth();

    const router = useRouter();
    const route = useRoute();
    const idUser = ref(route.params.idUser);

    if (props.user) {
      getIndicatorsByUser(uid.value);
      console.log("se manda");
    } else {
      getIndicatorsByUser(idUser.value);
      console.log("no se manda");
    }

    return {
      indicators,

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

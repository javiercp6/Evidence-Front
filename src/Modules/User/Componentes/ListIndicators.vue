<template>
  <div class="q-pa-sm">
    <q-expansion-item
      v-for="i in indicators.indicators"
      :key="i.category"
      expand-icon-toggle
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
          <!-- <q-icon
            size="sm"
            :name="{indicator.status === 'Cumplido' ? 'check_circle' || indicator.status === 'Cumplido' ? '' : 'radio_button_unchecked'}"
            :color="indicator.status ? 'green' : ''"
          /> -->
          {{ indicator.name }}
        </div>
      </div>
    </q-expansion-item>
  </div>
</template>

<script>
import { defineComponent, ref, provide, inject } from "vue";
import useUser from "src/Modules/User/composables/useUser";
import { useRouter, useRoute } from "vue-router";

export default defineComponent({
  name: "ListIndicators",

  setup() {
    const { getIndicatorsByUser, indicators } = useUser();

    const router = useRouter();
    const route = useRoute();
    const idUser = ref(route.params.idUser);
    //const admin = ref(route.params.admin);
    const nameUser = ref(route.params.nameUser);

    getIndicatorsByUser(idUser.value);

    return {
      indicators,
      idUser,
      nameUser,
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

<template>
  <q-page class="flex flex-center bg-blue-grey-10">
    <div class="q-ma-md container-objectives">
      <div class="row">
        <div class="text-h5 q-pa-md text-blue-grey-1">
          Plan general de indicadores
        </div>
        <q-space />
        <div class="column justify-center">
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
      </div>

      <div class="q-pa-sm">
        <q-expansion-item
          v-for="i in indicatorsModel"
          :key="i.category"
          dark
          dense
          style="
            background-color: rgba(255, 255, 255, 0.1);
            border-radius: 10px;
          "
          :label="i.category"
          class="q-ma-sm"
        >
          <div
            v-for="indicator in i.indicators"
            :key="indicator._id"
            class="row q-ma-sm container-item-objectives"
          >
            <div class="col text-blue-grey-1 q-ma-sm">
              {{ indicator.name }}
            </div>
          </div>
        </q-expansion-item>
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, defineAsyncComponent, watch } from "vue";
import useUser from "src/Modules/User/composables/useUser";
import useArea from "../composables/useArea";
import { useRouter, useRoute } from "vue-router";

export default defineComponent({
  name: "IndicatorBoss",

  setup() {
    //const { indicators } = useUser();
    const {
      getIndicatorsModel,
      getYear,
      getYears,
      indicatorsModel,
      years,
      year,
    } = useArea();

    const router = useRouter();

    const start = async () => {
      await getYear(), await getYears();
      getIndicatorsModel(year.value);
    };
    start();

    watch(year, (newValue) => {
      getIndicatorsModel(newValue);
      console.log(newValue, "fff");
    });

    return {
      indicatorsModel,
      years,
      year,
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

.container-item-objectives
  border-radius:10px
  cursor: pointer
  background-color: rgba(255, 255, 255, 0.1)
</style>

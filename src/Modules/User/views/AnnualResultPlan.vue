<template>
  <q-page class="flex flex-center bg-blue-grey-10">
    <div class="q-ma-md container-objectives">
      <div class="text-h5 q-pa-md text-blue-grey-1">Plan</div>

      <div
        v-for="indicator in indicators"
        :key="indicator._id"
        @click="toPlanItem(indicator._id)"
        class="row q-ma-sm container-item-objectives"
      >
        <div class="text-blue-grey-1 column q-ml-sm justify-center">
          <!-- <q-circular-progress
            show-value
            font-size="12px"
            :value="value"
            size="50px"
            :thickness="0.22"
            color="teal"
            track-color="grey-3"
            class="q-ma-sm"
          >
            {{ value }}%
          </q-circular-progress> -->

          <q-icon size="sm" name="radio_button_unchecked" />
        </div>
        <div class="col text-blue-grey-1 objectives q-ma-sm">
          {{ indicator.name }}
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, defineAsyncComponent } from "vue";
import useUser from "src/Modules/User/composables/useUser";
import { useRouter, useRoute } from "vue-router";

export default defineComponent({
  name: "AnnualResultPlan",

  setup() {
    const { getIndicators, indicators } = useUser();

    const router = useRouter();

    getIndicators();

    return {
      value: 80,
      indicators,
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

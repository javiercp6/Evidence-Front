<template>
  <q-dialog v-model="promptEstablishIndicator" persistent>
    <q-card
      class="bg-blue-grey-10 card-evidencia"
      :style="$q.screen.gt.sm ? 'min-width: 850px' : 'min-width: 100%'"
    >
      <q-form @submit.prevent="onSubmitEstabilishIndicator">
        <q-card style="background-color: rgba(255, 255, 255, 0.1)">
          <q-card-section class="row">
            <div class="text-h6 text-blue-grey-1">Establecer Plan</div>
            <q-space />
            <div class="column justify-center">
              <q-select
                outlined
                dense
                input-style="color: #ffffffa3 "
                bg-color="green"
                popup-content-style="background-color: #37474f; color: white"
                v-model="year"
                :options="years"
              />
            </div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            <div class="">
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
                  class="q-px-sm"
                >
                  <q-checkbox
                    class="q-pa-xs text-white"
                    dark
                    dense
                    v-model="indicatorSelected"
                    :val="indicator._id"
                    :label="indicator.name"
                  />
                </div>
              </q-expansion-item>
            </div>
          </q-card-section>

          <q-card-actions align="right" class="text-primary q-pa-md">
            <q-btn
              flat
              rounded
              label="Cancelar"
              v-close-popup
              @click="getIndicatorsModel()"
            />
            <q-btn
              color="primary"
              rounded
              label="Guardar"
              v-close-popup
              type="submit"
            />
          </q-card-actions>
        </q-card>
      </q-form>
    </q-card>
  </q-dialog>
</template>

<script>
import { defineComponent, inject, ref, watch } from "vue";
import { useQuasar } from "quasar";
//import useAuth from "../composables/useAuth";
import useArea from "../../Results Area/composables/useArea";
import useUser from "src/Modules/User/composables/useUser";
import { useRouter, useRoute } from "vue-router";
export default defineComponent({
  name: "FormArea",
  setup() {
    const {
      getIndicatorsModel,
      removeIndicatorModel,
      indicatorsModel,
      year,
      years,
    } = useArea();
    const { estabilishIndicator } = useUser();
    const $q = useQuasar();
    const route = useRoute();
    const idUser = ref(route.params.idUser);
    const promptEstablishIndicator = inject("promptEstablishIndicator");
    const indicatorSelected = ref([]);

    getIndicatorsModel();

    watch(year, (newValue) => {
      getIndicatorsModel();
      console.log(newValue, "fff");
    });

    return {
      indicatorsModel,
      idUser,
      promptEstablishIndicator,
      indicatorSelected,
      year,
      years,
      onSubmitEstabilishIndicator: async () => {
        const { ok, message } = await estabilishIndicator(
          indicatorSelected.value,
          idUser.value,
          years.value.at(-1)
        );
        if (!ok)
          $q.notify({
            message,
            color: "negative",
          });
        if (ok) {
          $q.notify({
            message: "Plan Establecido",
            color: "positive",
          });
        }
        indicatorSelected.value = [];
      },
      removeIndicatorModel,
      getIndicatorsModel,
    };
  },
});
</script>

<style lang="sass" scoped>
.card-evidencia
  border-radius: 10px

.q-field__control
  background: yellow !important

.input-textarea
  color: #ffffffa3
</style>

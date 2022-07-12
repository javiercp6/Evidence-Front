<template>
  <q-dialog v-model="promptEstablishIndicator" persistent>
    <q-card
      class="bg-blue-grey-10 card-evidencia"
      :style="$q.screen.gt.sm ? 'min-width: 850px' : 'min-width: 100%'"
    >
      <q-form @submit.prevent="onSubmitEstabilishIndicator">
        <q-card-section style="background-color: rgba(255, 255, 255, 0.1)">
          <div class="text-h6 text-blue-grey-1">
            Establecer Plan {{ idUser }}
          </div>
        </q-card-section>

        <q-card-section
          class="q-pt-none"
          style="background-color: rgba(255, 255, 255, 0.1)"
        >
          <div class="q-pa-sm">
            <q-expansion-item
              v-for="i in indicatorsModel"
              :key="i.category"
              expand-icon-toggle
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
                <div class="col text-blue-grey-1 q-ma-sm q-pl-sm">
                  {{ indicator.name }}

                  <q-icon
                    class="q-px-sm cursor-pointer"
                    name="closet"
                    size="xs"
                    color="red"
                    @click="removeIndicatorModel(indicator._id)"
                  />
                </div>
              </div>
            </q-expansion-item>
          </div>
        </q-card-section>

        <q-card-actions
          align="right"
          class="text-primary q-pa-md"
          style="background-color: rgba(255, 255, 255, 0.1)"
        >
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
      </q-form>
    </q-card>
  </q-dialog>
</template>

<script>
import { defineComponent, inject, ref } from "vue";
import { useQuasar } from "quasar";
//import useAuth from "../composables/useAuth";
import useArea from "../../Results Area/composables/useArea";
import { useRouter, useRoute } from "vue-router";
export default defineComponent({
  name: "FormArea",
  setup() {
    const {
      getIndicatorsModel,
      removeIndicatorModel,
      estabilishIndicator,
      indicatorsModel,
    } = useArea();
    const $q = useQuasar();
    const route = useRoute();
    const idUser = ref(route.params.idUser);
    const promptEstablishIndicator = inject("promptEstablishIndicator");

    getIndicatorsModel();
    return {
      indicatorsModel,
      idUser,
      promptEstablishIndicator,
      onSubmitEstabilishIndicator: async () => {
        console.log("Editar");
        const { ok, message } = await estabilishIndicator(
          indicatorsModel.value,
          idUser.value
        );
        if (!ok)
          $q.notify({
            message,
            color: "negative",
          });
        if (ok) {
          $q.notify({
            message,
            color: "positive",
          });
        }
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

<template>
  <q-dialog v-model="promtDeleteYear" persistent>
    <q-card
      class="bg-blue-grey-10 card-evidencia"
      :style="$q.screen.gt.sm ? 'min-width: 850px' : 'min-width: 100%'"
    >
      <q-form @submit.prevent="onSubmitDeleteYear">
        <q-card-section style="background-color: rgba(255, 255, 255, 0.1)">
          <div class="text-h6 text-blue-grey-1">
            Estas seguro que deseas eliminar este año
          </div>
        </q-card-section>

        <q-card-actions
          align="right"
          class="text-primary q-pa-md"
          style="background-color: rgba(255, 255, 255, 0.1)"
        >
          <q-btn flat rounded label="Cancelar" v-close-popup @click="reset" />
          <q-btn color="primary" rounded label="Aceptar" type="submit" />
        </q-card-actions>
      </q-form>
    </q-card>
  </q-dialog>
</template>

<script>
import { defineComponent, inject, ref } from "vue";
import { useQuasar } from "quasar";
//import useAuth from "../composables/useAuth";
import useArea from "../composables/useArea";
import { api } from "boot/axios";

export default defineComponent({
  name: "FormYear",
  setup() {
    const { getArea, getYears, getYear } = useArea();
    const $q = useQuasar();
    const promtDeleteYear = inject("promtDeleteYear");
    const year = inject("year");

    const reset = () => {
      promtDeleteYear.value = false;
    };

    return {
      promtDeleteYear,
      reset,

      onSubmitDeleteYear: async () => {
        try {
          const { data } = await api.delete(`/years/remove?year=${year.value}`);
          await getYear(true), await getYears();
          console.log(data);
          getArea(yearForm.value.year);
          console.log("borró añño");
        } catch (error) {}

        reset();
      },
    };
  },
});
</script>

<style lang="sass" scoped>
.card-evidencia
  border-radius: 10px
</style>

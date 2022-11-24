<template>
  <q-dialog v-model="promtYear" persistent>
    <q-card
      class="bg-blue-grey-10 card-evidencia"
      :style="$q.screen.gt.sm ? 'min-width: 850px' : 'min-width: 100%'"
    >
      <q-form @submit.prevent="onSubmitYear">
        <q-card-section style="background-color: rgba(255, 255, 255, 0.1)">
          <div class="text-h6 text-blue-grey-1">Añadir un nuevo año</div>
        </q-card-section>

        <q-card-section
          class="q-pt-none"
          style="background-color: rgba(255, 255, 255, 0.1)"
        >
          <q-input
            autofocus
            outlined
            mask="####"
            dense
            class="q-pa-xs"
            input-style=" color: #ffffffa3 "
            :rules="[
              (val) => (val && val.length > 0) || 'Este campo es obligatorio',
              (val) => (val && val > 2001) || 'El año debe ser mayor que 2001',
            ]"
            label="Año"
            v-model="yearForm.year"
          />
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
    const promtYear = inject("promtYear");
    const yearForm = ref({
      year: new Date(Date.now()).getFullYear(),
    });

    const reset = () => {
      promtYear.value = false;
    };

    return {
      yearForm,
      promtYear,

      reset,

      onSubmitYear: async () => {
        //Hacerlo todo aqui mismo
        /* if (editFormArea.value) {
          const { ok, message } = await editArea(areaForm.value);

          if (!ok)
            $q.notify({
              message,
              color: "negative",
            });
          if (ok) {
            $q.notify({
              message: "Área Modificada",
              color: "positive",
            });
          }
        } else {
          const { ok, message } = await createArea(areaForm.value, year.value);

          if (!ok)
            $q.notify({
              message,
              color: "negative",
            });
          if (ok) {
            $q.notify({
              message: "Área Creada",
              color: "positive",
            });
          }
        } */

        try {
          const { data } = await api.post(`/years/new`, yearForm.value);
          await getYear(true), await getYears();
          console.log(data);
          getArea(yearForm.value.year);
          console.log("creó añño");
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

<template>
  <q-dialog v-model="DepartamentPromt" persistent>
    <q-card
      class="bg-blue-grey-10 card-evidencia"
      :style="$q.screen.gt.sm ? 'min-width: 850px' : 'min-width: 100%'"
    >
      <q-form @submit.prevent="onSubmitYear">
        <q-card-section style="background-color: rgba(255, 255, 255, 0.1)">
          <div class="text-h6 text-blue-grey-1">Añadir un nuevo año</div>
        </q-card-section>

        <q-card-section
          class="q-pt-none row"
          style="background-color: rgba(255, 255, 255, 0.1)"
        >
          <div class="col-11">
            <q-input
              autofocus
              outlined
              dense
              class="q-pa-xs"
              input-style=" color: #ffffffa3 "
              :rules="[
                (val) => (val && val.length > 0) || 'Este campo es obligatorio',
              ]"
              label="Año"
              v-model="departamentForm.department"
            />
          </div>
          <div class="col-1 row justify-center items-center">
            <div>
              <q-btn round color="primary" icon="add" type="submit" />
            </div>
          </div>
        </q-card-section>
        <q-card-section style="background-color: rgba(255, 255, 255, 0.1)">
          <div v-for="departament in departaments" :key="departament">
            <div class="col text-blue-grey-1 q-ma-sm flex-b">
              {{ departament }}
              <q-icon
                class="q-px-xs cursor-pointer"
                name="delete"
                size="xs"
                color="red-5"
                @click="deleteDepartament(departament)"
              />
            </div>
          </div>
        </q-card-section>

        <q-card-actions
          align="right"
          class="text-primary q-pa-md"
          style="background-color: rgba(255, 255, 255, 0.1)"
        >
          <q-btn flat rounded label="Cancelar" v-close-popup @click="reset" />
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
    const {
      departaments,
      getDepartaments,
      createDepartament,
      deleteDepartament,
    } = useArea();
    const $q = useQuasar();
    const DepartamentPromt = inject("DepartamentPromt");

    const departamentForm = ref({
      department: "",
    });

    const reset = () => {
      DepartamentPromt.value = false;
    };

    getDepartaments();

    return {
      DepartamentPromt,
      departamentForm,
      departaments,
      deleteDepartament,
      reset,

      onSubmitYear: async () => {
        /*  try {
          const { data } = await api.post(`/years/new`, yearForm.value);
          await getYear(true), await getYears();
          console.log(data);
          getArea(yearForm.value.year);
          console.log("creó añño");
        } catch (error) {} */
        createDepartament(departamentForm.value);
        departamentForm.value.department = "";
      },
    };
  },
});
</script>

<style lang="sass" scoped>
.card-evidencia
  border-radius: 10px
</style>

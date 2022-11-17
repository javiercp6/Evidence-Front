<template>
  <q-page padding class="row items-center bg-blue-grey-10">
    <FormArea />
    <FormDeleteArea />
    <FormYear />
    <DeleteYear />
    <div class="row self-start justify-center q-ma-sm" style="width: 100%">
      <div class="column justify-center">
        <q-btn
          v-if="role === 'ROLE_ADMIN'"
          color="primary"
          icon="add"
          label="Adicionar Área"
          rounded
          @click="addAreaPrompt()"
        />
      </div>
      <q-space />

      <div class="column justify-center q-pr-md">
        <q-btn
          v-if="role === 'ROLE_ADMIN'"
          color="primary"
          outline
          icon="add"
          label="Añadir Año"
          rounded
          @click="addYearPromt()"
        />
      </div>
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
      <div class="column justify-center">
        <q-btn color="blue-grey-1" round flat icon="more_vert">
          <q-menu auto-close>
            <q-list>
              <q-item clickable v-ripple @click="addYearPromt()">
                <q-item-section avatar
                  ><q-icon color="primary" name="add"
                /></q-item-section>
                <q-item-section>Añadir año</q-item-section>
              </q-item>
              <q-item clickable v-ripple @click="deleteYearPromt()">
                <q-item-section avatar
                  ><q-icon color="red-5" name="delete"
                /></q-item-section>
                <q-item-section>Eliminar año</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>
      </div>
    </div>

    <div
      class="fit row wrap justify-evenly items-start content-start q-ma-md container-objectives"
    >
      <q-card class="my-card q-mx-sm" v-for="area in areas" :key="area._id">
        <q-card-section style="min-height: 142px">
          <div class="row justify-end" style="height: 30px">
            <div class="doc-card-title text-blue-grey-2 column justify-center">
              <q-circular-progress
                font-size="12px"
                :value="area.percentage"
                size="20px"
                :thickness="0.22"
                color="teal"
                track-color="grey-3"
                class="q-ma-sm"
              >
              </q-circular-progress>
              {{ area.percentage }}%
            </div>
            <q-space />
            <q-btn color="blue-grey-1" round flat icon="more_vert">
              <q-menu auto-close>
                <q-list>
                  <q-item clickable v-ripple @click="editAreaPrompt(area)">
                    <q-item-section avatar
                      ><q-icon color="orange-4" name="edit"
                    /></q-item-section>
                    <q-item-section>Modificar</q-item-section>
                  </q-item>
                  <q-item clickable v-ripple @click="deleteAreaPromt(area)">
                    <q-item-section avatar
                      ><q-icon color="red-5" name="delete"
                    /></q-item-section>
                    <q-item-section>Eliminar</q-item-section>
                  </q-item>
                </q-list>
              </q-menu>
            </q-btn>
          </div>
          <div class="row justify-center" style="height: 0px">
            <!-- <q-btn
              fab
              color="primary"
              icon="place"
              class=""
              style="transform: translateY(-80%)"
            /> biotech people -->
            <q-icon
              name="school"
              size="100px"
              color="blue-grey-2"
              style="transform: translateY(-100%)"
            />
          </div>

          <div class="row no-wrap items-center">
            <div class="col text-h6 text-blue-grey-1 q-mt-md">
              {{ area.name }}
            </div>
          </div>
        </q-card-section>

        <q-card-section class="q-pt-none" style="min-height: 124px">
          <div class="text-subtitle1 text-blue-grey-1">Objetivos</div>
          <div
            v-for="objective in area.objectives"
            :key="objective"
            class="text-caption text-grey ellipsis"
          >
            {{ objective }}
          </div>
        </q-card-section>

        <q-separator />

        <q-card-actions align="right">
          <router-link
            style="text-decoration: none"
            :to="{ name: 'areaitems', params: { idArea: `${area._id}` } }"
          >
            <q-btn flat rounded size="md" color="primary"> Ver más </q-btn>
          </router-link>
        </q-card-actions>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import {
  defineComponent,
  defineAsyncComponent,
  ref,
  provide,
  inject,
  watch,
} from "vue";
import { useQuasar } from "quasar";
import useArea from "../composables/useArea";
import useAuth from "src/Modules/auth/composables/useAuth";

export default defineComponent({
  name: "ResultsAreaIndex",

  components: {
    FormArea: defineAsyncComponent(() => import("../Componentes/FormArea.vue")),
    FormDeleteArea: defineAsyncComponent(() =>
      import("../Componentes/FormDeleteArea.vue")
    ),
    FormYear: defineAsyncComponent(() => import("../Componentes/FormYear.vue")),
    DeleteYear: defineAsyncComponent(() =>
      import("../Componentes/DeleteYear.vue")
    ),
  },

  setup() {
    const { getArea, deleteArea, getYears, getYear, areas, years, year } =
      useArea();
    const { role } = useAuth();
    const $q = useQuasar();
    const promptArea = ref(false);
    const promptDeleteArea = ref(false);
    const editFormArea = ref(false);
    const yearLocal = inject("year");
    const promtYear = ref(false);
    const promtDeleteYear = ref(false);

    const areaForm = ref({
      id: "",
      name: "",
      objectives: [""],
    });
    provide("promptArea", promptArea);
    provide("promptDeleteArea", promptDeleteArea);
    provide("editFormArea", editFormArea);
    provide("promtYear", promtYear);
    provide("promtDeleteYear", promtDeleteYear);

    provide("areaForm", areaForm);

    const start = async () => {
      await getYear(), await getYears();
      getArea(year.value);
    };
    start();

    //console.log(yearLocal, "fff");
    watch(year, (newValue) => {
      getArea(newValue);
      console.log(newValue, "fff");
    });

    return {
      role,
      areas,
      promptArea,
      promptDeleteArea,
      areaForm,
      year,
      years,
      addAreaPrompt() {
        areaForm.value.id = "";
        areaForm.value.name = "";
        areaForm.value.objectives = [""];
        editFormArea.value = false;
        promptArea.value = true;
      },
      addYearPromt() {
        promtYear.value = true;
      },
      deleteYearPromt() {
        promtDeleteYear.value = true;
      },
      editAreaPrompt(areaitems) {
        areaForm.value.id = areaitems._id;
        areaForm.value.name = areaitems.name;
        promptArea.value = true;
        editFormArea.value = true;
      },
      deleteAreaPromt(areaitems) {
        areaForm.value.id = areaitems._id;
        promptDeleteArea.value = true;
      },
    };
  },
});
</script>
<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 300px
  background-color: rgba(255, 255, 255, 0.1)
  border-radius: 10px
  margin-top: 70px

.doc-card-title
  margin-left: -24px
  padding: 2px 10px 2px 10px
  background: #e0e0e0
  color: #616161
  position: relative
  border-radius: 3px 5px 5px 0
  background-color: rgb(0 0 0 / 23%)
  height: 30px
  width: 80px

.doc-card-title:after
  content: ""
  position: absolute
  top: 100%
  left: 0
  width: 0
  height: 0
  border: 0 solid transparent
  border-top-color: #bebebe
  border-top-color: rgb(0 0 0 / 54%)
  border-width: 9px 0 0 8px
</style>

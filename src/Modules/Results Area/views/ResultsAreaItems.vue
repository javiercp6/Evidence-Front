<template>
  <q-page class="flex flex-center bg-blue-grey-10">
    <div
      class="q-ma-md container-objectives"
      style="background-color: rgba(255, 255, 255, 0.06)"
    >
      <FormCriterion />
      <FormObjective />
      <FormDeleteObjective />
      <FormIndicator />
      <FormEditObjective />
      <FormDeleteCriterion />
      <FormDeleteIndicator />
      <div class="row">
        <div class="text-h5 text-blue-grey-1">{{ area.name }}</div>
        <q-space />
        <div v-if="role !== 'ROLE_CHIEFA'" class="col-auto">
          <q-btn color="blue-grey-1" round flat icon="more_vert">
            <q-menu auto-close>
              <q-list>
                <q-item clickable v-ripple @click="onCreateObjective()">
                  <q-item-section avatar
                    ><q-icon color="primary" name="add"
                  /></q-item-section>
                  <q-item-section>Añadir Objetivos</q-item-section>
                </q-item>
                <q-item clickable v-ripple @click="generatePDFEvaluationArea()">
                  <q-item-section avatar
                    ><q-icon color="primary" name="picture_as_pdf"
                  /></q-item-section>
                  <q-item-section>Exportar PDF</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>
        </div>
      </div>

      <div
        v-for="objective in area.objectives"
        :key="objective._id"
        class="q-pa-sm q-ma-sm container-item-objectives"
      >
        <div class="row q-pt-sm">
          <div class="text-h6 text-blue-grey-1 d-block">Objetivo</div>
          <q-space />
          <div v-if="role !== 'ROLE_CHIEFA'" class="col-auto">
            <q-btn color="blue-grey-1" round flat icon="more_vert">
              <q-menu auto-close>
                <q-list>
                  <q-item
                    clickable
                    v-ripple
                    @click="(prompt = true), onCreateCriterion(objective._id)"
                  >
                    <q-item-section avatar
                      ><q-icon color="primary" name="add"
                    /></q-item-section>
                    <q-item-section>Añadir Criterios de medida</q-item-section>
                  </q-item>
                  <q-item
                    clickable
                    v-ripple
                    @click="deleteObjectivePromt(objective)"
                  >
                    <q-item-section avatar
                      ><q-icon color="red-5" name="delete"
                    /></q-item-section>
                    <q-item-section>Eliminar Objetivo</q-item-section>
                  </q-item>
                </q-list>
              </q-menu>
            </q-btn>
          </div>
        </div>
        <div class="q-ma-sm">
          <div
            class="col text-blue-grey-1 q-ma-sm flex-b"
            @mouseover="showEditObj = true"
            @mouseleave="showEditObj = false"
          >
            {{ objective.name }}

            <q-icon
              v-show="showEditObj && role !== 'ROLE_CHIEFA'"
              class="q-px-xs cursor-pointer"
              name="edit"
              size="xs"
              color="orange-4"
              @click="onEditObjective(objective)"
            />

            <q-icon
              v-show="showEditObj && role !== 'ROLE_CHIEFA'"
              class="q-px-xs cursor-pointer"
              name="delete"
              size="xs"
              color="red-5"
              @click="deleteObjectivePromt(objective)"
            />
          </div>
        </div>
        <div class="row inline q-pt-sm">
          <div class="text-h6 text-blue-grey-1 d-block">Criterio de medida</div>
        </div>
        <div
          v-if="objective.criterions.length === 0"
          class="text-white q-pa-md"
        >
          No existen Criterios de medida
        </div>
        <div
          v-for="criterion in objective.criterions"
          :key="criterion._id"
          class="q-ma-sm"
        >
          <div
            class="col text-blue-grey-1 q-ma-sm"
            @mouseover="showEditCrit = true"
            @mouseleave="showEditCrit = false"
          >
            <q-expansion-item
              expand-icon-toggle
              expand-separator
              dark
              dense
              style="
                background-color: rgba(255, 255, 255, 0.06);
                border-radius: 10px;
              "
              class="q-py-xs"
            >
              <template v-slot:header>
                <q-item-section>
                  <div class="row">
                    <div class="q-pr-sm">
                      <q-icon
                        :name="nameIconStatus(criterion.status)"
                        :color="colorIconStatus(criterion.status)"
                        size="sm"
                      />
                      <q-tooltip anchor="top left">{{
                        criterion.status
                      }}</q-tooltip>
                    </div>
                    <div class="col">
                      {{ criterion.name }}

                      <q-icon
                        v-show="showEditCrit && role !== 'ROLE_CHIEFA'"
                        class="q-px-xs cursor-pointer"
                        name="edit"
                        size="xs"
                        color="orange-4"
                        @click="onEditCriterion(objective._id, criterion)"
                      />
                      <q-icon
                        v-show="showEditCrit && role !== 'ROLE_CHIEFA'"
                        class="q-px-xs cursor-pointer"
                        name="delete"
                        size="xs"
                        color="red-5"
                        @click="onDeleteCriterion(objective._id, criterion._id)"
                      />
                    </div></div
                ></q-item-section>
              </template>
              <div>
                <div class="q-pa-xs q-px-lg">
                  <div class="row">
                    <div class="text-h6 text-white d-block">Indicador</div>
                    <div
                      v-if="!criterion.indicator"
                      class="column q-ml-sm justify-center"
                    >
                      <q-btn
                        round
                        icon="add"
                        color="primary"
                        size="xs"
                        @click="onpromptIndicator(criterion._id)"
                      />
                    </div>
                  </div>
                  <div v-if="criterion.indicator" class="q-pl-xs">
                    <!-- <q-icon name="circle" size="xs" color="primary" /> -->
                    {{ criterion.indicator.name }}

                    <q-icon
                      v-show="showEditCrit && role !== 'ROLE_CHIEFA'"
                      class="q-px-xs cursor-pointer"
                      name="edit"
                      size="xs"
                      color="orange-4"
                      @click="onEditIndicator(criterion.indicator)"
                    />
                    <q-icon
                      v-show="showEditCrit && role !== 'ROLE_CHIEFA'"
                      class="q-px-xs cursor-pointer"
                      name="delete"
                      size="xs"
                      color="red-5"
                      @click="onDeleteIndicator(criterion.indicator._id)"
                    />
                  </div>
                  <div v-else>No existe un indicador</div>
                </div>
              </div>
              <!-- <q-btn
              round
              flat
              icon="edit"
              color="orange-4"
              size="sm"
              @click="addInputObjetives()"
            /> -->

              <!-- <div>
            <ul>
              <li>
                Los profesores de cada brigada participan en la elaboración y
                cumplimiento de las estrategias educativas y se evalúan en las
                reuniones de brigada cada dos meses el estado de la
                implementación de la estrategia educativa
              </li>
              <li>
                Profesores del departamento participan en las actividades de la
                cátedra honorífica del “Pensamiento Bolivariano”.
              </li>
              <li>
                Los profesores, especialistas y trabajadores participan con
                compromiso revolucionario en todas las tareas a las cuales son
                convocados.
              </li>
            </ul>
          </div> -->
            </q-expansion-item>
          </div>
        </div>
      </div>
      <!-- <div
        v-for="n in 3"
        :key="n"
        class="row q-ma-sm container-item-objectives"
      >
        <div
          class="text-blue-grey-1 q-pa-sm row items-center justify-center text-center"
        >
          <div class="">
            <q-icon name="attach_file" size="md" />
            <div class="text-caption">1 archivo</div>
          </div>
        </div>
        <div class="col text-blue-grey-1 objectives q-ma-sm">
          Participar en al menos dos espacios de diálogo y debate (1 en el
          edificio docente y 1 en la residencia estudiantil) con los
          estudiantes, demostrando su formación integral y preparación
          política-ideológica
        </div>
        <div>
          <div class="col-auto">
            <q-btn color="blue-grey-1" round flat icon="more_vert">
              <q-menu auto-close>
                <q-list>
                  <q-item clickable v-ripple>
                    <q-item-section avatar
                      ><q-icon color="orange-4" name="edit"
                    /></q-item-section>
                    <q-item-section>Editar</q-item-section>
                  </q-item>
                  <q-item clickable v-ripple>
                    <q-item-section avatar
                      ><q-icon color="red-5" name="delete"
                    /></q-item-section>
                    <q-item-section>Eliminar</q-item-section>
                  </q-item>
                </q-list>
              </q-menu>
            </q-btn>
          </div>
        </div>
      </div> -->
    </div>
  </q-page>
</template>

<script>
import {
  defineComponent,
  defineAsyncComponent,
  provide,
  ref,
  computed,
} from "vue";
import usePDFEvaluationArea from "../composables/usePDFEvaluationArea";
import useArea from "../composables/useArea";
import useAuth from "src/Modules/auth/composables/useAuth";
import { useRouter, useRoute } from "vue-router";

export default defineComponent({
  name: "ResultAreaItems",

  components: {
    FormCriterion: defineAsyncComponent(() =>
      import("../Componentes/FormCriterion.vue")
    ),
    FormObjective: defineAsyncComponent(() =>
      import("../Componentes/FormObjective.vue")
    ),
    FormEditObjective: defineAsyncComponent(() =>
      import("../Componentes/FormEditObjective.vue")
    ),
    FormDeleteObjective: defineAsyncComponent(() =>
      import("../Componentes/FormDeleteObjective.vue")
    ),
    FormIndicator: defineAsyncComponent(() =>
      import("../Componentes/FormIndicator.vue")
    ),
    FormDeleteCriterion: defineAsyncComponent(() =>
      import("../Componentes/FormDeleteCriterion.vue")
    ),
    FormDeleteIndicator: defineAsyncComponent(() =>
      import("../Componentes/FormDeleteIndicator.vue")
    ),
  },

  props: {
    idArea: {
      required: true,
    },
  },

  setup() {
    const { getAreaById, area } = useArea();
    const { role } = useAuth();
    const { generatePDFEvaluationArea } = usePDFEvaluationArea();
    const route = useRoute();
    const prompt = ref(false);
    const showEditObj = ref(false);
    const showEditCrit = ref(false);
    const promptObjective = ref(false);
    const promptEditObjective = ref(false);
    const promptDeleteObjective = ref(false);
    const promptCriterion = ref(false);
    const promptDeleteCriterion = ref(false);
    const promptIndicator = ref(false);
    const editFormIndicator = ref(false);
    const promptDeleteIndicator = ref(false);
    const editFormCriterion = ref(false);
    const idArea = ref(route.params.idArea);
    const objectiveForm = ref({
      id: "",
      idArea,
      name: "",
      criterions: [""],
    });
    const criterionForm = ref({
      id: null,
      idObjective: null,
      name: "",
      todo: null,
    });
    const indicatorForm = ref({
      id: null,
      name: "",
      category: "TRABAJO DOCENTE-EDUCATIVO EN PREGRADO Y POSGRADO",
      idCriterion: "",
    });
    provide("prompt", prompt);
    provide("criterionForm", criterionForm);
    provide("editFormCriterion", editFormCriterion);
    provide("objectiveForm", objectiveForm);
    provide("indicatorForm", indicatorForm);
    provide("promptObjective", promptObjective);
    provide("promptEditObjective", promptEditObjective);
    provide("promptDeleteObjective", promptDeleteObjective);
    provide("promptCriterion", promptCriterion);
    provide("promptDeleteCriterion", promptDeleteCriterion);
    provide("promptIndicator", promptIndicator);
    provide("promptDeleteIndicator", promptDeleteIndicator);
    provide("editFormIndicator", editFormIndicator);

    getAreaById(idArea.value);

    return {
      prompt,
      promptIndicator,
      showEditObj,
      showEditCrit,
      area,
      role,
      generatePDFEvaluationArea,
      onCreateCriterion(idObjective) {
        criterionForm.value.idObjective = idObjective;
        promptCriterion.value = true;
      },
      onEditCriterion(idObjective, criterion) {
        criterionForm.value.idObjective = idObjective;
        criterionForm.value.id = criterion._id;
        criterionForm.value.name = criterion.name;
        criterionForm.value.todo = criterion.todo;
        editFormCriterion.value = true;
        promptCriterion.value = true;
      },
      onDeleteCriterion(idObjective, idCriterion) {
        criterionForm.value.idObjective = idObjective;
        criterionForm.value.id = idCriterion;
        promptDeleteCriterion.value = true;
      },
      nameIconStatus(status) {
        if (status === "Cumplido") {
          return "check_circle";
        } else if (status === "Sobre Cumplido") {
          return "verified";
        } else {
          return "circle";
        }
      },
      colorIconStatus(status) {
        if (status === "Cumplido") {
          return "green";
        } else if (status === "Sobre Cumplido") {
          return "primary";
        } else {
          return "";
        }
      },
      onpromptIndicator(idCriterion) {
        indicatorForm.value.idCriterion = idCriterion;
        promptIndicator.value = true;
      },

      onEditIndicator(indicator) {
        indicatorForm.value.id = indicator._id;
        indicatorForm.value.name = indicator.name;
        indicatorForm.value.category = indicator.category;
        editFormIndicator.value = true;
        promptIndicator.value = true;
      },

      onDeleteIndicator(idIndicator) {
        indicatorForm.value.id = idIndicator;
        promptDeleteIndicator.value = true;
      },

      deleteObjectivePromt(objective) {
        objectiveForm.value.id = objective._id;
        objectiveForm.value.idArea = area.value._id;
        promptDeleteObjective.value = true;
      },
      onCreateObjective() {
        promptObjective.value = true;
        objectiveForm.value.idArea = area.value._id;
      },
      onEditObjective(objective) {
        promptEditObjective.value = true;
        objectiveForm.value.id = objective._id;
        objectiveForm.value.name = objective.name;
      },
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

.area-scroll
  width: 100%
  height: calc(calc(100vh - (50px + 48px)) - 64px)



.container-item-objectives
  border-radius:10px
  background-color: rgba(255, 255, 255, 0.06)

ul
  margin: 5px 0px
</style>

<template>
  <q-page class="flex flex-center bg-blue-grey-10">
    <div
      class="q-ma-md container-objectives"
      style="background-color: rgba(255, 255, 255, 0.1)"
    >
      <FormCriterion />
      <FormObjective />
      <FormDeleteObjective />
      <div class="row">
        <div class="text-h4 q-pa-md text-blue-grey-1">{{ area.name }}</div>
        <q-space />
        <div class="col-auto">
          <q-btn color="blue-grey-1" round flat icon="more_vert">
            <q-menu auto-close>
              <q-list>
                <q-item clickable v-ripple @click="aa">
                  <q-item-section avatar
                    ><q-icon color="orange-4" name="add"
                  /></q-item-section>
                  <q-item-section>Añadir Objetivos</q-item-section>
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

      <div
        v-for="objective in area.objectives"
        :key="objective._id"
        class="q-pa-sm q-ma-sm container-item-objectives"
      >
        <div class="row q-pt-sm">
          <div class="text-h6 text-blue-grey-1 d-block">Objetivo</div>
          <q-space />
          <div class="col-auto">
            <q-btn color="blue-grey-1" round flat icon="more_vert">
              <q-menu auto-close>
                <q-list>
                  <q-item
                    clickable
                    v-ripple
                    @click="(prompt = true), onCreateCriterion(objective._id)"
                  >
                    <q-item-section avatar
                      ><q-icon color="orange-4" name="add"
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
                    <q-item-section>Eliminar</q-item-section>
                  </q-item>
                </q-list>
              </q-menu>
            </q-btn>
          </div>
          <!-- <div class="column q-ml-sm justify-center">
            <q-btn
              round
              icon="add"
              color="primary"
              size="sm"
              @click="prompt = true"
            />
          </div> -->
        </div>
        <div class="container-item-objectives q-pa-xs q-ma-xs">
          <div class="col text-blue-grey-1 objectives q-ma-sm">
            <!-- <q-icon color="green" name="check_circle" size="xs" />
        <q-icon color="red" name="cancel" size="xs" /> -->
            <q-icon name="circle" size="xs" />
            {{ objective.name }}
          </div>
        </div>
        <div class="row inline q-pt-sm">
          <div class="text-h6 text-blue-grey-1 d-block">Criterio de medida</div>
          <!-- <div class="column q-ml-sm justify-center">
            <q-btn
              round
              icon="add"
              color="primary"
              size="sm"
              @click="prompt = true"
            />
          </div> -->
        </div>
        <div
          v-for="criterion in objective.criterions"
          :key="criterion._id"
          class="q-ma-SM"
        >
          <div class="col text-blue-grey-1 text-edit q-ma-sm">
            <!-- <q-icon color="green" name="check_circle" size="xs" />
        <q-icon color="red" name="cancel" size="xs" /> -->
            <q-icon name="circle" size="xs" />
            {{ criterion.name }}

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
import { defineComponent, defineAsyncComponent, provide, ref } from "vue";
import useAuth from "src/Modules/auth/composables/useAuth";
import useArea from "../composables/useArea";
import { useRouter, useRoute } from "vue-router";

export default defineComponent({
  name: "IndexPage",

  components: {
    FormCriterion: defineAsyncComponent(() =>
      import("../Componentes/FormCriterion.vue")
    ),
    FormObjective: defineAsyncComponent(() =>
      import("../Componentes/FormObjective.vue")
    ),
    FormDeleteObjective: defineAsyncComponent(() =>
      import("../Componentes/FormDeleteObjective.vue")
    ),
  },

  props: {
    idArea: {
      required: true,
    },
  },

  setup() {
    const { getAreaById, area } = useArea();
    const route = useRoute();
    const prompt = ref(false);
    const promptObjective = ref(false);
    const promptDeleteObjective = ref(false);
    const idArea = ref(route.params.idArea);
    const objectiveForm = ref({
      id: "",
      idArea,
      name: "",
      criterions: [""],
    });
    const criterionForm = ref({
      idObjective: null,
      name: "",
    });
    const editFormCriterion = ref(false);
    provide("prompt", prompt);
    provide("criterionForm", criterionForm);
    provide("editFormCriterion", editFormCriterion);
    provide("objectiveForm", objectiveForm);
    provide("promptObjective", promptObjective);
    provide("promptDeleteObjective", promptDeleteObjective);

    getAreaById(idArea.value);

    return {
      value: 80,
      prompt,
      area,
      onCreateCriterion(idObjective) {
        criterionForm.value.idObjective = idObjective;
      },
      aa() {
        promptObjective.value = true;
      },
      deleteObjectivePromt(objective) {
        console.log("tttt");
        objectiveForm.value.id = objective._id;
        promptDeleteObjective.value = true;
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
  background-color: rgba(255, 255, 255, 0.1)

ul
  margin: 5px 0px

.text-edit
  cursor: pointer
</style>

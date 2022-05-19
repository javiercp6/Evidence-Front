<template>
  <q-page class="flex flex-center bg-blue-grey-10">
    <div
      class="q-ma-md container-objectives"
      style="background-color: rgba(255, 255, 255, 0.1)"
    >
      <div class="text-h4 q-pa-md text-blue-grey-1">Formación de pregrado</div>
      <div class="row inline q-pt-sm">
        <div class="text-h5 q-pa-md text-blue-grey-1 d-block">Objetivos</div>
        <div class="column q-ml-sm justify-center">
          <q-btn
            round
            icon="add"
            color="primary"
            size="sm"
            @click="prompt = true"
          />
        </div>
      </div>
      <div class="col text-blue-grey-1 objectives q-ma-sm">
        <!-- <q-icon color="green" name="check_circle" size="xs" />
        <q-icon color="red" name="cancel" size="xs" /> -->
        <q-icon name="circle" size="xs" />
        Formar profecionales integrales que se caractericen por su profundo
        sentido humanista, firmeza político-ideologico, ser competentes, cultos,
        y comprometidos con la Revolución cubana
      </div>
      <div class="row inline q-pt-sm">
        <div class="text-h5 q-pa-md text-blue-grey-1 d-block">
          Criterios de medida
        </div>
        <div class="column q-ml-sm justify-center">
          <q-btn
            round
            icon="add"
            color="primary"
            size="sm"
            @click="prompt = true"
          />
        </div>
      </div>
      <div
        v-for="n in 5"
        :key="n"
        class="container-item-objectives q-pa-xs q-ma-xs"
      >
        <div class="col text-blue-grey-1 objectives q-ma-sm">
          <!-- <q-icon color="green" name="check_circle" size="xs" />
        <q-icon color="red" name="cancel" size="xs" /> -->
          <q-icon name="circle" size="xs" />
          Las estrategias educativas del año académico, concebidas a partir de
          la estrategia de la carrera, a través de las dimensiones: curricular,
          político-ideológica y de extensión universitaria contribuye a la
          formación integral de los asdasdasadasddas sacasdsadsad saadasdas
          sadestudiantes, en correspondencia con los objetivos educativos e
          instructivos del año.
          <q-btn
            round
            icon="add"
            color="primary"
            size="xs"
            @click="prompt = true"
          />
          <div>
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

export default defineComponent({
  name: "IndexPage",

  components: {
    /* AddEvidence: defineAsyncComponent(() =>
      import("../Componentes/AddEvidence.vue")
    ), */
  },

  setup() {
    console.log("Index page");
    const prompt = ref(false);
    provide("prompt", prompt);
    return {
      value: 80,
      prompt,
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
  cursor: pointer
  background-color: rgba(255, 255, 255, 0.1)

ul
  margin: 5px 0px
</style>

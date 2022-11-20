<template>
  <q-page style="margin-top: -60px">
    <section class="heroSection bg-primary">
      <div class="heroSection__content container q-mb-xl">
        <div class="row full-width q-mb-xl">
          <div
            class="col-12 col-md-6 vertical-middle self-center justify-start"
          >
            <div class="q-mb-xl">
              <q-img
                src="~assets/SGEOA_ICONO_BLANCO_ok.svg"
                style="width: 400px; cursor: pointer"
                @click="start()"
              ></q-img>
            </div>
            <div style="width: 95%">
              <q-separator size="2px" color="white" />
            </div>

            <h4 class="text-h5 text-white">
              Gestiona el cumplimiento de los objetivos estratégicos trazados
              por la Facultad de una manera fácil, automatizada y medible
            </h4>

            <q-btn
              class="text-black"
              unelevated
              rounded
              color="white"
              label="Iniciar"
              icon="bolt"
              @click="start()"
            />
          </div>
          <div class="col-0 col-md-6 q-pl-md">
            <img
              :style="
                $q.screen.md || $q.screen.lg || $q.screen.xl
                  ? 'width: 500px; max-width: fit-content;'
                  : 'width: 100px; max-width: 100%;'
              "
              class="responsive"
              src="~assets/asset3.png"
            />
          </div>
        </div>
      </div>
      <div class="waves">
        <svg
          class="waves__svg"
          preserveAspectRatio="none"
          shape-rendering="auto"
          viewBox="0 24 150 28"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
        >
          <defs>
            <path
              id="gentle-wave"
              d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
            ></path>
          </defs>
          <g class="parallax">
            <use
              fill="rgba(255,255,255,0.7)"
              x="48"
              xlink:href="#gentle-wave"
              y="0"
            ></use>
            <use
              fill="rgba(255,255,255,0.5)"
              x="48"
              xlink:href="#gentle-wave"
              y="3"
            ></use>
            <use
              fill="rgba(255,255,255,0.3)"
              x="48"
              xlink:href="#gentle-wave"
              y="5"
            ></use>
            <use
              fill="rgba(255,255,255,1)"
              x="48"
              xlink:href="#gentle-wave"
              y="7"
            ></use>
          </g>
        </svg>
      </div>
    </section>
    <section class="features q-py-xl">
      <div class="container">
        <div class="q-px-lg q-pb-md">
          <q-timeline layout="loose" color="primary">
            <q-timeline-entry heading>
              <h2 class="text-h3 text-weight-thin">
                ¿Que se puede hacer con SGEOA?
              </h2>
            </q-timeline-entry>

            <q-timeline-entry
              title="Gestionar las Áreas"
              subtitle="Jefe de Área"
              side="left"
              icon="crop_square"
            >
              <div>
                Gestionar las diferentes Áreas de Resultado Clave de la facultad
                con sus Objetivos Estratégicos y definir los Criterios de
                Medidas de cada una.
              </div>
            </q-timeline-entry>

            <q-timeline-entry
              title="Elaborar un Plan de Resultado"
              subtitle="Jefe de Área"
              side="right"
              icon="assignment"
            >
              <div>
                Elaborar el Plan de Resultado con sus indicadores asociados a
                los Criterios de Medida.
              </div>
            </q-timeline-entry>

            <q-timeline-entry
              title="Establecer un plan"
              subtitle="Jefe de Área"
              side="left"
              icon="fact_check"
            >
              <div>
                Establecer un plan con objetivos a cumplir a cada profesor o
                especialista
              </div>
            </q-timeline-entry>

            <q-timeline-entry
              title="Cumplir Objetivos"
              subtitle="Profesor o especialista"
              side="right"
              icon="check_circle"
            >
              <div>
                Evidencciar el cumplimiento de los objetivos trazados mediante
                un archivo (imágen, documento, entre otros)
              </div>
            </q-timeline-entry>

            <q-timeline-entry
              title="Generar informe"
              subtitle="Jefe de Área"
              side="left"
              icon="description"
            >
              <div>
                Generar un informe general sobre el cumplimiento de los
                objetivos trazados , además de las evaluaciones profesorales
              </div>
            </q-timeline-entry>
          </q-timeline>
        </div>
      </div>
    </section>
    <section class="about q-mb-xl q-py-xl">
      <div class="container">
        <div class="row">
          <div class="col-0 col-md-6">
            <img
              :style="
                $q.screen.md || $q.screen.lg || $q.screen.xl
                  ? 'width: 400px; max-width: fit-content;'
                  : 'width: 100%; max-width: 100%;'
              "
              class="responsive"
              src="~assets/asset2.png"
            />
          </div>
          <div class="col-12 col-md-6 self-center text-right">
            <h2 class="text-h3 text-weight-thin">Acerca de</h2>
            <p class="text-subtitle1 text-justify">
              Sistema de gestión para las evidencias de los objetivos del año
              (SGEOA) es aplicación web que permite gestionar tanto la
              elaboración como el chequeo del cumplimiento de los objetivos
              estratégicos trazados en la facultad para un año determinado.
              Desarrollada por los estudiantes de la Universidad de las Ciencias
              informáticas Arian León Benitez y Javier Ceballo Perez.
            </p>
          </div>
        </div>
      </div>
    </section>
  </q-page>
</template>

<script setup>
import { goToSection } from "src/support/scroll";
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import useAuth from "../Modules/auth/composables/useAuth";
//import Hover from "src/modules/common/components/HoverComponent.vue";

const router = useRouter();
const { role } = useAuth();

const start = () => {
  if (role.value === "ROLE_USER") {
    router.push("/user");
  } else if (role.value === "ROLE_ADMIN") {
    router.push("/area");
  } else if (role.value === "ROLE_CHIEFA") {
    router.push("/area");
  } else if (role.value === "ROLE_CHIEFD") {
    router.push("/indicadores");
  } else {
    router.push("/auth");
  }
};

const features = [
  {
    icon: "fas fa-check",
    label: "Feature 1",
  },
  {
    icon: "fas fa-check",
    label: "Feature 2",
  },
  {
    icon: "fas fa-check",
    label: "Feature 3",
  },
];
</script>

<style lang="sass" scoped>
.heroSection
  display: flex
  flex-direction: column
  align-items: center
  justify-content: center
  min-height: 100vh
  position: relative
  overflow: hidden


.waves
  position: absolute
  /* bottom: -18px */
  bottom: -8px
  left: 0
  right: 0


.heroSection__content
  display: flex
  flex-direction: column
  align-items: center
  justify-content: center
  height: 100%
  z-index: 1


.heroSection__title
  color: #fff
  font-weight: bold
  text-align: center
</style>

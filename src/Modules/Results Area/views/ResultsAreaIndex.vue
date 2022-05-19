<template>
  <q-page padding class="row items-center bg-blue-grey-10">
    <div class="row self-start justify-center q-ma-sm">
      <q-btn
        color="primary"
        icon="add"
        label="Adicionar Área"
        rounded
        @click="promptArea = true"
      />
      <FormArea />
    </div>
    <div
      class="fit row wrap justify-evenly items-start content-start q-ma-md container-objectives"
    >
      <q-card class="my-card q-mx-sm" v-for="area in areas" :key="area._id">
        <q-card-section>
          <div class="row justify-end" style="height: 30px">
            <div class="doc-card-title text-blue-grey-2 column justify-center">
              <q-circular-progress
                font-size="12px"
                :value="value"
                size="20px"
                :thickness="0.22"
                color="teal"
                track-color="grey-3"
                class="q-ma-sm"
              >
              </q-circular-progress>
              {{ value }}%
            </div>
            <q-space />
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

        <q-card-section class="q-pt-none">
          <div class="text-subtitle1 text-blue-grey-1">Objetivos</div>
          <div class="text-caption text-grey ellipsis">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Pariatur,
            rerum blanditiis voluptates voluptatum ut beatae tempora libero
            officia. Vitae accusantium voluptas iure eveniet commodi laboriosam
            similique quasi alias nam ducimus. Nisi vitae reiciendis deleniti
            ducimus aut impedit accusantium, modi iste optio accusamus, eius
          </div>
          <div class="text-caption text-grey ellipsis">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Pariatur,
            rerum blanditiis voluptates voluptatum ut beatae tempora libero
            officia. Vitae accusantium voluptas iure eveniet commodi laboriosam
            similique quasi alias nam ducimus. Nisi vitae reiciendis deleniti
            ducimus aut impedit accusantium, modi iste optio accusamus, eius
          </div>
        </q-card-section>

        <q-separator />

        <q-card-actions align="right">
          <q-btn flat color="primary"> Ver mas </q-btn>
        </q-card-actions>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, defineAsyncComponent, ref, provide } from "vue";
import useArea from "../composables/useArea";

export default defineComponent({
  name: "ResultsAreaIndex",

  components: {
    FormArea: defineAsyncComponent(() => import("../Componentes/FormArea.vue")),
  },

  setup() {
    const promptArea = ref(false);
    provide("promptArea", promptArea);
    const { getArea, areas } = useArea();

    getArea();
    return { value: 30, areas, promptArea };
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

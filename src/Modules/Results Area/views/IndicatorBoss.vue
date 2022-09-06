<template>
  <q-page class="flex flex-center bg-blue-grey-10">
    <div class="q-ma-md container-objectives">
      <div class="row">
        <div class="text-h5 q-pa-md text-blue-grey-1">
          Plan general de indicadores
        </div>
        <!-- <q-space />
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
        </div> -->
      </div>

      <div class="q-pa-sm">
        <q-expansion-item
          v-for="i in indicatorsModel"
          :key="i.category"
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
            <div class="col text-blue-grey-1 q-ma-sm">
              {{ indicator.name }}
            </div>
          </div>
        </q-expansion-item>
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, defineAsyncComponent } from "vue";
import useUser from "src/Modules/User/composables/useUser";
import useArea from "../composables/useArea";
import { useRouter, useRoute } from "vue-router";

export default defineComponent({
  name: "IndicatorBoss",

  setup() {
    //const { indicators } = useUser();
    const { getIndicatorsModel, indicatorsModel } = useArea();

    const router = useRouter();

    getIndicatorsModel();

    return {
      indicatorsModel,
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

.container-item-objectives
  border-radius:10px
  cursor: pointer
  background-color: rgba(255, 255, 255, 0.1)
</style>

<template>
  <q-dialog v-model="promptArea" persistent>
    <q-card
      class="bg-blue-grey-10 card-evidencia"
      :style="$q.screen.gt.sm ? 'min-width: 850px' : 'min-width: 100%'"
    >
      <q-card-section style="background-color: rgba(255, 255, 255, 0.1)">
        <div class="text-h6 text-blue-grey-1">Nueva Área</div>
      </q-card-section>

      <q-card-section
        class="q-pt-none"
        style="background-color: rgba(255, 255, 255, 0.1)"
      >
        <!-- <q-input
          dense
          v-model="address"
          autofocus
          @keyup.enter="prompt = false"
        /> -->
        <q-input
          outlined
          dense
          class="q-pa-xs"
          input-style=" color: #ffffffa3 "
          placeholder="Nombre"
          v-model="areaForm.name"
        />
        <div class="row">
          <div class="text-subtitle1 text-blue-grey-1 q-pa-xs">Objetivos</div>
          <div class="row q-ml-sm justify-center items-center">
            <div>
              <q-btn
                class="q-ma-xs"
                round
                icon="remove"
                color="primary"
                size="xs"
                @click="removeInputObjetives()"
              />
              <q-btn
                round
                icon="add"
                color="primary"
                size="xs"
                @click="addInputObjetives()"
              />
            </div>
          </div>
        </div>
        <q-input
          v-for="(objective, index) in areaForm.objectives"
          :key="index"
          outlined
          dense
          class="q-pa-xs"
          input-style=" color: #ffffffa3 "
          type="textarea"
          rows="3"
          :placeholder="'Objetivo' + index"
          v-model="areaForm.objectives[index]"
        />
      </q-card-section>

      <q-card-actions
        align="right"
        class="text-primary q-pa-md"
        style="background-color: rgba(255, 255, 255, 0.1)"
      >
        <q-btn flat rounded label="Cancelar" v-close-popup @click="reset" />
        <q-btn
          color="primary"
          rounded
          label="Aceptar"
          v-close-popup
          @click="a"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { defineComponent, inject, ref } from "vue";
export default defineComponent({
  name: "FormEvidencia",
  setup() {
    const promptArea = inject("promptArea");
    const areaForm = ref({
      name: "",
      objectives: [""],
    });

    return {
      promptArea,
      areaForm,
      address: ref(null),
      addInputObjetives() {
        console.log(areaForm.value.objectives.length);
        areaForm.value.objectives.length++;
      },
      removeInputObjetives() {
        console.log(areaForm.value.objectives.length);
        if (areaForm.value.objectives.length > 1) {
          areaForm.value.objectives.length--;
        }
      },
      a() {
        console.log(areaForm.value);
      },
      reset() {
        areaForm.value.name = "";
        areaForm.value.objectives = [""];
      },
    };
  },
});
</script>

<style lang="sass" scoped>
.card-evidencia
  border-radius: 10px

.q-field__control
  background: yellow !important

.input-textarea
  color: #ffffffa3
</style>

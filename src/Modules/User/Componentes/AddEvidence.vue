<template>
  <q-dialog v-model="prompt" persistent>
    <q-card
      class="bg-blue-grey-10 card-evidencia"
      :style="$q.screen.gt.sm ? 'min-width: 850px' : 'min-width: 100%'"
    >
      <q-card-section style="background-color: rgba(255, 255, 255, 0.1)">
        <div class="text-h6 text-blue-grey-1">Nueva Evidencia</div>
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
          rounded
          v-model="text"
          class="q-pa-xs"
          input-style=" color: #ffffffa3 ; ::placeholder { opacity: .3}"
          placeholder="Descripción"
          type="textarea"
          input-class="input-textarea"
        />
        <q-input
          @update:model-value="
            (val) => {
              files = val;
            }
          "
          multiple
          rounded
          outlined
          class="q-pa-xs"
          input-style=" color: #ffffffa3 ; ::placeholder { opacity: .3}"
          type="file"
        />
      </q-card-section>

      <q-card-actions
        align="right"
        class="text-primary q-pa-md"
        style="background-color: rgba(255, 255, 255, 0.1)"
      >
        <q-btn flat rounded label="Cancelar" v-close-popup />
        <q-btn color="primary" rounded label="Aceptar" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { defineComponent, inject, ref } from "vue";
export default defineComponent({
  name: "FormEvidencia",
  setup() {
    const prompt = inject("prompt");
    return {
      prompt,
      address: ref(null),
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

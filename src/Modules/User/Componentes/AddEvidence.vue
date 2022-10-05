<template>
  <q-dialog v-model="prompt" persistent>
    <q-card
      class="bg-blue-grey-10 card-evidencia"
      :style="$q.screen.gt.sm ? 'min-width: 850px' : 'min-width: 100%'"
    >
      <q-form @submit.prevent="onSubmitEvidence">
        <q-card-section style="background-color: rgba(255, 255, 255, 0.1)">
          <div class="text-h6 text-blue-grey-1">Nueva Evidencia</div>
        </q-card-section>

        <q-card-section
          class="q-pt-none"
          style="background-color: rgba(255, 255, 255, 0.1)"
        >
          <q-input
            outlined
            rounded
            class="q-pa-xs"
            input-style=" color: #ffffffa3 ; ::placeholder { opacity: .3}"
            label="Descripción"
            type="textarea"
            input-class="input-textarea"
            v-model="evidence.description"
          />
          <q-input
            @update:model-value="
              (val) => {
                evidence.files = val;
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
          <q-btn flat rounded label="Cancelar" v-close-popup @click="reset" />
          <q-btn
            color="primary"
            rounded
            label="Aceptar"
            v-close-popup
            type="submit"
          />
        </q-card-actions>
      </q-form>
    </q-card>
  </q-dialog>
</template>

<script>
import { defineComponent, inject, ref } from "vue";
import useUser from "src/Modules/User/composables/useUser";
import { useQuasar } from "quasar";
export default defineComponent({
  name: "FormEvidencia",
  setup() {
    const { createevidence, editevidence } = useUser();
    const $q = useQuasar();
    const prompt = inject("prompt");
    const evidence = inject("evidence");
    const editEvidence = inject("editEvidence");

    const reset = () => {
      evidence.value.id = null;
      evidence.value.description = "";
      evidence.value.files = null;
      editEvidence.value = false;
    };

    return {
      prompt,
      evidence,
      reset,

      onSubmitEvidence: async () => {
        //const evidenceTo = Object.assign(evidence.value, { file: files.value });
        if (editEvidence.value) {
          console.log("edit");
          const { ok, message } = await editevidence(evidence.value);
          if (!ok)
            $q.notify({
              message,
              color: "negative",
            });
          if (ok) {
            $q.notify({
              message: "Evidencia Editada",
              color: "positive",
            });
          }
        } else {
          console.log("crearrr");
          const { ok, message } = await createevidence(evidence.value);
          if (!ok)
            $q.notify({
              message,
              color: "negative",
            });
          if (ok) {
            $q.notify({
              message: "Evidencia Creada",
              color: "positive",
            });
          }
        }
        reset();
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

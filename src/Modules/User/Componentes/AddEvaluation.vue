<template>
  <q-dialog v-model="promptEvaluation" persistent>
    <q-card
      class="bg-blue-grey-10 card-evidencia"
      :style="$q.screen.gt.sm ? 'min-width: 850px' : 'min-width: 100%'"
    >
      <q-form
        @submit.prevent="onSubmitEvaluation"
        style="background-color: rgba(255, 255, 255, 0.1)"
      >
        <q-card-section>
          <div class="text-h6 text-blue-grey-1">Evaluación</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <div
            style="
              background-color: rgba(255, 255, 255, 0.07);
              border-radius: 10px;
            "
            class="q-pa-xs q-my-md"
          >
            <div class="text-subtitle1 text-blue-grey-1 q-pa-xs">
              TRABAJO DOCENTE-EDUCATIVO EN PREGRADO Y POSGRADO
            </div>
            <div class="q-gutter-sm">
              <q-radio
                dense
                class="text-blue-grey-1 q-px-xs"
                dark
                color="red"
                v-model="evaluationForm[0]"
                val="Mal"
                label="Mal"
              />
              <q-radio
                class="text-blue-grey-1 q-px-xs"
                color="primary"
                v-model="evaluationForm[0]"
                dark
                dense
                val="Regular"
                label="Regular"
              />
              <q-radio
                class="text-blue-grey-1 q-px-xs"
                dark
                dense
                color="primary"
                v-model="evaluationForm[0]"
                val="Bien"
                label="Bien"
              />
              <q-radio
                class="text-blue-grey-1 q-px-xs"
                dark
                dense
                color="primary"
                v-model="evaluationForm[0]"
                val="Exelente"
                label="Exelente"
              />
            </div>
          </div>
          <div
            style="
              background-color: rgba(255, 255, 255, 0.07);
              border-radius: 10px;
            "
            class="q-pa-xs q-my-md"
          >
            <div class="text-subtitle1 text-blue-grey-1 q-pa-xs">
              TRABAJO POLÍTICO-IDEOLÓGICO
            </div>
            <div class="q-gutter-sm">
              <q-radio
                dense
                class="text-blue-grey-1 q-px-xs"
                dark
                color="primary"
                v-model="evaluationForm[1]"
                val="Mal"
                label="Mal"
              />
              <q-radio
                class="text-blue-grey-1 q-px-xs"
                color="primary"
                v-model="evaluationForm[1]"
                dark
                dense
                val="Regular"
                label="Regular"
              />
              <q-radio
                class="text-blue-grey-1 q-px-xs"
                dark
                dense
                color="primary"
                v-model="evaluationForm[1]"
                val="Bien"
                label="Bien"
              />
              <q-radio
                class="text-blue-grey-1 q-px-xs"
                dark
                dense
                color="primary"
                v-model="evaluationForm[1]"
                val="Exelente"
                label="Exelente"
              />
            </div>
          </div>
          <div
            style="
              background-color: rgba(255, 255, 255, 0.07);
              border-radius: 10px;
            "
            class="q-pa-xs q-my-md"
          >
            <div class="text-subtitle1 text-blue-grey-1 q-pa-xs">
              TRABAJO METODOLÓGICO
            </div>
            <div class="q-gutter-sm">
              <q-radio
                dense
                class="text-blue-grey-1 q-px-xs"
                dark
                color="primary"
                v-model="evaluationForm[2]"
                val="Mal"
                label="Mal"
              />
              <q-radio
                class="text-blue-grey-1 q-px-xs"
                color="primary"
                v-model="evaluationForm[2]"
                dark
                dense
                val="Regular"
                label="Regular"
              />
              <q-radio
                class="text-blue-grey-1 q-px-xs"
                dark
                dense
                color="primary"
                v-model="evaluationForm[2]"
                val="Bien"
                label="Bien"
              />
              <q-radio
                class="text-blue-grey-1 q-px-xs"
                dark
                dense
                color="primary"
                v-model="evaluationForm[2]"
                val="Exelente"
                label="Exelente"
              />
            </div>
          </div>
          <div
            style="
              background-color: rgba(255, 255, 255, 0.07);
              border-radius: 10px;
            "
            class="q-pa-xs q-my-md"
          >
            <div class="text-subtitle1 text-blue-grey-1 q-pa-xs">
              TRABAJO DE INVESTIGACIÓN E INNOVACIÓN
            </div>
            <div class="q-gutter-sm">
              <q-radio
                dense
                class="text-blue-grey-1 q-px-xs"
                dark
                color="primary"
                v-model="evaluationForm[3]"
                val="Mal"
                label="Mal"
              />
              <q-radio
                class="text-blue-grey-1 q-px-xs"
                color="primary"
                v-model="evaluationForm[3]"
                dark
                dense
                val="Regular"
                label="Regular"
              />
              <q-radio
                class="text-blue-grey-1 q-px-xs"
                dark
                dense
                color="primary"
                v-model="evaluationForm[3]"
                val="Bien"
                label="Bien"
              />
              <q-radio
                class="text-blue-grey-1 q-px-xs"
                dark
                dense
                color="primary"
                v-model="evaluationForm[3]"
                val="Exelente"
                label="Exelente"
              />
            </div>
          </div>
          <div
            style="
              background-color: rgba(255, 255, 255, 0.07);
              border-radius: 10px;
            "
            class="q-pa-xs q-my-md"
          >
            <div class="text-subtitle1 text-blue-grey-1 q-pa-xs">
              SUPERACIÓN
            </div>
            <div class="q-gutter-sm">
              <q-radio
                dense
                class="text-blue-grey-1 q-px-xs"
                dark
                color="primary"
                v-model="evaluationForm[4]"
                val="Mal"
                label="Mal"
              />
              <q-radio
                class="text-blue-grey-1 q-px-xs"
                color="primary"
                v-model="evaluationForm[4]"
                dark
                dense
                val="Regular"
                label="Regular"
              />
              <q-radio
                class="text-blue-grey-1 q-px-xs"
                dark
                dense
                color="primary"
                v-model="evaluationForm[4]"
                val="Bien"
                label="Bien"
              />
              <q-radio
                class="text-blue-grey-1 q-px-xs"
                dark
                dense
                color="primary"
                v-model="evaluationForm[4]"
                val="Exelente"
                label="Exelente"
              />
            </div>
          </div>
          <div
            style="
              background-color: rgba(255, 255, 255, 0.07);
              border-radius: 10px;
            "
            class="q-pa-xs q-my-md"
          >
            <div class="text-subtitle1 text-blue-grey-1 q-pa-xs">
              EXTENSIÓN UNIVERSITARIA
            </div>
            <div class="q-gutter-sm">
              <q-radio
                dense
                class="text-blue-grey-1 q-px-xs"
                dark
                color="primary"
                v-model="evaluationForm[5]"
                val="Mal"
                label="Mal"
              />
              <q-radio
                class="text-blue-grey-1 q-px-xs"
                color="primary"
                v-model="evaluationForm[5]"
                dark
                dense
                val="Regular"
                label="Regular"
              />
              <q-radio
                class="text-blue-grey-1 q-px-xs"
                dark
                dense
                color="primary"
                v-model="evaluationForm[5]"
                val="Bien"
                label="Bien"
              />
              <q-radio
                class="text-blue-grey-1 q-px-xs"
                dark
                dense
                color="primary"
                v-model="evaluationForm[5]"
                val="Exelente"
                label="Exelente"
              />
            </div>
          </div>
        </q-card-section>

        <q-card-actions align="right" class="text-primary q-pa-md">
          <q-btn flat rounded label="Cancelar" v-close-popup />
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
//import useUser from "src/Modules/User/composables/useUser";
import { useQuasar } from "quasar";
export default defineComponent({
  name: "FormEvidencia",
  setup() {
    //const { createevidence, editevidence } = useUser();
    const $q = useQuasar();
    const promptEvaluation = inject("promptEvaluation");

    /* const reset = () => {
      evidence.value.id = null;
      evidence.value.description = "";
      evidence.value.files = null;
    }; */

    return {
      prompt,
      promptEvaluation,
      evaluationForm: ref([
        "Exelente",
        "Exelente",
        "Exelente",
        "Exelente",
        "Exelente",
        "Exelente",
      ]),

      onSubmitEvaluation: async () => {
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
        //reset();
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

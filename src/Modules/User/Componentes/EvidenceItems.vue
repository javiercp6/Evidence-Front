<template>
  <div class="flex">
    <div class="text-h5 q-pa-md text-blue-grey-1">Objetivo</div>
    <q-space />
    <div v-if="!user && indicator.status" class="q-pr-sm column justify-center">
      <q-btn
        color="negative"
        rounded
        icon="do_not_disturb"
        size="sm"
        label="Denegar"
        @click="onDenyIndicator()"
      />
    </div>
  </div>
  <div class="col text-blue-grey-1 objectives q-ma-sm">
    {{ indicator.name }}
  </div>
  <div class="row inline q-pt-sm">
    <div class="text-h5 q-pa-md text-blue-grey-1 d-block">Evidencias</div>
    <div class="column q-ml-sm justify-center">
      <q-btn
        v-if="user"
        round
        icon="add"
        color="primary"
        size="sm"
        @click="onCreateEvidence()"
      />
    </div>
  </div>

  <div
    v-for="evidence in indicator.evidences"
    :key="evidence._id"
    class="row q-ma-sm container-item-objectives"
  >
    <div
      class="text-blue-grey-1 q-pa-sm row items-center justify-center text-center"
    >
      <q-item tag="a" target="_blank" :href="dir + evidence._id">
        <q-icon name="attach_file" size="md" />
        <div v-if="evidence.file" class="text-caption">1 archivo</div>
        <div v-else class="text-caption">0 archivo</div>
      </q-item>
    </div>
    <div class="col text-blue-grey-1 objectives q-ma-sm">
      {{ evidence.description }}
    </div>

    <div v-if="user">
      <div class="col-auto">
        <q-btn color="blue-grey-1" round flat icon="more_vert">
          <q-menu auto-close>
            <q-list>
              <q-item @click="onEditEvidence(evidence)" clickable v-ripple>
                <q-item-section avatar
                  ><q-icon color="orange-4" name="edit"
                /></q-item-section>
                <q-item-section>Editar</q-item-section>
              </q-item>
              <q-item @click="onDeleteEvidence(evidence)" clickable v-ripple>
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
  </div>
  <div v-if="!indicator.evidences[0]" class="flex flex-center">
    <h6 class="text-blue-grey-1">No existen evidencias</h6>
  </div>
  <AddEvidence />
  <FormDeleteEvidence />
</template>

<script>
import { defineComponent, defineAsyncComponent, provide, ref } from "vue";
import useUser from "src/Modules/User/composables/useUser";
import { useRoute } from "vue-router";
import { useQuasar } from "quasar";

export default defineComponent({
  name: "EvidenceItems",

  components: {
    AddEvidence: defineAsyncComponent(() =>
      import("../Componentes/AddEvidence.vue")
    ),
    FormDeleteEvidence: defineAsyncComponent(() =>
      import("../Componentes/FormDeleteEvidence.vue")
    ),
  },

  props: {
    user: Boolean,
  },

  setup() {
    const { denyIndicator, getIndicatorById, indicator } = useUser();
    const route = useRoute();
    const $q = useQuasar();
    const idIndicator = ref(route.params.idIndicator);
    console.log(idIndicator);
    const prompt = ref(false);
    const promptDeleteEvidence = ref(false);
    const editEvidence = ref(false);

    const dir = ref("http://localhost:8080/api/evidences/file/");
    const evidence = ref({
      id: null,
      idIndicator: idIndicator.value,
      description: "",
      files: null,
    });
    provide("prompt", prompt);
    provide("promptDeleteEvidence", promptDeleteEvidence);
    provide("evidence", evidence);
    provide("editEvidence", editEvidence);
    getIndicatorById(idIndicator.value);

    return {
      prompt,
      indicator,
      dir,
      onDenyIndicator: async () => {
        const { ok, message } = await denyIndicator(idIndicator.value);
        if (!ok)
          $q.notify({
            message,
            color: "negative",
          });
        if (ok) {
          $q.notify({
            message: "Indicador denegado",
            color: "positive",
          });
        }
      },
      onCreateEvidence() {
        evidence.value.id = null;
        evidence.value.description = "";
        evidence.value.files = null;
        editEvidence.value = false;
        prompt.value = true;
      },

      onEditEvidence(evidenceDate) {
        evidence.value.id = evidenceDate._id;
        evidence.value.description = evidenceDate.description;
        editEvidence.value = true;
        prompt.value = true;
      },
      onDeleteEvidence(evidenceDate) {
        evidence.value.id = evidenceDate._id;
        promptDeleteEvidence.value = true;
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
</style>

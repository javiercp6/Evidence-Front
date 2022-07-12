<template>
  <q-page class="flex flex-center bg-blue-grey-10">
    <div
      class="q-ma-md container-objectives"
      style="background-color: rgba(255, 255, 255, 0.1)"
    >
      <div class="text-h5 q-pa-md text-blue-grey-1">Objetivo</div>
      <div class="col text-blue-grey-1 objectives q-ma-sm">
        {{ indicator.name }}
      </div>
      <div class="row inline q-pt-sm">
        <div class="text-h5 q-pa-md text-blue-grey-1 d-block">Evidencias</div>
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
        v-for="evidence in indicator.evidences"
        :key="evidence._id"
        class="row q-ma-sm container-item-objectives"
      >
        <div
          class="text-blue-grey-1 q-pa-sm row items-center justify-center text-center"
        >
          <q-item tag="a" target="_blank" :href="dir + evidence._id">
            <q-icon name="attach_file" size="md" />
            <div class="text-caption">1 archivo</div>
          </q-item>
        </div>
        <div class="col text-blue-grey-1 objectives q-ma-sm">
          {{ evidence.description }}
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
      </div>
    </div>
    <AddEvidence />
  </q-page>
</template>

<script>
import { defineComponent, defineAsyncComponent, provide, ref } from "vue";
import useUser from "src/Modules/User/composables/useUser";
import { useRoute } from "vue-router";

export default defineComponent({
  name: "IndexPage",

  components: {
    AddEvidence: defineAsyncComponent(() =>
      import("../Componentes/AddEvidence.vue")
    ),
  },

  setup() {
    console.log("Index page");
    const { getIndicatorById, indicator, file } = useUser();
    const route = useRoute();
    const idIndicator = ref(route.params.idIndicator);
    const prompt = ref(false);
    const dir = ref("http://localhost:8080/api/evidences/file/");
    const evidence = ref({
      idIndicator: idIndicator.value,
      description: "",
      files: null,
    });
    provide("prompt", prompt);
    provide("evidence", evidence);
    getIndicatorById(idIndicator.value);

    return {
      prompt,
      indicator,
      file,
      dir,
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

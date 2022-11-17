<template>
  <div class="q-pa-sm">
    <q-expansion-item
      v-for="i in evaluationIndicators"
      :key="i.category"
      dark
      dense
      style="background-color: rgba(255, 255, 255, 0.1); border-radius: 10px"
      :label="i.category"
      class="q-ma-sm"
    >
      <template v-slot:header>
        <q-item-section>
          <div class="flex">
            <div class="q-pr-xs">
              {{ i.category }}
            </div>
            <q-badge
              v-show="i.value"
              outline
              :text-color="colorBadge(i.value)"
              rounded
              align="top"
              >{{ i.value }}</q-badge
            >
          </div>
        </q-item-section>
      </template>
      <div v-for="indicator in i.indicators" :key="indicator._id" class="row">
        <div class="col text-blue-grey-1 q-ma-sm">
          <q-icon size="sm" name="check_circle" color="green" />
          {{ indicator.name }}
        </div>
      </div>
    </q-expansion-item>
  </div>
</template>

<script>
import { defineComponent, ref, watch } from "vue";
import useUser from "src/Modules/User/composables/useUser";
import useAuth from "src/Modules/auth/composables/useAuth";
import useArea from "src/Modules/Results Area/composables/useArea";
import { useRouter, useRoute } from "vue-router";

export default defineComponent({
  name: "ListIndicators",
  props: {
    user: Boolean,
  },

  setup(props) {
    const { getEvaluationByUser, evaluationIndicators } = useUser();
    const { uid } = useAuth();
    const { year } = useArea();
    const router = useRouter();
    const route = useRoute();
    const idUser = ref(route.params.idUser);
    if (props.user) {
      getEvaluationByUser(uid.value);
    } else {
      getEvaluationByUser(idUser.value);
    }

    watch(year, (newValue) => {
      if (props.user) {
        getEvaluationByUser(uid.value);
      } else {
        getEvaluationByUser(idUser.value);
      }
      //getArea(newValue);
      console.log(newValue, "En el componente listEvaluation");
    });

    return {
      evaluationIndicators,
      colorBadge: (value) => {
        if (value === "Mal") {
          return "red-5";
        } else if (value === "Regular") {
          return "orange-4";
        } else if (value === "Bien") {
          return "green";
        } else if (value === "Exelente") {
          return "primary";
        }
      },
    };
  },
});
</script>
<style lang="sass" scoped>


.container-item-objectives
  border-radius:10px
  cursor: pointer
  background-color: rgba(255, 255, 255, 0.1)
</style>

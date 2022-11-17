<template>
  <router-view />
</template>

<script>
import { defineComponent, ref, provide } from "vue";
import useAuth from "src/Modules/auth/composables/useAuth";
import useArea from "src/Modules/Results Area/composables/useArea";
import { api } from "boot/axios";

export default defineComponent({
  name: "App",

  setup() {
    const { checkAuthStatus } = useAuth();
    const { getYears } = useArea();

    checkAuthStatus();

    const year = ref(null);
    const functionYear = async () => {
      const { data } = await api.get(`/years/last`);
      console.log("se hizo la fincion inicio del añño");
      year.value = data;
      getYears();
    };
    functionYear();
    provide("year", year);
  },
});
</script>

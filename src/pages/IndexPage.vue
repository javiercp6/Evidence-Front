<template>
  <q-page class="flex flex-center">
    <img
      alt="Quasar logo"
      src="~assets/Logotipo_UCI_2.png"
      style="width: 200px"
    />
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import useAuth from "src/Modules/auth/composables/useAuth";

export default defineComponent({
  name: "IndexPage",

  setup() {
    console.log("Index page");
  },
});
</script>

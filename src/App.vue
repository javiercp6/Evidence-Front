<template>
  <router-view />
</template>

<script>
import { defineComponent } from 'vue'
import useAuth from "src/Modules/auth/composables/useAuth";

export default defineComponent({
  name: 'App',

  setup() {
    const { checkAuthStatus } = useAuth();

    checkAuthStatus()
  }
})
</script>

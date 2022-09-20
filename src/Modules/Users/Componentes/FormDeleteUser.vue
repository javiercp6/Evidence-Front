<template>
  <q-dialog v-model="promptDeleteUser" persistent>
    <q-card class="bg-blue-grey-10 card-evidencia" style="min-width: 350px">
      <q-card-section style="background-color: rgba(255, 255, 255, 0.1)">
      </q-card-section>

      <q-card-section
        class="q-pt-none"
        style="background-color: rgba(255, 255, 255, 0.1)"
      >
        <div class="text-subtitle1 text-center text-blue-grey-1 q-pa-xs">
          ¿Está seguro que desea eliminar el usuario {{ userForm.name }}?
        </div>
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
          label="Eliminar"
          v-close-popup
          @click="onDeleteUser"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { defineComponent, inject, ref } from "vue";
//import useAuth from "../composables/useAuth";
import useUsers from "../composables/useUsers";
import { useQuasar } from "quasar";

export default defineComponent({
  name: "FormDeleteArea",
  setup() {
    const { deleteUser } = useUsers();
    const $q = useQuasar();
    const promptDeleteUser = inject("promptDeleteUser");
    const userForm = inject("userForm");
    const reset = () => {
      userForm.value.id = null;
      userForm.value.name = "";
    };

    return {
      promptDeleteUser,
      userForm,
      reset,
      onDeleteUser: async () => {
        const { ok, message } = await deleteUser(userForm.value.id);
        if (!ok)
          $q.notify({
            message,
            color: "negative",
          });
        if (ok) {
          $q.notify({
            message: "Usuario Eliminado",
            color: "positive",
          });
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

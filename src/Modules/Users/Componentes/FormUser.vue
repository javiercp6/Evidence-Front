<template>
  <q-dialog v-model="promptUser" persistent>
    <q-card
      class="bg-blue-grey-10 card-evidencia"
      :style="$q.screen.gt.sm ? 'min-width: 850px' : 'min-width: 100%'"
    >
      <q-form
        @submit.prevent="onSubmitUser"
        style="background-color: rgba(255, 255, 255, 0.1)"
      >
        <q-card-section class="flex q-mx-sm">
          <div class="text-h6 text-blue-grey-1">
            {{ editFormUser ? "Editar Usuario" : "Nuevo Usuario" }}
          </div>
          <q-space />

          <q-btn
            rounded
            flat
            color="primary"
            icon="lock_reset"
            label="Reiniciar Contraseña"
            @click="resetPassword()"
          />
          <!--  <q-btn round outline color="primary" icon="lock_reset" /> -->
        </q-card-section>

        <q-card-section class="q-pt-none">
          <!-- <q-input
          dense
          v-model="address"
          autofocus
          @keyup.enter="prompt = false"
        /> -->
          <q-input
            autofocus
            outlined
            dense
            class="q-pa-xs"
            input-style=" color: #ffffffa3 "
            placeholder="Nombre"
            v-model="userForm.name"
          />
          <q-input
            outlined
            dense
            class="q-pa-xs"
            input-style=" color: #ffffffa3 "
            placeholder="Nombre de Usuario"
            v-model="userForm.username"
          />
          <q-input
            outlined
            dense
            class="q-pa-xs"
            input-style=" color: #ffffffa3 "
            placeholder="Rol"
            v-model="userForm.role"
          />
          <q-input
            outlined
            dense
            class="q-pa-xs"
            input-style=" color: #ffffffa3 "
            placeholder="Facultad"
            v-model="userForm.faculty"
          />
          <q-input
            outlined
            dense
            class="q-pa-xs"
            input-style=" color: #ffffffa3 "
            placeholder="Departamento"
            v-model="userForm.department"
          />
          <q-input
            outlined
            dense
            class="q-pa-xs"
            input-style=" color: #ffffffa3 "
            placeholder="Categoría"
            v-model="userForm.category"
          />
        </q-card-section>

        <q-card-actions align="right" class="text-primary q-pa-md q-mx-sm">
          <q-btn flat rounded label="Cancelar" v-close-popup @click="reset" />
          <q-btn
            color="primary"
            rounded
            label="Crear"
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
import { useQuasar } from "quasar";
//import useAuth from "../composables/useAuth";
import useUsers from "../composables/useUsers";
export default defineComponent({
  name: "FormArea",
  setup() {
    const { createUser, editUser } = useUsers();
    const $q = useQuasar();
    const promptUser = inject("promptUser");
    const userForm = inject("userForm");
    const editFormUser = inject("editFormUser");
    const reset = () => {
      userForm.value.id = null;
      userForm.value.name = "";
      userForm.value.username = "";
      userForm.value.role = "";
      userForm.value.faculty = "";
      userForm.value.department = "";
      userForm.value.category = "";
      editFormUser.value = false;
    };

    return {
      promptUser,
      userForm,
      editFormUser,
      reset,

      onSubmitUser: async () => {
        if (editFormUser.value === true) {
          console.log("Editar");
          const { ok, message } = await editUser(userForm.value);
          if (!ok)
            $q.notify({
              message,
              color: "negative",
            });
          if (ok) {
            $q.notify({
              message: "Usuario editado ",
              color: "positive",
            });
          }
        } else {
          const { ok, message } = await createUser(userForm.value);

          if (!ok)
            $q.notify({
              message,
              color: "negative",
            });
          if (ok) {
            $q.notify({
              message: "Usuario Creado",
              color: "positive",
            });
          }
          console.log("Crear");
        }
        editFormUser.value = false;
        reset();
      },

      resetPassword: async () => {
        userForm.value.resetpassword = true;
        const { ok, message } = await editUser(userForm.value);
        if (!ok)
          $q.notify({
            message,
            color: "negative",
          });
        if (ok) {
          $q.notify({
            message: "Contraseña reiniciada",
            color: "positive",
          });
        }
        userForm.value.resetpassword = false;
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

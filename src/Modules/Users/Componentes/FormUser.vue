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
            v-if="editFormUser"
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
            class="q-pa-xs q-pb-sm"
            input-style=" color: #ffffffa3 "
            label="Nombre"
            label-color="#ffffffa3"
            v-model="userForm.name"
            :rules="[
              (val) => (val && val.length > 0) || 'Este campo es obligatorio',
              (val) => exp.test(val) || 'Este campo solo acepta letras',
            ]"
          />
          <q-input
            outlined
            dense
            class="q-pa-xs q-pb-sm"
            input-style=" color: #ffffffa3 "
            label="Nombre de Usuario"
            v-model="userForm.username"
            mask="SSSSSSSSSSSSSSSSSSSSSSSSSSSS"
            :rules="[
              (val) => (val && val.length > 0) || 'Este campo es obligatorio',
            ]"
          />

          <!-- <q-input
            outlined
            dense
            class="q-pa-xs"
            input-style=" color: #ffffffa3 "
            placeholder="Facultad"
            v-model="userForm.faculty"
          /> -->
          <q-select
            outlined
            dense
            class="q-pa-xs q-pb-sm"
            input-style="color: #ffffffa3 "
            label="Facultad"
            bg-color="green"
            popup-content-style="background-color: #37474f; color: white"
            v-model="userForm.faculty"
            :options="faculty"
            :rules="[
              (val) => (val && val.length > 0) || 'Este campo es obligatorio',
            ]"
          />

          <!--  <q-input
            outlined
            dense
            class="q-pa-xs"
            input-style=" color: #ffffffa3 "
            placeholder="Departamento"
            v-model="userForm.department"
          /> -->
          <!-- <q-input
            dark
            outlined
            dense
            class="q-pa-xs"
            input-style=" color: #ffffffa3 "
            placeholder="Categoría"
            v-model="userForm.category"
          /> -->
          <q-select
            outlined
            dense
            class="q-pa-xs q-pb-sm"
            input-style="color: #ffffffa3 "
            label="Categoría"
            bg-color="green"
            popup-content-style="background-color: #37474f; color: white"
            v-model="userForm.category"
            :options="category"
            :rules="[
              (val) => (val && val.length > 0) || 'Este campo es obligatorio',
            ]"
          />
          <!-- <q-input
            dark
            outlined
            dense
            class="q-pa-xs"
            input-style=" color: #ffffffa3 "
            placeholder="Rol"
            v-model="userForm.role"
            label="Rol"
          /> -->
          <q-select
            outlined
            dense
            class="q-pa-xs q-pb-sm"
            input-style="color: #ffffffa3 "
            label="Departamento"
            bg-color="green"
            popup-content-style="background-color: #37474f; color: white"
            :loading="loading"
            v-model="userForm.department"
            :options="departament"
            :rules="[
              (val) => (val && val.length > 0) || 'Este campo es obligatorio',
            ]"
            @popup-show="getDepartament()"
          />
          <div style="border-radius: 10px" class="q-pa-xs">
            <div class="text-subtitle1 text-blue-grey-1 q-pa-xs">Rol</div>
            <div class="q-gutter-sm">
              <q-radio
                dense
                class="text-blue-grey-1 q-px-xs"
                dark
                val="ROLE_ADMIN"
                label="Administrador"
                v-model="userForm.role"
              />
              <q-radio
                class="text-blue-grey-1 q-px-xs"
                dark
                dense
                val="ROLE_USER"
                label="Usuario"
                v-model="userForm.role"
              />
              <q-radio
                class="text-blue-grey-1 q-px-xs"
                dark
                dense
                val="ROLE_CHIEF"
                label="Jefe de Área"
                v-model="userForm.role"
              />
            </div>
          </div>
        </q-card-section>

        <q-card-actions align="right" class="text-primary q-pa-md q-mx-sm">
          <q-btn flat rounded label="Cancelar" v-close-popup @click="reset" />
          <q-btn
            color="primary"
            rounded
            :label="editFormUser ? 'Editar' : 'Crear'"
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
import { api } from "boot/axios";
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
    const loading = ref(false);
    const departament = ref([""]);
    const reset = () => {
      userForm.value.id = null;
      userForm.value.name = "";
      userForm.value.username = "";
      userForm.value.role = "ROLE_ADMIN";
      userForm.value.faculty = "";
      userForm.value.department = "";
      userForm.value.category = "";
      editFormUser.value = false;
      promptUser.value = false;
    };

    return {
      promptUser,
      userForm,
      editFormUser,
      departament,
      faculty: [
        "Facultad 1",
        "Facultad 2",
        "Facultad 3",
        "Facultad 4",
        "Facultad de Tecnologías Educativas",
        "Facultad de Ciencias y Tecnologías Educativas",
      ],
      category: ["Profesor auxiliar", "Profesor Principal"],
      loading,
      exp: /^[A-Za-zñÑáéíóúàèìòùÁÉÍÓÚÀÈÌÒÙüÜçÇ\s]+$/,
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
      getDepartament: async () => {
        try {
          loading.value = true;
          const { data } = await api.get("/areas/names");
          departament.value = data;
          loading.value = false;
          departament.value = data;
          console.log(departament);
          console.log(data);
        } catch (error) {
          console.log(error);
          /* $q.notify({
            message:
              error.response.data.msg || "Error al obtener los departamentos",
            color: "negative",
          }); */
        }
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

<template>
  <q-dialog v-model="promptChangePassword" persistent>
    <q-card
      class="bg-blue-grey-10 card-evidencia"
      :style="$q.screen.gt.xs ? 'min-width: 550px' : 'min-width: 100%'"
    >
      <q-form @submit.prevent="onSubmitChangePassword">
        <q-card-section style="background-color: rgba(255, 255, 255, 0.1)">
          <div class="text-h6 text-blue-grey-1">Cambiar Contraseña</div>
        </q-card-section>

        <q-card-section
          class="q-pt-none"
          style="background-color: rgba(255, 255, 255, 0.1)"
        >
          <!-- <q-input
          dense
          v-model="address"
          autofocus
          @keyup.enter="prompt = false"
        /> -->
          <q-input
            v-model="passwords.oldpassword"
            outlined
            dense
            class="q-pa-sm"
            input-style=" color: #ffffffa3 "
            lazy-rules
            :rules="[
              (val) => (val && val.length > 0) || 'Este campo es obligatorio',
              /* (val) => hex.test(val) || 'Prueba', */
            ]"
            placeholder="Contraseña actual"
            :type="isPwd1 ? 'password' : 'text'"
          >
            <template v-slot:append>
              <q-icon
                :name="isPwd1 ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="isPwd1 = !isPwd1"
              />
            </template>
          </q-input>
          <q-input
            v-model="passwords.newpassword"
            class="q-pa-sm"
            input-style=" color: #ffffffa3 "
            dense
            rounded
            outlined
            lazy-rules
            :rules="[
              (val) => (val && val.length > 0) || 'Este campo es obligatorio',
            ]"
            placeholder="Nueva Contraseña"
            :type="isPwd ? 'password' : 'text'"
          >
            <template v-slot:append>
              <q-icon
                :name="isPwd ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="isPwd = !isPwd"
              />
            </template>
          </q-input>
          <q-input
            v-model="passwords.newpassword2"
            class="q-pa-sm"
            input-style=" color: #ffffffa3 "
            dense
            rounded
            outlined
            lazy-rules
            :rules="[
              (val) => (val && val.length > 0) || 'Este campo es obligatorio',
            ]"
            placeholder="Confirmar Contraseña"
            :type="isPwd ? 'password' : 'text'"
          >
            <template v-slot:append>
              <q-icon
                :name="isPwd ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="isPwd = !isPwd"
              />
            </template>
          </q-input>
        </q-card-section>

        <q-card-actions
          align="right"
          class="text-primary q-pa-md"
          style="background-color: rgba(255, 255, 255, 0.1)"
        >
          <q-btn flat rounded label="Cancelar" v-close-popup @click="reset" />
          <q-btn color="primary" rounded label="Aceptar" type="submit" />
        </q-card-actions>
      </q-form>
    </q-card>
  </q-dialog>
</template>

<script>
import { defineComponent, inject, ref } from "vue";
import { useQuasar } from "quasar";
import useAuth from "../Modules/auth/composables/useAuth";

export default defineComponent({
  name: "ChangePassword",
  setup() {
    const { changePassword } = useAuth();
    const $q = useQuasar();

    const promptChangePassword = inject("promptChangePassword");
    const passwords = ref({
      oldpassword: null,
      newpassword: null,
      newpassword2: null,
    });

    const reset = () => {
      passwords.value.oldpassword = null;
      passwords.value.newpassword = null;
      passwords.value.newpassword2 = null;
      promptChangePassword.value = false;
    };

    return {
      promptChangePassword,
      isPwd: ref(true),
      isPwd1: ref(true),
      passwords,

      reset,

      onSubmitChangePassword: async () => {
        if (
          passwords.value.newpassword &&
          passwords.value.newpassword === passwords.value.newpassword2
        ) {
          const { ok, message } = await changePassword(passwords.value);
          if (!ok)
            $q.notify({
              message,
              color: "negative",
            });
          if (ok) {
            $q.notify({
              message,
              color: "positive",
            });
            reset();
          }
        } else {
          $q.notify({
            message: "La nueva contraseña y la confirmada no son iguales",
            color: "negative",
          });
        }
        console.log("editar");
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

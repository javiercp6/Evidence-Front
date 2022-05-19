<template>
  <div
    class="fullscreen bg-blue text-white text-center q-pa-md flex flex-center"
  >
    <div class="q-pa-md">
      <q-card class="my-card">
        <!-- <img  src="~assets/quasar-logo-full.svg"> -->
        <div class="row justify-center">
          <q-icon color="black" name="login" size="100px"></q-icon>
        </div>
        <q-card-section>
          <q-form @submit.prevent="onSubmitLogin">
            <q-input
              v-model="userForm.username"
              input-style=" color: #ffffffa3"
              label-color=""
              rounded
              outlined
              dense
              bg-color="rgba(255, 255, 255, 0.1)"
              ref="usuario"
              mask="SSSSSSSSSSSSSSSSSSSSSSSSSSSS"
              lazy-rules
              :rules="[
                (val) => (val && val.length > 0) || 'Este campo es obligatorio',
              ]"
              placeholder="Nombre"
              type="text"
            >
              <template v-slot:prepend>
                <q-icon name="account_circle" />
              </template>
            </q-input>
            <q-input
              v-model="userForm.password"
              dense
              rounded
              outlined
              ref="contraseña"
              lazy-rules
              :rules="[
                (val) => (val && val.length > 0) || 'Este campo es obligatorio',
              ]"
              label="Contraseña"
              :type="isPwd ? 'password' : 'text'"
            >
              <template v-slot:prepend>
                <q-icon name="lock" />
              </template>
              <template v-slot:append>
                <q-icon
                  :name="isPwd ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer"
                  @click="isPwd = !isPwd"
                />
              </template>
            </q-input>
            <div class="row justify-center q-py-md">
              <q-btn
                class="col"
                rounded
                :loading="loading"
                label="Iniciar Sesión"
                color="primary"
                type="submit"
              />
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useQuasar } from "quasar";
import useAuth from "../composables/useAuth";

export default {
  name: "Login-view",
  setup() {
    const router = useRouter();
    const $q = useQuasar();
    const { loginUser } = useAuth();

    const userForm = ref({
      username: "",
      password: "",
    });

    const loading = ref(false);

    return {
      userForm,
      isPwd: ref(true),
      loading,
      onSubmitLogin: async () => {
        loading.value = true;
        const { ok, message } = await loginUser(userForm.value);
        loading.value = false;

        if (!ok)
          $q.notify({
            message,
            color: "negative",
          });
        //else router.push({ name: "..." });
      },
    };
  },
};
</script>

<style lang="sass" scoped>
.my-card
  width: 100%
  min-width: 290px
  max-width: 300px
  background-color: $bgsecundarydark
  border-radius: 10px

.bg-blue
  background: $bgdark !important
</style>

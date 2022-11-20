<template>
  <q-card class="q-ma-xl my-card">
    <div class="row">
      <div
        class="col-0 col-sm-5 bg-primary rounded-left-borders xs-hide"
        style="border-radius: 10px 0px 0px 10px"
      >
        <div class="row q-ml-sm q-mt-sm">
          <div class="col-12 fredoka text-subtitle1">
            <router-link
              class="text-white"
              style="text-decoration: none"
              to="/"
            >
              <q-img
                src="~assets/SGEOA_S_BLANCO_ok.svg"
                style="width: 30px; cursor: pointer"
              ></q-img>
            </router-link>
          </div>
        </div>
        <div
          class="row full-width q-px-xl q-pb-xl full-height flex flex-center"
        >
          <div class="">
            <div
              class="text-h4 text-uppercase text-white fredoka"
              style="min-width: 220px"
            >
              Bienvenido!
            </div>
            <div class="text-white q-my-sm text-subtitle1">
              Ingrese sus credenciales
            </div>
          </div>
        </div>
      </div>
      <div class="col-12 col-sm-7">
        <div class="row q-ml-sm q-mt-sm sm-and-up-hide">
          <div class="col-12 fredoka text-subtitle1">
            <router-link
              class="text-primary"
              style="text-decoration: none"
              to="/"
            >
              <q-img
                src="~assets/SGEOA_S_VIOLETA_ok.svg"
                style="width: 30px; cursor: pointer"
              ></q-img>
            </router-link>
          </div>
        </div>
        <div class="row q-pa-sm-sm q-pa-md">
          <div class="col-12">
            <q-card-section>
              <div class="q-mb-xl">
                <div class="flex justify-center">
                  <div
                    class="text-h4 text-uppercase q-my-none text-weight-bold text-primary fredoka"
                  >
                    Login
                  </div>
                </div>
              </div>
              <q-form @submit.prevent="onSubmitLogin">
                <q-input
                  v-model="userForm.username"
                  rounded
                  outlined
                  dense
                  ref="usuario"
                  mask="SSSSSSSSSSSSSSSSSSSSSSSSSSSS"
                  lazy-rules
                  :rules="[
                    (val) =>
                      (val && val.length > 0) || 'Este campo es obligatorio',
                  ]"
                  label="Usuario"
                  input-style="color: black "
                  label-color="grey-9"
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
                  label="Contraseña"
                  input-style="color: black "
                  label-color="grey-9"
                  :rules="[
                    (val) =>
                      (val && val.length > 0) || 'Este campo es obligatorio',
                  ]"
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
          </div>
        </div>
      </div>
    </div>
  </q-card>
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useQuasar } from "quasar";
import useAuth from "../composables/useAuth";

export default {
  name: "Login-prueba",
  setup() {
    const router = useRouter();
    const $q = useQuasar();
    const { loginUser, role } = useAuth();

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

        if (ok) {
          $q.notify({
            message: "Usuario autenticado con éxito",
            color: "positive",
          });
          if (role.value === "ROLE_USER") {
            router.push("/user");
          } else if (role.value === "ROLE_ADMIN") {
            router.push("/area");
          } else if (role.value === "ROLE_CHIEFA") {
            router.push("/area");
          } else if (role.value === "ROLE_CHIEFD") {
            router.push("/indicadores");
          }
          loading.value = false;
        } else {
          $q.notify({
            message,
            color: "negative",
          });
          loading.value = false;
        }

        //else router.push({ name: "..." });
      },
    };
  },
};
</script>

<style lang="sass" scoped>
.my-card
  border-radius: 10px
  box-shadow: 0 1px 14px 6px rgb(0 0 0 / 20%), 0 2px 2px rgb(0 0 0 / 14%), 0 3px 1px -2px rgb(0 0 0 / 12%)
</style>

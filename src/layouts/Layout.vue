<template>
  <q-layout view="hHh Lpr lff" class="shadow-2 rounded-borders">
    <q-header elevated class="bg-blue-grey-10">
      <FormChangePassword />
      <q-toolbar style="background-color: rgba(255, 255, 255, 0.05)">
        <q-btn flat @click="drawer = !drawer" round dense icon="menu" />
        <q-toolbar-title>Logo</q-toolbar-title>
        <div class="q-gutter-sm row items-center no-wrap">
          <!-- <q-btn
            round
            dense
            flat
            color="grey-8"
            icon="video_call"
            v-if="$q.screen.gt.sm"
          >
            <q-tooltip>Create a video or post</q-tooltip>
          </q-btn>
          <q-btn
            round
            dense
            flat
            color="grey-8"
            icon="apps"
            v-if="$q.screen.gt.sm"
          >
            <q-tooltip>Apps</q-tooltip>
          </q-btn>
          <q-btn
            round
            dense
            flat
            color="grey-8"
            icon="message"
            v-if="$q.screen.gt.sm"
          >
            <q-tooltip>Messages</q-tooltip>
          </q-btn> -->

          <Notifications v-if="authStatus === 'authenticated'" />
          <div
            v-if="authStatus === 'authenticated'"
            class="row items-center q-px-xs"
          >
            <div class="q-px-xs">{{ username }}</div>
            <q-btn round flat>
              <q-icon size="40px" name="account_circle" />
              <!-- <q-avatar size="26px"> </q-avatar> -->
              <q-tooltip>Usuario</q-tooltip>
              <q-menu dark class="bg-blue-grey-9">
                <q-list style="width: 250px">
                  <q-item>
                    <q-item-section avatar>
                      <q-icon name="person" />
                    </q-item-section>

                    <q-item-section>{{ name }}</q-item-section>
                  </q-item>
                  <q-separator />
                  <q-item
                    clickable
                    @click="promptChangePassword = true"
                    v-close-popup
                  >
                    <q-item-section avatar>
                      <q-icon name="password" />
                    </q-item-section>

                    <q-item-section>Cambiar contraseña</q-item-section>
                  </q-item>
                  <q-separator />
                  <q-item clickable @click="onLogout()" v-close-popup>
                    <q-item-section avatar>
                      <q-icon name="logout" />
                    </q-item-section>

                    <q-item-section>Salir</q-item-section>
                  </q-item>
                  <q-separator />
                </q-list>
              </q-menu>
            </q-btn>
          </div>
          <div v-if="authStatus === 'not-authenticated'">
            <q-btn
              outline
              rounded
              color="primary"
              icon="loging"
              label="Entrar"
              @click="toLogin()"
            />
          </div>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="drawer"
      show-if-above
      :mini="miniState"
      mini-to-overlay
      @mouseover="miniState = false"
      @mouseout="miniState = true"
      :width="200"
      :breakpoint="500"
      bordered
      dark
      class="bg-blue-grey-10 drawer-layaut"
    >
      <q-scroll-area
        class="fit q-pa-sm"
        style="background-color: rgba(255, 255, 255, 0.05)"
      >
        <q-list padding>
          <q-item clickable v-ripple to="/" class="item-link">
            <q-item-section avatar>
              <q-icon name="home" />
            </q-item-section>

            <q-item-section> Inicio </q-item-section>
          </q-item>

          <q-item
            v-if="role === 'ROLE_ADMIN' || role === 'ROLE_CHIEF'"
            clickable
            v-ripple
            to="/area"
            class="item-link"
          >
            <q-item-section avatar>
              <q-icon name="crop_square" />
            </q-item-section>

            <q-item-section>Areas </q-item-section>
          </q-item>
          <q-item
            v-if="role === 'ROLE_CHIEF'"
            clickable
            v-ripple
            to="/indicadores"
            class="item-link"
          >
            <q-item-section avatar>
              <q-icon name="assignment" />
            </q-item-section>

            <q-item-section>Plan General </q-item-section>
          </q-item>
          <q-item
            v-if="role === 'ROLE_ADMIN' || role === 'ROLE_CHIEF'"
            clickable
            v-ripple
            to="/usuarios"
            class="item-link"
          >
            <q-item-section avatar>
              <q-icon name="people" />
            </q-item-section>

            <q-item-section>Trabajadores </q-item-section>
          </q-item>

          <q-item
            v-if="role === 'ROLE_USER'"
            clickable
            v-ripple
            to="/user"
            class="item-link"
          >
            <q-item-section avatar>
              <q-icon name="format_list_bulleted" />
            </q-item-section>

            <q-item-section> Objetivos </q-item-section>
          </q-item>

          <q-item
            v-if="role === 'ROLE_USER'"
            clickable
            v-ripple
            to="/evaluacion"
            class="item-link"
          >
            <q-item-section avatar>
              <q-icon name="fact_check" />
            </q-item-section>

            <q-item-section> Evaluación </q-item-section>
          </q-item>

          <q-separator dark />

          <q-item clickable v-ripple class="item-link">
            <q-item-section avatar>
              <q-icon name="help" />
            </q-item-section>

            <q-item-section class="text-blue-grey-1"> Ayuda </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <router-view />
      <div class="bg-blue-grey-10">
        <div
          class="q-pa-sm"
          style="background-color: rgba(255, 255, 255, 0.05)"
        >
          <div class="text-center q-pb-sm">
            <div class="text-subtitle1 text-blue-grey-1">Síguenos</div>
            <div class="q-gutter-md" style="font-size: 2em"></div>
          </div>
          <div class="text-center text-blue-grey-1">
            © 2022 Sistema de gestión para las evidencias de los objetivos del
            año. Facultad 4. UCI
          </div>
        </div>
      </div>
    </q-page-container>
  </q-layout>
</template>

<script>
import { provide, ref, defineAsyncComponent } from "vue";
import { useRouter, useRoute } from "vue-router";
import useAuth from "src/Modules/auth/composables/useAuth";
import Notifications from "../components/Notifications.vue";

export default {
  name: "LayoutPrueba",

  components: {
    Notifications,
    FormChangePassword: defineAsyncComponent(() =>
      import("../components/FormChangePassword.vue")
    ),
  },
  setup() {
    const router = useRouter();
    const { username, authStatus, role, name, logout, changePassword } =
      useAuth();
    const promptChangePassword = ref(false);
    provide("promptChangePassword", promptChangePassword);

    return {
      drawer: ref(false),
      miniState: ref(true),

      promptChangePassword,
      username,
      authStatus,
      role,
      name,
      toPlanUser() {
        router.push({
          name: "pl",
          params: {
            idUser: "62924208051465c90d1ee500",
            admin: true,
            nameUser: "Javier Ceballo Perez",
          },
        });
      },
      toLogin: () => {
        router.push({ name: "login" });
      },
      onLogout: () => {
        router.push({ name: "login" });
        logout();
      },
    };
  },
};
</script>
<style lang="sass" scoped>
.item-link
 border-radius: 10px
 height: 10px




.drawer-layaut
 border-radius: 10px
</style>

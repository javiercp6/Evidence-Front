<template>
  <q-layout view="hHh Lpr lff" class="shadow-2 rounded-borders">
    <q-header elevated class="bg-black">
      <q-toolbar>
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
          <q-btn round dense flat color="grey-8" icon="notifications">
            <q-badge color="red" text-color="white" floating> 2 </q-badge>
            <q-tooltip>Notifications</q-tooltip>
          </q-btn>
          <q-btn round flat>
            <q-avatar size="26px"> </q-avatar>
            <q-tooltip>Account</q-tooltip>
          </q-btn>
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
      <q-scroll-area class="fit q-pa-sm">
        <q-list padding>
          <q-item clickable v-ripple to="/" class="item-link">
            <q-item-section avatar>
              <q-icon name="home" />
            </q-item-section>

            <q-item-section> Inicio </q-item-section>
          </q-item>

          <q-item clickable v-ripple to="/area" class="item-link">
            <q-item-section avatar>
              <q-icon name="crop_square" />
            </q-item-section>

            <q-item-section>Areas </q-item-section>
          </q-item>
          <q-item clickable v-ripple to="/indicadores" class="item-link">
            <q-item-section avatar>
              <q-icon name="crop_square" />
            </q-item-section>

            <q-item-section>Plan General </q-item-section>
          </q-item>
          <q-item clickable v-ripple to="/usuarios" class="item-link">
            <q-item-section avatar>
              <q-icon name="crop_square" />
            </q-item-section>

            <q-item-section>Trabajadores </q-item-section>
          </q-item>

          <q-item clickable v-ripple to="/user" class="item-link">
            <q-item-section avatar>
              <q-icon name="format_list_bulleted" />
            </q-item-section>

            <q-item-section> Objetivos </q-item-section>
          </q-item>

          <q-separator dark />

          <q-item clickable v-ripple class="item-link">
            <q-item-section avatar>
              <q-icon name="help" />
            </q-item-section>

            <q-item-section class="text-blue-grey-1"> Ayuda </q-item-section>
          </q-item>
          <q-item clickable v-ripple class="item-link">
            <q-item-section avatar>
              <q-icon name="info" />
            </q-item-section>

            <q-item-section class="text-blue-grey-1">
              Acerca de
            </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <router-view />
      <div class="bg-black q-pa-sm">
        <div class="text-center q-pb-sm">
          <div class="text-subtitle1 text-blue-grey-1">Síguenos</div>
          <div class="q-gutter-md" style="font-size: 2em"></div>
        </div>
        <div class="text-center text-blue-grey-1">
          © 2022 Sistema de gestión para las evidencias de los objetivos del
          año. Facultad 4. UCI
        </div>
      </div>
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref } from "vue";
import { useRouter, useRoute } from "vue-router";

export default {
  name: "LayoutPrueba",
  setup() {
    const router = useRouter();

    return {
      drawer: ref(false),
      miniState: ref(true),
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

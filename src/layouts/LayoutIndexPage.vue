<template>
  <q-layout view="lHh Lpr lFf">
    <q-header>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
          class="md-and-up-hide"
        />

        <q-toolbar-title>
          <q-img src="~assets/SGEOA_ICONO_BLANCO_ok.svg" style="width: 200px"
        /></q-toolbar-title>

        <div class="xs-hide sm-hide">
          <q-btn
            flat
            rounded
            dense
            no-caps
            label="Inicio"
            @click="goToSection('heroSection')"
            class="q-mx-sm"
          />
          <q-btn
            flat
            rounded
            dense
            no-caps
            label="Acciones"
            @click="goToSection('features')"
            class="q-mx-sm"
          />
          <q-btn
            flat
            rounded
            dense
            no-caps
            label="Acerca de"
            @click="goToSection('about')"
            class="q-mx-sm"
          />
          <q-btn
            flat
            rounded
            dense
            label="Entrar"
            to="/auth"
            icon="login"
            v-if="authStatus === 'not-authenticated'"
            class="q-px-sm q-ml-md"
          />
          <!-- <q-btn
            flat
            dense
            label="Dashboard"
            v-if="authStatus === 'authenticated'"
            to="/admin"
          /> -->
          <q-btn
            flat
            dense
            rounded
            label="Salir"
            icon="logout"
            v-if="authStatus === 'authenticated'"
            @click="onLogout()"
          />
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" bordered>
      <q-list>
        <q-item-label header> </q-item-label>
        <q-item clickable @click="navigate('heroSection')">
          <q-item-section>
            <q-item-label>Inicio</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable @click="navigate('features')">
          <q-item-section>
            <q-item-label>Acciones</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable @click="navigate('about')">
          <q-item-section>
            <q-item-label>Acerca de</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable v-if="authStatus === 'not-authenticated'" to="/auth">
          <q-item-section>
            <q-item-label>Entrar</q-item-label>
          </q-item-section>
        </q-item>

        <q-item
          clickable
          v-if="authStatus === 'authenticated'"
          @click="onLogout"
        >
          <q-item-section>
            <q-item-label>Salir</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
      <q-toolbar class="flex flex-center text-white bg-primary">
        <div class="text-center text-white">
          © 2022 Sistema de gestión para las evidencias de los objetivos del
          año. Facultad 4. UCI
        </div>
      </q-toolbar>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from "vue";
import useAuth from "src/Modules/auth/composables/useAuth";
//import { useAuthStore } from "stores/all";
import { goToSection } from "src/support/scroll";
import { useRouter } from "vue-router";

//const $store = useAuthStore();
const router = useRouter();
const { authStatus, logout } = useAuth();
const leftDrawerOpen = ref(false);

const navigate = (section) => {
  leftDrawerOpen.value = false;
  setTimeout(() => {
    goToSection(section);
  }, 250);
};

const onLogout = () => {
  logout();
  router.push({ name: "login" });
};

const toggleLeftDrawer = () => (leftDrawerOpen.value = !leftDrawerOpen.value);
</script>

<template>
  <q-page class="flex flex-center bg-blue-grey-10">
    <div class="q-ma-md container-objectives">
      <q-input
        v-model="search"
        outlined
        dense
        class="q-pa-xs"
        input-style=" color: #ffffffa3 "
        placeholder="Buscar Usuarios..."
      >
        <template v-slot:append>
          <q-icon color="blue-grey-1" name="search" />
        </template>
      </q-input>

      <div class="q-ma-xs q-py-xs" v-for="user in users" :key="user._id">
        <q-item dark class="container-item-objectives row">
          <div class="column justify-center">
            <q-icon name="account_circle" size="80px" />
          </div>
          <!-- <q-item-section side>
          <q-icon name="account_circle" size="80px" />
           <q-avatar rounded size="48px">
            <img src="https://cdn.quasar.dev/img/avatar.png" />
            <q-badge floating color="teal">new</q-badge>
          </q-avatar>
        </q-item-section> -->
          <div
            class="col fit row wrap justify-around items-start content-start"
          >
            <div>
              <q-item-label>Nombre</q-item-label>
              <q-item-label caption class="q-pb-xs">{{
                user.name
              }}</q-item-label>
              <q-item-label>Usuario</q-item-label>
              <q-item-label caption>{{ user.username }}</q-item-label>
            </div>
            <div>
              <q-item-label>Role</q-item-label>
              <q-item-label caption class="q-pb-xs">{{
                user.role
              }}</q-item-label>
              <q-item-label>Facultad</q-item-label>
              <q-item-label caption>{{ user.faculty }}</q-item-label>
            </div>
            <div>
              <q-item-label>Departamento</q-item-label>
              <q-item-label class="q-pb-xs">{{ user.department }}</q-item-label>
              <q-item-label>Categoría</q-item-label>
              <q-item-label caption>{{ user.category }}</q-item-label>
            </div>
          </div>
          <!--  <q-item-section> <q-item-label>Rol</q-item-label>
          <q-item-label caption>Administrador</q-item-label>
          <q-item-label>Facultad</q-item-label>
          <q-item-label caption>Facultad 4</q-item-label></q-item-section>
        <q-item-section>
          <q-item-label>Rol</q-item-label>
          <q-item-label caption>Administrador</q-item-label>
          <q-item-label>Facultad</q-item-label>
          <q-item-label caption>Facultad 4</q-item-label>
        </q-item-section>
        <q-item-section>
          <q-item-label>Departamento</q-item-label>
          <q-item-label caption>Informática</q-item-label>
          <q-item-label>Categoría</q-item-label>
          <q-item-label caption>Profesor Auxiliar</q-item-label>
        </q-item-section> -->

          <div class="col-auto column">
            <div class="row">
              <q-space />
              <q-btn color="blue-grey-1" round flat icon="more_vert">
                <q-menu auto-close>
                  <q-list>
                    <q-item clickable v-ripple>
                      <q-item-section avatar
                        ><q-icon color="orange-4" name="edit"
                      /></q-item-section>
                      <q-item-section>Editar</q-item-section>
                    </q-item>
                    <q-item clickable v-ripple>
                      <q-item-section avatar
                        ><q-icon color="red-5" name="delete"
                      /></q-item-section>
                      <q-item-section>Eliminar</q-item-section>
                    </q-item>
                  </q-list>
                </q-menu>
              </q-btn>
            </div>
            <q-space />
            <div>
              <q-btn
                flat
                color="primary"
                @click="toPlanUser(user._id, user.name)"
                >Analizar
              </q-btn>
            </div>
          </div>
        </q-item>
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, defineAsyncComponent, inject } from "vue";
import useUsers from "../composables/useUsers";
import { useRouter, useRoute } from "vue-router";

export default defineComponent({
  name: "UsersIndex",

  setup() {
    //const { indicators } = useUser();
    const { getUsers, users } = useUsers();
    const admin = inject("admin");
    const router = useRouter();

    getUsers();

    return {
      users,
      toPlanUser(idUser, nameUser) {
        admin.value = true;
        router.push({
          name: "planUser",
          params: { idUser: `${idUser}`, admin: true, nameUser: `${nameUser}` },
        });
      },
    };
  },
});
</script>
<style lang="sass" scoped>

.text-h5
  padding: 5px

.container-objectives
  width: 100%
  min-height: calc(100vh - (50px + 48px))
  border-radius:10px
  padding: 16px 10px

.container-item-objectives
  border-radius:10px
  cursor: pointer
  background-color: rgba(255, 255, 255, 0.1)

.my-card
  width: 100%
  //max-width: 350px
</style>

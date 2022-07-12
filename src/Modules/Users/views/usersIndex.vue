<template>
  <q-page class="bg-blue-grey-10">
    <div class="container-objectives">
      <FormUser />
      <FormDeleteUser />
      <div :class="$q.screen.gt.xs ? 'q-px-md' : ''">
        <q-table
          card-container-style=""
          rows-per-page-label="Registros por página"
          :rows-per-page-options="[]"
          virtual-scroll
          style="height: 200px"
          dark
          grid
          title="Treats"
          :rows="users"
          :columns="columns"
          row-key="name"
          :filter="filter"
          hide-header
        >
          <template v-slot:top>
            <div class="row self-start justify-center q-ma-sm">
              <q-btn
                color="primary"
                icon="add"
                label="Crear USuario"
                size="md"
                rounded
                @click="promptUser = true"
              />
            </div>
            <div class="full-width">
              <q-input
                dense
                debounce="300"
                v-model="filter"
                outlined
                class="q-pa-xs"
                input-style=" color: #ffffffa3 "
                placeholder="Buscar Usuarios..."
                @keyup="onSearchUsers()"
              >
                <template v-slot:append>
                  <q-icon color="blue-grey-2" name="search" />
                </template>
              </q-input>
            </div>
          </template>

          <template v-slot:item="props">
            <div class="col-12 q-pa-xs">
              <q-card class="my-card">
                <q-card-section class="text-center" horizontal>
                  <q-card-section
                    v-if="$q.screen.gt.xs"
                    class="q-pa-none column justify-center"
                  >
                    <div class="column justify-center">
                      <q-icon
                        color="blue-grey-2"
                        name="account_circle"
                        size="80px"
                      />
                    </div>
                  </q-card-section>
                  <q-separator vertical />
                  <q-card-section class="row full-width q-pa-xs" horizontal>
                    <div class="col column justify-evenly">
                      <div>
                        <q-item-label class="text-blue-grey-1"
                          >Nombre</q-item-label
                        >
                        <q-item-label caption class="q-pb-sm text-blue-grey-11"
                          >{{ props.row.name }}
                        </q-item-label>
                      </div>
                      <div>
                        <q-item-label class="text-blue-grey-1"
                          >Usuario</q-item-label
                        >
                        <q-item-label caption class="text-blue-grey-11">{{
                          props.row.username
                        }}</q-item-label>
                      </div>
                      <!-- <div>{{ props.columns }} g</div> -->
                    </div>
                    <div class="col column justify-evenly">
                      <div>
                        <q-item-label class="text-blue-grey-1"
                          >Rol</q-item-label
                        >
                        <q-item-label
                          caption
                          class="q-pb-sm text-blue-grey-11"
                          >{{ props.row.role }}</q-item-label
                        >
                      </div>
                      <div>
                        <q-item-label class="text-blue-grey-1"
                          >Categoria</q-item-label
                        >
                        <q-item-label caption class="text-blue-grey-11">{{
                          props.row.category
                        }}</q-item-label>
                      </div>
                    </div>
                    <div class="col column justify-evenly">
                      <div>
                        <q-item-label class="text-blue-grey-1"
                          >Facultad</q-item-label
                        >
                        <q-item-label
                          caption
                          class="q-pb-sm text-blue-grey-11"
                          >{{ props.row.faculty }}</q-item-label
                        >
                      </div>
                      <div>
                        <q-item-label class="text-blue-grey-1"
                          >Departamento</q-item-label
                        >
                        <q-item-label caption class="text-blue-grey-11">{{
                          props.row.department
                        }}</q-item-label>
                      </div>
                    </div>
                  </q-card-section>
                  <q-card-section class="q-pa-none">
                    <div class="full-height column">
                      <div class="row">
                        <q-space />
                        <q-btn color="blue-grey-1" round flat icon="more_vert">
                          <q-menu auto-close>
                            <q-list>
                              <q-item
                                clickable
                                v-ripple
                                @click="editUserPrompt(props.row)"
                              >
                                <q-item-section avatar
                                  ><q-icon color="orange-4" name="edit"
                                /></q-item-section>
                                <q-item-section>Editar</q-item-section>
                              </q-item>
                              <q-item
                                clickable
                                v-ripple
                                @click="deleteUserPrompt(props.row)"
                              >
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
                      <div class="q-pa-xs">
                        <q-btn
                          size="12px"
                          flat
                          color="primary"
                          @click="toPlanUser(props.row._id)"
                          >Analizar
                        </q-btn>
                      </div>
                    </div>
                  </q-card-section>
                </q-card-section>
              </q-card>
            </div>
          </template>
          <q-space />
        </q-table>
      </div>
    </div>
  </q-page>
</template>

<script>
import {
  defineComponent,
  defineAsyncComponent,
  provide,
  inject,
  ref,
} from "vue";
import useUsers from "../composables/useUsers";
import { useRouter, useRoute } from "vue-router";

const columns = [
  {
    name: "desc",
    required: true,
    label: "Dessert (100g serving)",
    align: "left",
    field: (row) => row.name,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "calories",
    align: "center",
    label: "Calories",
    field: "calories",
    sortable: true,
  },
  { name: "fat", label: "Fat (g)", field: "fat", sortable: true },
  { name: "carbs", label: "Carbs (g)", field: "carbs" },
];

const rows = [
  {
    name: "Frozen Yogurt",
    calories: 159,
    fat: 6.0,
    carbs: 24,
  },
  {
    name: "Ice cream sandwich",
    calories: 237,
    fat: 9.0,
    carbs: 37,
  },
  {
    name: "Eclair",
    calories: 262,
    fat: 16.0,
    carbs: 23,
  },
  {
    name: "Cupcake",
    calories: 305,
    fat: 3.7,
    carbs: 67,
  },
  {
    name: "Gingerbread",
    calories: 356,
    fat: 16.0,
    carbs: 49,
  },
  {
    name: "Jelly bean",
    calories: 375,
    fat: 0.0,
    carbs: 94,
  },
  {
    name: "Lollipop",
    calories: 392,
    fat: 0.2,
    carbs: 98,
  },
  {
    name: "Honeycomb",
    calories: 408,
    fat: 3.2,
    carbs: 87,
  },
  {
    name: "Donut",
    calories: 452,
    fat: 25.0,
    carbs: 51,
  },
  {
    name: "KitKat",
    calories: 518,
    fat: 26.0,
    carbs: 65,
  },
];

export default defineComponent({
  name: "UsersIndex",

  components: {
    FormUser: defineAsyncComponent(() => import("../Componentes/FormUser.vue")),
    FormDeleteUser: defineAsyncComponent(() =>
      import("../Componentes/FormDeleteUser.vue")
    ),
  },

  setup() {
    //const { indicators } = useUser();
    const { getUsers, getUsersByString, users } = useUsers();
    const admin = inject("admin");
    const router = useRouter();
    const promptUser = ref(false);
    const userForm = ref({
      id: "",
      name: "",
      username: "",
      role: "",
      faculty: "",
      department: "",
      category: "",
    });
    const editFormUser = ref(false);
    const promptDeleteUser = ref(false);

    provide("promptUser", promptUser);
    provide("userForm", userForm);
    provide("editFormUser", editFormUser);
    provide("promptDeleteUser", promptDeleteUser);

    getUsers();

    return {
      users,
      promptUser,
      filter: ref(""),
      columns,
      rows,

      editUserPrompt(useritems) {
        userForm.value.id = useritems._id;
        userForm.value.name = useritems.name;
        userForm.value.username = useritems.username;
        userForm.value.role = useritems.role;
        userForm.value.faculty = useritems.faculty;
        userForm.value.department = useritems.department;
        userForm.value.category = useritems.category;
        promptUser.value = true;
        editFormUser.value = true;
      },

      deleteUserPrompt(useritems) {
        console.log(useritems);
        userForm.value.id = useritems._id;
        userForm.value.name = useritems.name;
        promptDeleteUser.value = true;
      },

      toPlanUser(idUser) {
        console.log(idUser);
        router.push({
          name: "userItems",
          params: { idUser: `${idUser}` },
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
  border-radius:10px
  background-color: rgba(255, 255, 255, 0.1)
  //max-width: 350px
</style>

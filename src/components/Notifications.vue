<template>
  <q-btn
    round
    dense
    flat
    color="grey-8"
    icon="notifications"
    @click="getNotifications()"
  >
    <q-badge v-show="cantNotifications" color="red" text-color="white" floating>
      {{ cantNotifications }}
    </q-badge>
    <q-tooltip>Notifications</q-tooltip>

    <q-menu
      dark
      class="bg-blue-grey-9"
      anchor="bottom middle"
      self="top middle"
      :context-menu="!cantNotifications"
    >
      <q-list style="width: 380px; min-height: 200px">
        <q-item
          v-show="!visible"
          v-for="(notification, index) in notifications"
          :key="index"
          style="background-color: rgba(255, 255, 255, 0.05)"
        >
          <q-item-section>{{ notification }} </q-item-section>
        </q-item>

        <!-- <q-item class="center" v-if="!cantNotifications">
          <q-item-section>No existen notificaciones</q-item-section>
        </q-item> -->

        <q-inner-loading :showing="visible" />
        <q-separator />
      </q-list>
    </q-menu>
  </q-btn>
</template>

<script>
import { defineComponent, ref } from "vue";
import { api } from "boot/axios";
import { useQuasar } from "quasar";
import { io } from "socket.io-client";
import useAuth from "src/Modules/auth/composables/useAuth";
import useUser from "src/Modules/User/composables/useUser";

export default defineComponent({
  name: "NotificationsSocket",
  setup() {
    const { uid } = useAuth();
    const { getIndicatorsByUser } = useUser();
    const $q = useQuasar();
    const cantNotifications = ref(null);
    const notifications = ref([]);
    const visible = ref(false);

    const socket = io("http://localhost:8080", {
      query: {
        id: uid.value,
      },
    });

    socket.on("notifications", (number) => {
      cantNotifications.value = number;
      $q.notify({
        message: `Hay ${number} notificacion(es) sin ver`,
        color: "positive",
        icon: "announcement",
        position: "top-right",
        timeout: 1000,
      });
      getIndicatorsByUser(uid.value);

      console.log(cantNotifications.value, "Connected to socket.io");
    });

    const getNotifications = async () => {
      if (cantNotifications.value) {
        try {
          visible.value = true;
          const { data } = await api.get(`/users/notification/${uid.value}`);
          notifications.value = data;
          visible.value = false;
          console.log(data);
          socket.emit("views", "yes");
          cantNotifications.value = null;
        } catch (error) {
          $q.notify({
            message:
              error.response.data.msg || "Error al obtener las notificaciones",
            color: "negative",
          });
        }
      }
    };

    return {
      cantNotifications,
      getNotifications,
      notifications,
      visible,
    };
  },
});
</script>

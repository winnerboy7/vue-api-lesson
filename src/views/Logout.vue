<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <h1>ออกจากระบบ</h1>

        <p class="subheading font-weight-regular">
          {{ user.name }} : {{ user.username }}[ {{ user.role }} ]
        </p>

      </v-col>
    </v-row>
    <v-row justify="center">
    <v-btn
      :color="color"
      dark
      rounded
      @click.stop="dialog = true"
    >
      ยืนยันการออกจากระบบ
    </v-btn>

    <v-dialog
      v-model="dialog"
      max-width="290"
    >
      <v-card>
        <v-card-title class="headline grey lighten-2" primary-title >ยืนยันการออกจากระบบ</v-card-title>
        <v-card-text>
          คุณยืนยันที่จะออกจากระบบหรือไม่ ?
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="dialog = false" >ไม่ใช่</v-btn>
          <v-btn color="green darken-1" text @click="handleLogout" >ใช่</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
  </v-container>
</template>
<script>
import { mapState, mapActions } from "vuex";

export default {
  data: () => ({
    dialog: false,
  }),

  computed: {
    ...mapState({
      account: (state) => state.account,
      user: (state) => state.account.user,
      status: (state) => state.account.status,
      roleAuth: (state) => state.account.user.role,
      vuetify: state => state.vuetify,
    }),

    ...mapState({ alert: (state) => state.alert }),

    color: {
      get() {
        return this.vuetify.primaryDrawer.color
      },
      set(value) {
        this.$store.commit('vuetify/SET_COLOR', value)
      }
    },
  },

  methods: {
    ...mapActions("account", ["login", "logout"]),
    ...mapActions("alert", ["success", "error", "clear"]),

    handleLogout() {
      this.dialog = false;
      this.$router.push('/login');
      this.clear();
      this.logout();
    }
  },
};
</script>
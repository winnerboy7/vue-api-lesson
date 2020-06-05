<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-card class="elevation-12">
          <v-toolbar :color="color" dark flat>
            <v-toolbar-title>ลงชื่อเข้าสู่ระบบ</v-toolbar-title>
            <v-spacer></v-spacer>

            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <v-btn :href="source" icon large target="_blank" v-on="on">
                  <v-icon>mdi-lock</v-icon>
                </v-btn>
              </template>
              <span>Home</span>
            </v-tooltip>
          </v-toolbar>
          <v-card-text>
            <v-alert :type="alert.type" v-if="alert.message" border="left">
              {{ alert.message }}
            </v-alert>

            <v-form
              ref="form"
              v-model="valid"
              :lazy-validation="lazy"
              @keyup.native.enter="valid && handleSubmit($event)"
            >
              <v-text-field
                v-model="username"
                :counter="10"
                :rules="usernameRules"
                label="Username"
                name="username"
                prepend-icon="mdi-account"
                type="text"
                required
              ></v-text-field>

              <v-text-field
                id="password"
                v-model="password"
                :counter="6"
                :rules="passwordRules"
                label="Password"
                name="password"
                prepend-icon="mdi-lock"
                type="password"
                required
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              type="submit"
              :disabled="!valid"
              color="primary"
              class="mr-4"
              @click="handleSubmit"
            >
              เข้าสู่ระบบ
            </v-btn>

            <v-btn color="warning" @click="resetValidation">
              รีเซต
            </v-btn>
          </v-card-actions>
        </v-card>

        <v-dialog v-model="dialog" hide-overlay persistent width="300">
          <v-card color="primary" dark>
            <v-card-text>
              กำลังเข้าสู่ระบบ ...
              <v-progress-linear
                indeterminate
                color="white"
                class="mb-0"
              ></v-progress-linear>
            </v-card-text>
          </v-card>
        </v-dialog>

        <!-- <v-dialog v-model="dialog" width="500">
          <v-card>
            <v-card-title class="headline grey lighten-2" primary-title>
              Privacy Policy
            </v-card-title>

            <v-card-text>
              ยินดีต้อนรับเข้าสู่ระบบ
            </v-card-text>

            <v-divider></v-divider>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" text @click="dialog = false">
                I accept
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog> -->
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { Role } from "@/middlewares/role";

export default {
  props: {
    source: String,
  },

  data: () => ({
    valid: true,
    lazy: false,
    username: "",
    usernameRules: [
      (v) => !!v || "กรุณากรอก Username",
      (v) => (v && v.length >= 4) || "Username อย่างน้อย 4 ตัวอักษร",
    ],
    password: "",
    passwordRules: [
      (v) => !!v || "กรุณากรอก Password",
      (v) => (v && v.length >= 4) || "Password อย่างน้อย 4 ตัวอักษร",
    ],
    email: "",
    emailRules: [
      (v) => !!v || "กรุณากรอก E-mail",
      (v) => /.+@.+\..+/.test(v) || "E-mail ไม่ถูกต้อง",
    ],
    submitted: false,
    dialog: false,
  }),

  computed: {
    ...mapState({
      account: (state) => state.account,
      user: (state) => state.account.user,
      status: (state) => state.account.status,
      roleAuth: (state) => state.account.user.role,
      alert: (state) => state.alert,
      vuetify: state => state.vuetify,
    }),

    color: {
      get() {
        return this.vuetify.primaryDrawer.color
      },
      set(value) {
        this.$store.commit('vuetify/SET_COLOR', value)
      }
    },
  },

  mounted() {
    this.clear();
    this.logout();
  },

  methods: {
    ...mapActions("account", ["login", "logout"]),
    ...mapActions("alert", ["success", "error", "clear"]),

    validate() {
      this.$refs.form.validate();
    },
    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.reset();
      this.$refs.form.resetValidation();
    },

    handleSubmit() {
      this.submitted = true;
      const { username, password } = this;
      if (username && password) {
        this.login({ username, password });
      }
    },
  },

  watch: {
    status() {
      if (this.status.loggedIn) {
        this.dialog = true;
      }
    },
    dialog(val) {
      if (!val) return;
      let _this = this;

      let url = '/'
      if (this.roleAuth === Role.Admin) {
        url = '/admin'
      }
      else if (this.roleAuth === Role.Area) {
        url = '/area'
      }

      setTimeout(function() {
        _this.dialog = false;
        _this.$router.push(url);
      }, 500);
    },
  },
};
</script>

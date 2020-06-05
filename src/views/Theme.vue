<template>
  <div id="app">
    <v-app dark>
      <v-navigation-drawer v-model="drawer" app :mini-variant="miniVariant">
        <v-toolbar dark class="brown darken-3">
          <v-list>
            <v-list-item @click="handleClick">
              <v-list-item-content>
                <v-list-item-title class="title">
                  <v-icon class="mr-2">data_usage</v-icon>ToM Developer
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-toolbar>

        <v-list-item class="px-2" @click="miniVariant = !miniVariant">
          <v-list-item-avatar>
            <img :src="avatar" :title="username" />
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title class="title">
              HRMS 1.0.1
            </v-list-item-title>
            <v-list-item-subtitle>
              กระทรวงศึกษาธิการ
            </v-list-item-subtitle>
          </v-list-item-content>
          <v-btn icon small>
            <v-icon>mdi-chevron-left</v-icon>
          </v-btn>
        </v-list-item>

        <v-divider></v-divider>

        <v-list dense>
          <template v-for="item in items">
            <!-- <v-row v-if="item.heading" :key="item.heading" align="center">
          <v-col cols="6">
            <v-subheader v-if="item.heading">
              {{ item.heading }}
            </v-subheader>
          </v-col>
          <v-col cols="6" class="text-center">
            <a href="#!" class="body-2 black--text">EDIT</a>
          </v-col>
        </v-row> -->

            <v-subheader v-if="item.heading" :key="item.heading">
              {{ item.heading }}
            </v-subheader>

            <v-divider v-else-if="item.divider" :key="item.text"></v-divider>

            <v-list-group
              v-else-if="item.children"
              :key="item.text"
              v-model="item.model"
              :prepend-icon="item.model ? item.icon : item['icon-alt']"
              append-icon="mdi-menu-left"
            >
              <template v-slot:activator>
                <v-list-item-content>
                  <v-list-item-title>
                    {{ item.text }}
                  </v-list-item-title>
                </v-list-item-content>
              </template>
              <v-list-item
                v-for="(child, i) in item.children"
                :key="i"
                :to="child.link"
                link
              >
                <v-list-item-action v-if="child.icon">
                  <v-icon>{{ child.icon }}</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-title>
                    {{ child.text }}
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-group>
            <v-list-item v-else :key="item.text" :to="item.link" link>
              <v-list-item-action>
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>
                  {{ item.text }}
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </template>
        </v-list>
      </v-navigation-drawer>

      <v-app-bar color="brown darken-4" dark :clipped-left="clipped" fixed app>
        <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
        <v-toolbar-title v-text="title" />

        <v-spacer />

        <v-btn icon="icon">
          <v-icon>search</v-icon>
        </v-btn>
        <v-btn icon="icon">
          <v-icon>email</v-icon>
        </v-btn>

        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-btn icon large v-on="on" @click="toggleTheme">
              <v-icon>mdi-palette</v-icon>
            </v-btn>
          </template>
          <span>{{ theme }}</span>
        </v-tooltip>

        <v-menu bottom origin="center center" transition="scale-transition">
          <template v-slot:activator="{ on }">
            <v-btn icon v-on="on">
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </template>

          <v-list>
            <v-list-item
              v-for="(menu, i) in menus"
              :key="i"
              @click="handleMenu(menu.link)"
            >
              <v-list-item-title
                ><v-icon>{{ menu.icon }}</v-icon>
                {{ menu.title }}</v-list-item-title
              >
            </v-list-item>
          </v-list>
        </v-menu>

        <v-avatar class="mr-2" size="36"
          ><img src="http://i.pravatar.cc/150?img=53"
        /></v-avatar>
      </v-app-bar>

      <v-content>
        <v-container class="pa-4" fluid="fluid" grid-list-md="grid-list-md">
          <v-layout wrap="wrap">
            <v-flex xs12="xs12">
              <h1 class="display-1 mb-1">Dashboard</h1>
            </v-flex>
            <v-flex xs12="xs12" md6="md6">
              <v-layout wrap="wrap">
                <v-flex v-for="stat in stats" :key="stat.label" xs6="xs6">
                  <v-card class="text-xs-center" height="100%">
                    <v-card-text>
                      <div class="display-1 mb-2">{{ stat.number }}</div>
                      {{ stat.label }}
                    </v-card-text>
                  </v-card>
                </v-flex>
              </v-layout>
            </v-flex>
            <v-flex md6="md6">
              <v-card height="100%">
                <v-card-title class="grey darken-4">Tasks</v-card-title>
                <v-data-table class="mt-1" :items="tasks">
                  <template slot="items" slot-scope="props">
                    <td>
                      <v-checkbox
                        @click="clickDeleteTask(props.item)"
                      ></v-checkbox>
                    </td>
                    <td>{{ props.item.title }}</td>
                  </template>
                </v-data-table>
              </v-card>
            </v-flex>
            <v-flex xs12="xs12">
              <v-card>
                <v-card-title class="grey darken-4"
                  >New Leads
                  <v-spacer></v-spacer>
                  <v-text-field
                    v-model="newLeadsSearch"
                    append-icon="search"
                    label="Search"
                  ></v-text-field>
                </v-card-title>
                <v-data-table
                  :headers="newLeadsHeaders"
                  :items="newLeads"
                  :search="newLeadsSearch"
                >
                  <template slot="items" slot-scope="props">
                    <td>
                      {{ props.item.firstName }} {{ props.item.lastName }}
                    </td>
                    <td>{{ props.item.email }}</td>
                    <td>{{ props.item.company }}</td>
                  </template>
                </v-data-table>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </v-content>
    </v-app>
  </div>
</template>

<script>
import npmPackage from "../../package.json";
import logo from "@/assets/images/logo-light.png";
import avatar from "@/assets/images/spt_logo.png";

const stats = [
  {
    number: "42",
    label: "New leads this week",
  },
  {
    number: "$8,312",
    label: "Sales this week",
  },
  {
    number: "233",
    label: "New leads this month",
  },
  {
    number: "$24,748",
    label: "Sales this month",
  },
];

const tasks = [
  {
    id: 0,
    title: "Book meeting for Thursday",
  },
  {
    id: 1,
    title: "Review new leads",
  },
  {
    id: 2,
    title: "Be awesome!",
  },
];

const newLeads = [
  {
    firstName: "Giselbert",
    lastName: "Hartness",
    email: "ghartness0@mail.ru",
    company: "Kling LLC",
  },
  {
    firstName: "Honey",
    lastName: "Allon",
    email: "hallon1@epa.gov",
    company: "Rogahn-Hermann",
  },
  {
    firstName: "Tommy",
    lastName: "Rickards",
    email: "trickards2@timesonline.co.uk",
    company: "Kreiger, Wehner and Lubowitz",
  },
  {
    firstName: "Giffy",
    lastName: "Farquharson",
    email: "gfarquharson3@goo.gl",
    company: "Heathcote-Funk",
  },
  {
    firstName: "Rahel",
    lastName: "Matches",
    email: "rmatches4@sfgate.com",
    company: "Maggio, Russel and Feeney",
  },
  {
    firstName: "Krystal",
    lastName: "Natte",
    email: "knatte5@opera.com",
    company: "Sanford-Feeney",
  },
  {
    firstName: "Ronnica",
    lastName: "Galliver",
    email: "rgalliver6@epa.gov",
    company: "Schaefer Group",
  },
  {
    firstName: "Jenny",
    lastName: "Bugge",
    email: "jbugge7@independent.co.uk",
    company: "Gutmann, Miller and Prosacco",
  },
  {
    firstName: "Tracee",
    lastName: "Viscovi",
    email: "tviscovi8@techcrunch.com",
    company: "Anderson, Kohler and Renner",
  },
  {
    firstName: "Teodor",
    lastName: "Fitzsimmons",
    email: "tfitzsimmons9@mediafire.com",
    company: "Durgan-Kovacek",
  },
];

const newLeadsHeaders = [
  {
    text: "Name",
    value: "firstName",
  },
  {
    text: "Email",
    value: "email",
  },
  {
    text: "Company",
    value: "company",
  },
];

export default {
  data: () => ({
    logo,
    avatar,
    username: "ยินดีต้อนรับ",
    version: npmPackage.version,
    title: "Chaimongkol  Khamkom",

    clipped: false,
    drawer: true,
    fixed: true,
    miniVariant: false,

    // เมนู
    items: [
      { icon: "mdi-circle", text: "ยินดีต้อนรับ", link: "/" },
      { icon: "mdi-folder", text: "About", link: "/about" },
      { icon: "mdi-contacts", text: "Contacts", link: "/master" },
      { icon: "mdi-history", text: "Frequently contacted" },
      { icon: "mdi-content-copy", text: "Duplicates", link: "/theme" },
      { icon: "mdi-cog", text: "Settings", link: "/theme2" },
      { icon: "mdi-login", text: "Login", link: "/login" },
      { icon: "mdi-logout", text: "Logout", link: "/logout" },
    ],

    menus: [
      { icon: "mdi-account-star", title: "ชื่อ", link: "/profile" },
      { icon: "mdi-message", title: "ข้อความ", link: "/message" },
      { icon: "mdi-account-key", title: "เปลี่ยนรหัสผ่าน", link: "/password" },
      { icon: "mdi-logout", title: "ออกจากระบบ", link: "/logout" },
    ],

    stats,
    tasks,
    newLeads,
    newLeadsHeaders,
    newLeadsSearch: "",
  }),

  computed: {
    theme() {
      return !this.$vuetify.theme.dark ? "Theme Dark" : "Theme Light";
    },
  },

  methods: {
    clickToggleDrawer() {
      this.drawer = !this.drawer;
    },
    clickDeleteTask(task) {
      const i = this.tasks.indexOf(task);
      this.tasks.splice(i, 1);
    },
    handleClick() {},
    handleMenu(link) {
      this.$router.push(link);
    },
    toggleTheme() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
    },
  },
};
</script>

<style></style>

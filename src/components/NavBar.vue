<template>
    <v-app-bar
      :clipped-left="clipped" 
      app 
      :color="color"
      dark
    >
      <!-- :clipped-left="$vuetify.breakpoint.lgAndUp" -->
      <v-app-bar-nav-icon
        v-if="type !== 'permanent'"
          @click.stop="model = !model"
      ></v-app-bar-nav-icon>

      <!-- <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon> -->
      <v-toolbar-title v-text="title" class="text-uppercase" />
      <!-- <v-toolbar-title style="width: 300px" class="ml-0 pl-4">
        <span class="hidden-sm-and-down">Vuejs Lesson</span>
      </v-toolbar-title> -->
      <v-text-field
        flat
        solo-inverted
        hide-details
        prepend-inner-icon="mdi-magnify"
        label="Search"
        class="hidden-sm-and-down"
        v-if="searchForm"
      ></v-text-field>

      <v-spacer></v-spacer>

      <!-- <v-btn icon>
        <v-icon>mdi-apps</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>mdi-bell</v-icon>
      </v-btn> -->

      <!-- <v-btn text>
        <v-icon>mdi-bell</v-icon>
        Setting
      </v-btn>

      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-btn icon large v-on="on" @click="toggleTheme" >
            <v-icon>mdi-palette</v-icon>
          </v-btn>
        </template>
        <span>{{ theme }}</span>
      </v-tooltip> -->
      
      <v-menu
        v-model="menu"
        :close-on-content-click="false"
        :nudge-width="200"
        bottom
        origin="center center"
        transition="scale-transition"
      >
        <template v-slot:activator="{ on }">
          <v-btn dark v-on="on" icon >
            <v-icon>mdi-cog</v-icon>
          </v-btn>          
        </template>

        <v-card>
          <v-list>
            <v-list-item>
              <v-list-item-avatar>
                <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John">
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title>Chaimongkol Khamkom</v-list-item-title>
                <v-list-item-subtitle>Settings control.</v-list-item-subtitle>
              </v-list-item-content>

              <v-list-item-action>
                <v-btn
                  :class="fav ? 'red--text' : ''"
                  icon
                  @click="fav = !fav"
                >
                  <v-icon>mdi-heart</v-icon>
                </v-btn>
              </v-list-item-action>
            </v-list-item>
          </v-list>

          <v-divider></v-divider>

          <v-card-text>
            <v-row>
              <v-col cols="12" md="6">
                <span>Scheme</span>
                <v-switch
                  v-model="$vuetify.theme.dark"
                  inset
                  color="purple" 
                  label="Dark"
                ></v-switch>
              </v-col>
              <v-col cols="12" md="6">
                <span>Drawer</span>
                <v-radio-group v-model="type" column>
                  <v-radio
                    v-for="drawer in drawers"
                    :key="drawer"
                    :label="drawer"
                    :value="drawer.toLowerCase()"
                    inset
                  ></v-radio>
                </v-radio-group>                
              </v-col> 
            </v-row>
            <v-row>
              <v-col cols="12" md="6">
                <span>Color</span>
                <v-select
                  v-model="color"
                  :items="colors"
                  color="purple"
                ></v-select>
                <span>Footer</span>
                <v-list>
                  <v-list-item>
                    <v-list-item-action>
                      <v-switch
                        v-model="inset"
                        color="purple" 
                        inset
                      ></v-switch>
                    </v-list-item-action>
                    <v-list-item-title>Inset</v-list-item-title>
                  </v-list-item>

                  <v-list-item>
                    <v-list-item-action>
                      <v-switch
                        v-model="fixed"
                        color="purple" 
                        inset
                      ></v-switch>
                    </v-list-item-action>
                    <v-list-item-title>Fixed</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-col>
              <v-col cols="12" md="6">
                <span>Options</span>
                <v-switch
                  v-model="clipped"
                  label="Clipped"
                  inset
                ></v-switch>
                <v-switch
                  v-model="floating"
                  label="Floating"
                  inset
                ></v-switch>
                <v-switch
                  v-model="mini"
                  label="Mini"
                  inset
                ></v-switch>
              </v-col>              
            </v-row>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn text @click="menu = false">Cancel</v-btn>
            <v-btn color="primary" text @click="menu = false">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-menu>

      <v-menu
        bottom
        origin="center center"
        transition="scale-transition"
        v-if="user"
      >
        <template v-slot:activator="{ on }">
          <v-btn
            icon
            v-on="on"
          >
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>        
        </template>
        <v-card>
          <v-list>
            <v-list-item>
              <v-list-item-avatar>
                <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John">
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title>Chaimongkol Khamkom</v-list-item-title>
                <v-list-item-subtitle>Founder of this project</v-list-item-subtitle>
              </v-list-item-content>

              <v-list-item-action>
                <v-btn
                  :class="fav ? 'red--text' : ''"
                  icon
                  @click="fav = !fav"
                >
                  <v-icon>mdi-heart</v-icon>
                </v-btn>
              </v-list-item-action>
            </v-list-item>
          </v-list>

          <v-divider></v-divider>
          <v-list>
            <v-list-item
              v-for="(menu, i) in menus"
              :key="i"
              @click="handleMenu(menu.link)"
            >
              <v-list-item-title><v-icon>{{ menu.icon }}</v-icon> {{ menu.title }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-card>
      </v-menu>

      <!-- <v-btn icon large>
        <v-avatar size="32px" item>
          <v-img
            src="https://cdn.vuetifyjs.com/images/logos/logo.svg"
            alt="Vuetify"
          ></v-img
        ></v-avatar>
      </v-btn> -->

    </v-app-bar>
</template>

<script>
import { mapState, } from "vuex";
import npmPackage from "../../package.json";
import logo from "../assets/images/logo-light.png";
import avatar from "../assets/images/spt_logo.png";

export default {
  props: {
    attrs: {
      type: Object,
      default: () => ({}),
    },
  },

  data: vm => ({
    logo,
    avatar,
    title: npmPackage.description,
    version: npmPackage.version,

    fav: true,
    menu: false,
    initialDark: vm.$vuetify ? vm.$vuetify.theme.dark : false,
    searchForm: false,
    
    drawers: ['Default (no property)', 'Permanent', 'Temporary'],
    colors: [
      'primary',
      'blue',
      'success',
      'red',
      'teal',
      'brown'
    ],

    menus: [
      { icon:'mdi-account-star', title: 'ชื่อ', link: "/profile" },      
      { icon:'mdi-message', title: 'ข้อความ', link: "/message" },
      { icon:'mdi-account-key', title: 'เปลี่ยนรหัสผ่าน', link: "/password" },
      { icon:'mdi-logout', title: 'ออกจากระบบ', link: "/logout" },
    ],
  }),

  beforeDestroy () {
    if (!this.$vuetify) return

    this.$vuetify.theme.dark = this.initialDark
  },

  computed: {
    ...mapState({
      account: state => state.account,
      user: state => state.account.user,
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
    colorLogo: {
      get() {
        return this.vuetify.primaryDrawer.colorLogo
      },
      set(value) {
        this.$store.commit('vuetify/SET_COLOR_LOGO', value)
      }
    },model: {
      get() {
        return this.vuetify.primaryDrawer.model
      },
      set(value) {
        this.$store.commit('vuetify/SET_MODEL', value)
      }
    },
    type: {
      get() {
        return this.vuetify.primaryDrawer.type
      },
      set(value) {
        this.$store.commit('vuetify/SET_TYPE', value)
      }
    },
    clipped: {
      get() {
        return this.vuetify.primaryDrawer.clipped
      },
      set(value) {
        this.$store.commit('vuetify/SET_CLIPPED', value)
      }
    },
    floating: {
      get() {
        return this.vuetify.primaryDrawer.floating
      },
      set(value) {
        this.$store.commit('vuetify/SET_FLOATING', value)
      }
    },
    mini: {
      get() {
        return this.vuetify.primaryDrawer.mini
      },
      set(value) {
        this.$store.commit('vuetify/SET_MINI', value)
      }
    },
    inset: {
      get() {
        return this.vuetify.footer.inset
      },
      set(value) {
        this.$store.commit('vuetify/SET_FOOTER_INSET', value)
      }
    },
    fixed: {
      get() {
        return this.vuetify.footer.fixed
      },
      set(value) {
        this.$store.commit('vuetify/SET_FOOTER_FIXED', value)
      }
    },

    theme() {
      return !this.$vuetify.theme.dark ? 'Theme Dark' : 'Theme Light'
    }
  },

  methods: {
    handleMenu(link){
      this.$router.push(link)
    },
    toggleTheme() {
        this.$vuetify.theme.dark = !this.$vuetify.theme.dark;      
    },
  },

  watch: {
    color: function() {
      this.colorLogo = `${this.color} darken-3`
    },
  },

  created() {
    // console.log('CREATED');    
  },

  mounted() {
    // console.log('MOUNTED')
    if(this.user){
      this.menus[0].title = this.user.name;
    }
  },
};
</script>

<style></style>

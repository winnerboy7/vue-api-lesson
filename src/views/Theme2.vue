<template>
  <div id="app">
    <v-app id="inspire">
      <v-navigation-drawer
        v-model="primaryDrawer.model"
        :clipped="primaryDrawer.clipped"
        :floating="primaryDrawer.floating"
        :mini-variant="primaryDrawer.mini"
        :permanent="primaryDrawer.type === 'permanent'"
        :temporary="primaryDrawer.type === 'temporary'"
        app
        overflow
      >
        <v-toolbar dark :color="colorLogo">
          <v-list>
            <v-list-item @click="handleClick">
              <v-list-item-content>
                <v-list-item-title class="title">                  
                  <v-avatar size="32px" item>
                    <v-img
                      src="https://cdn.vuetifyjs.com/images/logos/logo.svg"
                      alt="Vuetify"
                    ></v-img
                  ></v-avatar>                  
                  ToM Developer
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-toolbar>

        <v-list-item class="px-2" @click="primaryDrawer.mini = !primaryDrawer.mini">
          <v-list-item-avatar>
            <img :src="avatar" :title="username"/>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title class="title">
              HRMS {{ version }} 
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

            <v-subheader
              v-if="item.heading"
              :key="item.heading"
            >
              {{ item.heading }}
            </v-subheader>

            <v-divider
              v-else-if="item.divider"
              :key="item.text"
            ></v-divider>

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

      <v-app-bar 
        :clipped-left="primaryDrawer.clipped" 
        app 
        :color="color"
        dark
      >
        <v-app-bar-nav-icon
          v-if="primaryDrawer.type !== 'permanent'"
          @click.stop="primaryDrawer.model = !primaryDrawer.model"
        ></v-app-bar-nav-icon>
        <v-toolbar-title v-text="title" />

        <v-spacer></v-spacer>

        <v-menu
          v-model="menu"
          :close-on-content-click="false"
          :nudge-width="200"
          offset-x
        >
          <template v-slot:activator="{ on }">
            <v-btn
              dark
              v-on="on"
              text
            >
              Menu Setting
            </v-btn>
          </template>

          <v-card>
            <v-list>
              <v-list-item>
                <v-list-item-avatar>
                  <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John">
                </v-list-item-avatar>

                <v-list-item-content>
                  <v-list-item-title>John Leider</v-list-item-title>
                  <v-list-item-subtitle>Founder of Vuetify.js</v-list-item-subtitle>
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
              <v-list-item>
                <v-list-item-action>
                  <v-select
                    v-model="color"
                    :items="colors"
                    label="Color"
                  ></v-select>
                </v-list-item-action>              
              </v-list-item>

              <v-list-item>
                <v-col cols="12" md="6">                  
                    <span>Drawer</span>
                    <v-radio-group v-model="primaryDrawer.type" column>
                      <v-radio
                        v-for="drawer in drawers"
                        :key="drawer"
                        :label="drawer"
                        :value="drawer.toLowerCase()"
                        primary
                      ></v-radio>
                    </v-radio-group>
                </v-col>
              </v-list-item>

              <v-list-item>
                <v-list-item-action>
                  <v-switch v-model="primaryDrawer.clipped" color="purple" inset></v-switch>
                </v-list-item-action>
                <v-list-item-title>Clipped</v-list-item-title>
              </v-list-item>

              <v-list-item>
                <v-list-item-action>
                  <v-switch v-model="primaryDrawer.floating" color="purple" inset></v-switch>
                </v-list-item-action>
                <v-list-item-title>Floating</v-list-item-title>
              </v-list-item>

              <v-list-item>
                <v-list-item-action>
                  <v-switch v-model="primaryDrawer.mini" color="purple" inset></v-switch>
                </v-list-item-action>
                <v-list-item-title>Mini</v-list-item-title>
              </v-list-item>

              <v-list-item>
                <v-list-item-action>
                  <v-switch v-model="message" color="purple" inset></v-switch>
                </v-list-item-action>
                <v-list-item-title>Enable messages</v-list-item-title>
              </v-list-item>

              <v-list-item>
                <v-list-item-action>
                  <v-switch v-model="hints" color="purple" inset></v-switch>
                </v-list-item-action>
                <v-list-item-title>Enable hints</v-list-item-title>
              </v-list-item>

              <v-list-item>
                <v-list-item-action>
                  <v-switch v-model="$vuetify.theme.dark" hide-details inset></v-switch>
                </v-list-item-action>
                <v-list-item-title>Theme Dark</v-list-item-title>
              </v-list-item>
              
              <v-list-item>
                <v-list-item-action>
                  <v-switch
                    v-model="footer.inset"
                    primary
                    inset
                  ></v-switch>
                </v-list-item-action>
                <v-list-item-title>Footer Inset</v-list-item-title>
              </v-list-item>
            </v-list>

            <v-card-actions>
              <v-spacer></v-spacer>

              <v-btn text @click="menu = false">Cancel</v-btn>
              <v-btn color="primary" text @click="menu = false">Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-menu>
        
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-btn icon large v-on="on" @click="toggleTheme" >
              <v-icon>mdi-palette</v-icon>
            </v-btn>
          </template>
          <span>{{ theme }}</span>
        </v-tooltip>

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

          <v-list>
            <v-list-item
              v-for="(menu, i) in menus"
              :key="i"
              @click="handleMenu(menu.link)"
            >
              <v-list-item-title><v-icon>{{ menu.icon }}</v-icon> {{ menu.title }}</v-list-item-title>
            </v-list-item>
          </v-list>
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

      <v-content>
        <v-container fluid>
          <v-row align="center" justify="center">
            <v-col cols="10">
              <v-card>
                <v-card-text>
                  <v-row>
                    <v-col cols="12" md="6">
                      <span>Scheme</span>
                      <v-switch
                        v-model="$vuetify.theme.dark"
                        primary
                        label="Dark"
                      ></v-switch>
                    </v-col>
                    <v-col cols="12" md="6">
                      <span>Drawer</span>
                      <v-radio-group v-model="primaryDrawer.type" column>
                        <v-radio
                          v-for="drawer in drawers"
                          :key="drawer"
                          :label="drawer"
                          :value="drawer.toLowerCase()"
                          primary
                        ></v-radio>
                      </v-radio-group>
                      <v-switch
                        v-model="primaryDrawer.clipped"
                        label="Clipped"
                        primary
                      ></v-switch>
                      <v-switch
                        v-model="primaryDrawer.floating"
                        label="Floating"
                        primary
                      ></v-switch>
                      <v-switch
                        v-model="primaryDrawer.mini"
                        label="Mini"
                        primary
                      ></v-switch>
                    </v-col>
                    <v-col cols="12" md="6">
                      <span>Footer Inset</span>
                      <v-switch
                        v-model="footer.inset"
                        label="Inset"
                        primary
                      ></v-switch>
                    </v-col>
                    <v-col cols="12" md="6">
                      <span>Footer Fixed</span>
                      <v-switch
                        v-model="footer.fixed"
                        label="Fixed"
                        primary
                      ></v-switch>
                    </v-col>
                  </v-row>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn text>Cancel</v-btn>
                  <v-btn text color="primary">Submit</v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>

          <v-row justify="space-around">
            <v-date-picker
              v-model="picker"
              :first-day-of-week="0"
              locale="th-th"
              :landscape="$vuetify.breakpoint.smAndUp"
            ></v-date-picker>
            {{ picker }}
            <v-date-picker
              v-model="picker"
              :first-day-of-week="1"
            ></v-date-picker>
          </v-row>

        </v-container>
      </v-content>

      <v-footer :inset="footer.inset" app>
        <span class="px-4">&copy; {{ new Date().getFullYear() }}</span>
        <strong>Chaimongkol developer studio.</strong>
      </v-footer>
    </v-app>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import npmPackage from "../../package.json";
import logo from "../assets/images/logo-light.png";
import avatar from "../assets/images/spt_logo.png";

export default {
  props: {
    layout: String,
  },

  data: vm => ({
    logo,
    avatar,
    title: npmPackage.description,
    version: npmPackage.version,
    username: "ยินดีต้อนรับ",
    picker: new Date().toISOString().substr(0, 10),

    fav: true,
    menu: false,
    message: false,
    hints: true,
    initialDark: vm.$vuetify ? vm.$vuetify.theme.dark : false,

    drawers: ['Default (no property)', 'Permanent', 'Temporary'],
    primaryDrawer: {
      model: null,
      type: 'default (no property)',
      clipped: false,
      floating: false,
      mini: false,
    },
    footer: {
      inset: false,
    },

    color: 'primary',
    colorLogo: 'blue darken-3',
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

    // เมนู
    items: [],
    // เมนูหลัก
    main_menu: [
      { icon: "mdi-circle", text: "ยินดีต้อนรับ", link: "/" },
      { icon: 'mdi-folder', text: 'About', link: '/about', },
      { icon: "mdi-contacts", text: "Contacts", link: "/master" },
      { icon: "mdi-history", text: "Frequently contacted" },
      { icon: "mdi-content-copy", text: "Duplicates", link: "/theme" },
      { icon: "mdi-cog", text: "Settings", link: "/theme2" },
      { icon: "mdi-login", text: "Login" , link: "/login"},
      { icon: "mdi-logout", text: "Logout" , link: "/logout"},
    ],

    // เมนูเจ้าหน้าที่ สพท.
    area_menu: [
      { icon: 'mdi-home', text: 'Home', link: '/area', },
      { icon: "mdi-chart-areaspline", text: "แดชบอร์ด", link: "/area/dashboard", },      
      { divider: true, },
      { heading: "#เมนูหลัก", },
      {
        icon: "mdi-chevron-up",
        "icon-alt": "mdi-chevron-down",
        text: "งานทะเบียนประวัติ",
        model: false,
        children: [
          { icon: "mdi-account-box", text: "ทะเบียนครูและบุคลากร", link: "/area/teacher" },
          { icon: "mdi-account-box", text: "ทะเบียนบุคลากรใน สพท.", link: "/area/personel" },
          { icon: "mdi-account-box", text: "เพิ่มประวัติครู/บุคลากร", link: "/area/teacher/add" },
          { icon: "mdi-account-box", text: "ปรับปรุงประวัติครู/บุคลากร", link: "/area/teacher/update" },
          { icon: "mdi-account-box", text: "ตรวจสอบความสมบูรณ์", link: "/area/teacher/checking" },
          { icon: "mdi-account-box", text: "นำเข้าข้อมูลครู/บุคลากร (cgd)", link: "/area/cgd_import" },
          { icon: "mdi-account-box", text: "ส่งออกข้อมูลครู/บุคลากร", link: "/area/export" },
        ],
      },
      {
        icon: "mdi-chevron-up",
        "icon-alt": "mdi-chevron-down",
        text: "งานอัตรากำลัง",
        model: false,
        children: [
          { icon: "mdi-book-open", text: "เกณฑ์อัตรากำลัง", link: "/area/j18" },
          { icon: "mdi-book-open", text: "ตำแหน่ง/ระบบจ่ายตรง", link: "/area/cgd_position" },
        ],
      },
      {
        icon: "mdi-chevron-up",
        "icon-alt": "mdi-chevron-down",
        text: "งานสรรหาบุคคล",
        model: false,
        children: [
          { icon: "mdi-book-open", text: "สรรหาและบรรจุ", link: "/area/recruitment" },
          { icon: "mdi-book-open", text: "แต่งตั้งโยกย้าย", link: "/area/removal" },
          { icon: "mdi-book-open", text: "ออกจากราชการ", link: "/area/retirement" },
        ],
      },      
      {
        icon: "mdi-chevron-up",
        "icon-alt": "mdi-chevron-down",
        text: "งานเครื่องราชอิสริยาภรณ์",
        model: false,
        children: [
          { icon: "mdi-book-open", text: "การขอเครื่องราชฯ", link: "/area/insignia_form" },
          { icon: "mdi-book-open", text: "ตรวจสอบคุณสมบัติ", link: "/area/insignia_checking" },
          { icon: "mdi-book-open", text: "บันทึกการได้รับฯ", link: "/area/insignia_regist" },
          { icon: "mdi-book-open", text: "รายงานเครื่องราชฯ", link: "/area/insignia_report" },
        ],
      },      
      {
        icon: "mdi-chevron-up",
        "icon-alt": "mdi-chevron-down",
        text: "รายงาน",
        model: false,
        children: [
          { icon: "mdi-chart-bar", text: "ข้อมูลครูและบุคลากร", link: "/area/report_teacher" },
          { icon: "mdi-chart-bar", text: "ข้อมูลผู้บริหาร", link: "/area/report_director" },
          { icon: "mdi-chart-bar", text: "ข้อมูลบุคลากรใน สพท.", link: "/area/report_personel" },
          { icon: "mdi-chart-bar", text: "ข้อมูลเกษียณราชการ", link: "/area/report_retire" },
        ],
      },
      { divider: true, },
      { heading: "#ตัวเลือก", },
      { icon: "mdi-sitemap", text: "ข้อมูลสำนักงานเขตฯ", link: "/area/info", },
      { icon: "mdi-school", text: "โรงเรียนในสังกัด", link: "/area/schools" },
      { icon: "mdi-account-key", text: "ข้อมูลส่วนตัว", link: "/area/profile" },
      { icon: "mdi-exit-to-app", text: "ออกจากระบบ", link: "/logout" },
    ],
    
    // เมนูผู้ดูแลระบบ
    admin_menu: [      
      { icon: 'mdi-home', text: 'Home', link: '/admin', },
      { icon: "mdi-chart-areaspline", text: "แดชบอร์ด", link: "/admin/dashboard", },
      { icon: "mdi-chart-areaspline", text: "โปรเจค", link: "/admin/project", },
      { icon: "mdi-chart-areaspline", text: "ทีม", link: "/admin/team", },
      {
        icon: "mdi-chevron-up",
        "icon-alt": "mdi-chevron-down",
        text: "รายงาน",
        model: false,
        children: [
          { icon: "mdi-chart-bar", text: "รายงาน 1", link: "/admin/teacher" },
          { icon: "mdi-chart-bar", text: "รายงาน 2", link: "/admin/personel" },
          { icon: "mdi-chart-bar", text: "รายงาน 3", link: "/admin/info" }
        ]
      },
      { icon: "mdi-sitemap", text: "สำนักงานเขตพื้นที่การศึกษา", link: "/admin/areas" },
      { icon: "mdi-school", text: "โรงเรียน", link: "/admin/schools" },
      { icon: "mdi-account-network", text: "ครูและบุคลากรทางการศึกษา", link: "/admin/teachers" },
      { icon: "mdi-account-star", text: "บุคลากรในสำนักงานเขตฯ", link: "/admin/personels" },
      { icon: "mdi-account-settings", text: "ผู้ใช้งานระบบ", link: "/admin/users" },
      { icon: "mdi-cogs", text: "ตั้งค่าระบบ", link: "/admin/setting" },
      { icon: "mdi-account-key", text: "ข้อมูลส่วนตัว", link: "/admin/profile" },
      { icon: "mdi-exit-to-app", text: "ออกจากระบบ", link: "/logout" }
    ],

  }),

  methods: {
    ...mapActions("account", ["login", "logout"]),
    ...mapActions("alert", ["success", "error", "clear"]),
    handleLogout() {
      this.$router.push("/login");
    },

    getMenu() {
      if(this.account.status.loggedIn){
        this.username = this.account.user.name;
        if (this.account.user.role === 'Admin'){
          this.items = this.admin_menu;
        }
        else if (this.account.user.role === 'Area'){
          this.items = this.area_menu;
        }
      }
      else {
        this.username = 'ยินดีต้อนรับ';
        this.items = this.main_menu;
      }
    },
    handleClick() {

    },

    handleMenu(link){
      this.$router.push(link)
    },
    toggleTheme() {
        this.$vuetify.theme.dark = !this.$vuetify.theme.dark;      
    },
  },

  computed: {
    ...mapState({
      account: state => state.account,
      user: state => state.account.user
    }),

    theme() {
      return !this.$vuetify.theme.dark ? 'Theme Dark' : 'Theme Light'
    }
  },

  beforeDestroy () {
    if (!this.$vuetify) return

    this.$vuetify.theme.dark = this.initialDark
  },

  watch: {
    user: function() {
      // console.log('User=> ',this.user )
      this.getMenu();
    },

    color: function() {
      this.colorLogo = `${this.color} darken-3`
    },
  },

  created() {
    // console.log('CREATED');
    this.drawer = this.layout == 'Simple' ? false : true;
    this.getMenu();
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

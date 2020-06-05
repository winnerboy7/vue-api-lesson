<template>
  <v-navigation-drawer
    v-model="model"
    :clipped="clipped"
    :floating="floating"
    :mini-variant="mini"
    :permanent="type === 'permanent'"
    :temporary="type === 'temporary'"
    app
    overflow
  >
    <!-- :clipped="$vuetify.breakpoint.lgAndUp" -->
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

    <v-list-item class="px-2" @click="mini = !mini">
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
</template>

<script>
import { mapState, mapActions } from "vuex";

import npmPackage from "../../package.json";
import logo from "@/assets/images/logo-light.png";
import avatar from "@/assets/images/spt_logo.png";

export default {
  props: {
    layout: String,
  },

  data: () => ({    
    logo,
    avatar,
    username: "ยินดีต้อนรับ",
    version: npmPackage.version,

    drawers: ['Default (no property)', 'Permanent', 'Temporary'],
    // primaryDrawer: {
    //   color: 'primary',
    //   colorLogo: 'blue darken-3',
    //   model: null,
    //   type: 'default (no property)',
    //   clipped: false,
    //   floating: false,
    //   mini: false,
    // },
    // footer: {
    //   inset: false,
    //   fixed: false,
    // },

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
  },

  created() {
    // console.log('CREATED');
    this.model = this.layout == 'Simple' ? false : true;
    this.getMenu();
  },

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

    }
  },

  watch: {
    user: function() {
      // console.log('User=> ',this.user )
      this.getMenu();
    }
  }

  // mounted() {
  //   console.log('MOUNTED')
  // },
};
</script>

<style></style>

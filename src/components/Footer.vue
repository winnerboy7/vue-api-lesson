<template>
  <v-footer :color="colorFooter" app :inset="inset" :fixed="fixed" padless>
    <v-row justify="center" no-gutters>
      <v-btn
        v-for="item in items"
        :key="item.text"
        color="white"
        text
        rounded
        class="my-2"
        :to="item.link"
        link
      >
        {{ item.text }}
      </v-btn>

      <v-col :class="colorFooterDev" class="py-4 text-center white--text" cols="12">
        &copy; {{ new Date().getFullYear() }} —
        <strong>Chaimongkol developer studio.</strong>
      </v-col>
    </v-row>
  </v-footer>
</template>

<script>
import { mapState } from "vuex";
export default {
  data: () => ({
    // footer: {
    //   inset: false,
    //   fixed: false,
    // },

    items: [
      { text: "Home", link: "/" },
      { text: "About Us", link: "/about" },
      { text: "Team", link: "/team" },
      { text: "Services", link: "/services" },
      { text: "Blog", link: "/blog" },
      { text: "Contact Us", link: "/contact" },
      { text: "Login", link: "/login" },
    ],
  }),

  computed: {
     ...mapState({
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
    },
    colorFooter: {
      get() {
        return this.vuetify.footer.color
      },
      set(value) {
        this.$store.commit('vuetify/SET_COLOR_FOOTER', value)
      }
    },
    colorFooterDev: {
      get() {
        return this.vuetify.footer.colorDev
      },
      set(value) {
        this.$store.commit('vuetify/SET_COLOR_FOOTERDEV', value)
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

  watch: {
    color: function() {
      this.colorLogo = `${this.color} darken-3`
      this.colorFooter = `${this.color} lighten-1`
      this.colorFooterDev = `${this.color} lighten-2`
    },
  },
};
</script>

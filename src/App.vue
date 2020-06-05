<template>
  <v-app>
    <component :is="layout">
      <router-view></router-view>
    </component>
  </v-app>
</template>

<script>
const default_layout = "app";

export default {
  name: "App",

  computed: {
    layout() {
      // console.log(`Layout : ${this.$route.meta.layout || default_layout}-layout`)
      return (this.$route.meta.layout || default_layout) + "-layout";
    },
  },

  components: {
  },

  props: {
    source: String,
  },

  data: () => ({}),
};
</script>

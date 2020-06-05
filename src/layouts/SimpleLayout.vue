<template>
  <v-app id="inspire">
    <SideBar layout="Simple" ></SideBar>

    <NavBar></NavBar>

    <v-content>
      <slot></slot>
    </v-content>

    <Footer></Footer>
  </v-app>
</template>

<script>
import NavBar from '@/components/NavBar'
import SideBar from '@/components/SideBar'
import Footer from '@/components/Footer'

export default {
  name: "Simple",

  components: {
    NavBar,
    SideBar,
    Footer,
  },

  props: {
    source: String,
  },

  data: () => ({    
  }),
};
</script>

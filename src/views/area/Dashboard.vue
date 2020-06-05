<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h1>Area Dashboard</h1>

        <v-container>
          <v-layout row wrap>
            <v-flex xs12 sm6 md3 v-for="card in cards" :key="card.title">
              <v-card class="text-xs-center ma-2">
                <v-row class="no-gutters">
                  <div class="col-auto">
                    <div class="cyan fill-height">&nbsp;</div>
                  </div>
                  <div class="col pa-3 py-4 cyan--text">
                    <h5 class="text-truncate text-uppercase">{{ card.title }}</h5>
                    <h1>{{ card.counter }}</h1>
                  </div>
                </v-row>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
        
      </v-col>
    </v-row>
  </v-container>
  
</template>

<script>
import { mapState } from "vuex";
// import AppHeader from "@/components/pages/AppHeader";
import { areaController, schoolController, teacherController } from "@/controllers";

export default {
  // layout: "area",
  // components: {
  //   AppHeader
  // },
  // middleware: "authorize-area",

  data() {
    return {
      cards: [
        { title: 'เขตพื้นที่การศึกษา', src: 'https://cdn.vuetifyjs.com/images/cards/house.jpg', counter:0, flex: 3 },
        { title: 'โรงเรียน', src: 'https://cdn.vuetifyjs.com/images/cards/road.jpg', counter:0, flex: 3 },
        { title: 'ข้าราชการครู', src: 'https://cdn.vuetifyjs.com/images/cards/plane.jpg', counter:0, flex: 3 },
        { title: 'บุคลากรทางการศึกษา', src: 'https://cdn.vuetifyjs.com/images/cards/plane.jpg', counter:0, flex: 3 },
      ],
      title: "ผู้ดูแลระบบ",
      cntArea: 0,
      cntSchool: 0,
      cntTeacher: 0,
      cntTeacherAll: 0
    };
  },

  computed: {
    ...mapState({
      account: state => state.account
    })
  },

  created() {
    this.countArea();
    this.countSchool();
    this.countTeacher();
    this.countTeacherAll();
  },
  
  methods: {
    async countArea() {
      let { count } = await areaController.countArea();
      this.cntArea = count;
      this.cards[0].counter = this.cntArea;
    },

    async countSchool() {
      let { count } = await schoolController.countSchool();
      this.cntSchool = count;
      this.cards[1].counter = this.cntSchool;
    },

    async countTeacher() {
      let { count } = await teacherController.countTeacher("", 10);
      this.cntTeacher = count;
      this.cards[2].counter = this.cntTeacher;
    },
    async countTeacherAll() {
      let { count } = await teacherController.countTeacher();
      this.cntTeacherAll = count;
      this.cards[3].counter = this.cntTeacherAll;
    }
  }
};
</script>

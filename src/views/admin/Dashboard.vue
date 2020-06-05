<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h1>Admin Dashboard</h1>

        <v-container>
          <v-layout row wrap>
            <v-flex xs12 sm6 md3 v-for="card in cards" :key="card.title">
              <v-card class="text-xs-center ma-2">
                <v-row class="no-gutters">
                  <div class="col-auto">
                    <div class="cyan fill-height">&nbsp;</div>
                  </div>
                  <div class="col pa-3 py-4 cyan--text">
                    <h5 class="text-truncate text-uppercase">
                      {{ card.title }}
                    </h5>
                    <h1>{{ card.counter }}</h1>
                  </div>
                </v-row>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>

        <v-container>
          <v-layout row wrap>
            <v-flex sm6 xs12 md6 lg3>
              <v-card class="ma-3">
                <v-list-item>
                  <v-list-item-avatar tile class="mt-n7">
                    <v-sheet
                      color="green"
                      width="80"
                      height="80"
                      elevation="10"
                    >
                      <v-icon dark large>store</v-icon>
                    </v-sheet>
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <div class="overline text-right">Article</div>
                    <v-list-item-title class="headline mb-1 text-right"
                      >523614</v-list-item-title
                    >
                    <div><v-divider></v-divider></div>
                  </v-list-item-content>
                </v-list-item>
                <v-card-actions>
                  <v-icon text class="ma-2">person</v-icon>
                  <div class="overline">Iyad</div>
                </v-card-actions>
              </v-card>
            </v-flex>
            <v-flex sm6 xs12 md6 lg3>
              <v-card class="ma-3">
                <v-list-item>
                  <v-list-item-avatar tile class="mt-n7">
                    <v-sheet
                      color="#F44336"
                      width="80"
                      height="80"
                      elevation="10"
                    >
                      <v-icon dark large>subscriptions</v-icon>
                    </v-sheet>
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <div class="overline text-right">Abonné</div>
                    <v-list-item-title class="headline mb-1 text-right"
                      >+700</v-list-item-title
                    >
                    <div><v-divider></v-divider></div>
                  </v-list-item-content>
                </v-list-item>
                <v-card-actions>
                  <v-icon text class="ma-2">subscriptions</v-icon>
                  <div class="overline">AAE IdeaPro</div>
                </v-card-actions>
              </v-card>
            </v-flex>
            <v-flex sm6 xs12 md6 lg3>
              <v-card class="ma-3">
                <v-list-item>
                  <v-list-item-avatar tile class="mt-n7">
                    <v-sheet
                      color="#03A9F4"
                      width="80"
                      height="80"
                      elevation="10"
                    >
                      <v-icon dark large>add_shopping_cart</v-icon>
                    </v-sheet>
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <div class="overline text-right">Shopping</div>
                    <v-list-item-title class="headline mb-1 text-right"
                      >$34,245</v-list-item-title
                    >
                    <div><v-divider></v-divider></div>
                  </v-list-item-content>
                </v-list-item>
                <v-card-actions>
                  <v-icon text class="ma-2">credit_card</v-icon>
                  <div class="overline">VISA Card</div>
                </v-card-actions>
              </v-card>
            </v-flex>
            <v-flex sm6 xs12 md6 lg3>
              <v-card class="ma-3">
                <v-list-item>
                  <v-list-item-avatar tile class="mt-n7">
                    <v-sheet
                      color="#FFC107"
                      width="80"
                      height="80"
                      elevation="10"
                    >
                      <v-icon dark large>folder_shared</v-icon>
                    </v-sheet>
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <div class="overline text-right">Folder shared</div>
                    <v-list-item-title class="headline mb-1 text-right"
                      >1730</v-list-item-title
                    >
                    <div><v-divider></v-divider></div>
                  </v-list-item-content>
                </v-list-item>
                <v-card-actions>
                  <v-icon text class="ma-2">folder</v-icon>
                  <div class="overline">Prodect</div>
                </v-card-actions>
              </v-card>
            </v-flex>
            <v-flex xs12 sm6 md4 lg3 v-for="person in team" :key="person.name">
              <v-card class="text-center ma-3">
                <v-responsive class="pt-4">
                  <v-avatar size="100" class="red lighten-2">
                    <img :src="person.avatar" alt="" />
                  </v-avatar>
                </v-responsive>
                <v-card-text>
                  <div class="subheading">{{ person.name }}</div>
                  <div class="grey--text">{{ person.role }}</div>
                </v-card-text>
                <v-card-actions>
                  <v-btn outlined color="orange">
                    <v-icon small left>message</v-icon>
                    <span>Message</span>
                  </v-btn>
                </v-card-actions>
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
import {
  areaController,
  schoolController,
  teacherController,
} from "@/controllers";

export default {
  // layout: "admin",
  // components: {
  //   AppHeader
  // },
  // middleware: "authorize-admin",

  data() {
    return {
      team: [
        { name: "ชัยมงคล  ขำคม", role: "web developer", avatar: "/img1.png" },
        { name: "สนิท  คะแก้ว", role: "Graphic designer", avatar: "/img2.png" },
        { name: "อภินันท์  กินรี", role: "web developer", avatar: "/img3.png" },
        { name: "ชาญเดช  สุริยภูมิ", role: "Desktop developer", avatar: "/img4.png", },
      ],
      cards: [
        {
          title: "เขตพื้นที่การศึกษา",
          src: "https://cdn.vuetifyjs.com/images/cards/house.jpg",
          counter: 0,
          flex: 3,
        },
        {
          title: "โรงเรียน",
          src: "https://cdn.vuetifyjs.com/images/cards/road.jpg",
          counter: 0,
          flex: 3,
        },
        {
          title: "ข้าราชการครู",
          src: "https://cdn.vuetifyjs.com/images/cards/plane.jpg",
          counter: 0,
          flex: 3,
        },
        {
          title: "บุคลากรทางการศึกษา",
          src: "https://cdn.vuetifyjs.com/images/cards/plane.jpg",
          counter: 0,
          flex: 3,
        },
      ],
      title: "ผู้ดูแลระบบ",
      cntArea: 0,
      cntSchool: 0,
      cntTeacher: 0,
      cntTeacherAll: 0,
    };
  },

  computed: {
    ...mapState({
      account: (state) => state.account,
    }),
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
    },
  },
};
</script>

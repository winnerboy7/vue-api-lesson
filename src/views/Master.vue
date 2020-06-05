<template>
  <div>
    <h1>Hi {{ account.user.name }}!</h1>
    
    <em v-if="users.loading">Loading users...</em>
    <span v-if="users.error" class="text-danger">ERROR: {{ users.error }}</span>
    <ul v-if="users">
      <li v-for="user in users" :key="user.id">
        {{ user.username + " " + user.name }}
      </li>
    </ul>
    <p>
      <router-link to="/login">Logout</router-link>
    </p>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { userController } from "@/controllers";

export default {
  data: () => ({
    users: [],
  }),

  computed: {
    ...mapState({
      account: (state) => state.account,
    }),
  },
  created() {
    this.getUsers();
  },
  methods: {
    async getUsers() {
      try {
        this.users = await userController.getAll();
      } catch (error) {
        console.log(error);
      }
    }, 
  },
};
</script>

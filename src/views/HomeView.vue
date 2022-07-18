<template>
  <v-container>
    <!-- ----------------  layout ------------- -->
    <v-layout row wrap>
      <v-flex xs12 sm6 class="text-center text-sm-right" grow>
        <v-btn
          large
          router
          to="/view_meetups"
          class="info text-uppercase my-4 my-sm-5 mx-4"
          >explore meetups</v-btn
        >
      </v-flex>

      <v-flex xs12 sm6 class="text-center text-sm-left mt-sm-5">
        <v-btn
          large
          router
          to="/organize_meetup"
          class="info text-uppercase mx-4"
          >organize meetup</v-btn
        >
      </v-flex>
    </v-layout>

    <!-- ----------------  carousel ------------- -->

    <v-carousel height="400" show-arrows-on-hover class="mt-8">
      <template v-slot:prev="{ on, attrs }">
        <v-btn class="d-none d-sm-block" color="info" v-bind="attrs" v-on="on"
          >Previous</v-btn
        >
      </template>
      <template v-slot:next="{ on, attrs }">
        <v-btn class="d-none d-sm-block" color="info" v-bind="attrs" v-on="on"
          >Next</v-btn
        >
      </template>
      <v-carousel-item
        v-for="meetup in meetups"
        :key="meetup.id"
        :src="meetup.image_URL"
        link
        router
        :to="`/view_meetups/${meetup.id}`"
      >
      </v-carousel-item>
    </v-carousel>
  </v-container>
</template>

<script>
import axios from "axios";
export default {
  name: "Home-view",
  data() {
    return {
      meetups: [
        {
          id: 1,
          image_URL:
            "https://www.planetware.com/wpimages/2019/04/morocco-marrakesh-top-attractions-djemaa-el-fna.jpg",
          title: "visit in Morocco ",
          location: " marakech morocco ",
          due: "17th jan 2029",
          desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam rerum qui alias cumque delectus accusantium eum! Veniam eum cumque autem aliquid voluptates, laborum numquam non voluptas inventore recusandae placeat ",
        },
      ],
    };
  },
  async mounted() {
    // check if user login
    if (localStorage.getItem("user")) {
      this.$store.commit("links", [
        {
          icon: "home",
          content: "home",
          router_link: "/",
        },
        {
          icon: "mdi-folder-multiple-image",
          content: "view meetups",
          router_link: "/view_meetups",
        },
        {
          icon: "room",
          content: "organize meetup",
          router_link: "/organize_meetup",
        },
        {
          icon: "person",
          content: "profile",
          router_link: "/profile",
        },
        {
          icon: "exit_to_app",
          content: "logout",
          router_link: "/log_out",
        },
      ]);

      //meetups
      await axios
        .get(
          `http://localhost:7000/meetups/?email=${
            JSON.parse(localStorage.getItem("user"))[0].email
          }`
        )
        .then((val) => {
          if (val.data.length) {
            this.meetups = val.data.slice(-3);
          }
        });
    }
  },
};
</script>

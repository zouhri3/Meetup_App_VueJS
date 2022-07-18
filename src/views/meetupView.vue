<template>
  <v-container class="mt-2">
    <v-layout row wrap>
      <v-flex xs12>
        <v-card class="mx-4 mb-4">
          <v-img height="250" :src="meetup.image_URL"></v-img>
          <v-card-title class="text-3 text-uppercase primary--text">{{
            meetup.title
          }}</v-card-title>
          <v-card-subtitle class="info--text pb-2 text-capitalize">
            <span>{{ meetup.due }} </span> - <span>{{ meetup.location }}</span>
          </v-card-subtitle>
          <v-card-text>{{ meetup.desc }} </v-card-text>
          <v-card-actions>
            <v-btn class="ms-auto me-3 mb-3" color="primary">
              <v-icon>mdi-bookmark-check</v-icon> register</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import axios from "axios";
export default {
  name: "meetup-view",
  props: ["id"],
  data() {
    return {
      meetup: {},
    };
  },
  async mounted() {
    return await axios
      .get(`http://localhost:7000/meetups/${this.id}`)
      .then((val) => {
        this.meetup = val.data;
      });
  },
};
</script>

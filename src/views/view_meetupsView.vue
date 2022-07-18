<template>
  <v-container>
    <v-row
      v-for="card in meetups"
      :key="card.id"
      align="center"
      justify="center"
    >
      <v-col>
        <v-card class="info mx-auto" dark max-width="600">
          <v-container fluid>
            <v-row row wrap>
              <v-col cols="12" sm="6">
                <v-img :src="card.image_URL" height="200" class="rounded-lg" />
              </v-col>
              <v-col cols="12" sm="6">
                <v-card-title class="text-h5 text-uppercase primary--text">
                  {{ card.title }}
                </v-card-title>
                <v-card-text class="text-capitalize">
                  <div>
                    <strong class="black--text">location :</strong>
                    {{ card.location }}
                  </div>
                  <div class="mt-2">
                    <strong class="black--text"> due :</strong>

                    <span class="ms-4" style="opacity: 0.5">{{
                      card.due
                    }}</span>
                  </div>
                </v-card-text>
                <v-card-actions>
                  <v-btn
                    depressed
                    class="text-uppercase primary"
                    router
                    :to="`/view_meetups/${card.id}`"
                    small
                  >
                    <v-icon>mdi-trending-neutral</v-icon>
                    <span class="ms-1">view meetup</span>
                  </v-btn>
                </v-card-actions>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";
export default {
  name: "view_meetups-view",
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
    return await axios
      .get(
        `http://localhost:7000/meetups/?email=${
          JSON.parse(localStorage.getItem("user"))[0].email
        }`
      )
      .then((val) => {
        if (val.data.length) {
          this.meetups = val.data;
        }
      });
  },
};
</script>

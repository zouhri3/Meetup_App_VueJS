<template>
  <v-container>
    <v-layout row wrap class="px-8">
      <v-flex xs12 sm6 offset-sm3>
        <h2 class="text-h5 info--text text-uppercase">create a new meetup</h2>
      </v-flex>
      <v-flex xs12 sm6 offset-sm3 class="mt-4">
        <v-form ref="organize_mettup_form">
          <v-text-field
            outlined
            :rules="rulesTitle"
            required
            label="Title *"
            v-model="title"
            color="info"
          >
          </v-text-field>
          <v-text-field
            outlined
            :rules="rulesLocation"
            required
            label="Location *"
            v-model="location"
            color="info"
          >
          </v-text-field>
          <v-text-field
            outlined
            :rules="rulesImage"
            label="Image URL *"
            color="info"
            v-model="image"
          >
          </v-text-field>
          <v-textarea
            rows="3"
            outlined
            :rules="rulesDescription"
            required
            label="Description About New Meetup"
            v-model="description"
            color="info"
          ></v-textarea>
          <v-flex>
            <v-menu
              v-model="menu2"
              :close-on-content-click="false"
              max-width="290"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  outlined
                  :value="computedDateFormattedDatefns"
                  clearable
                  label="Date"
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="date"
                @change="menu2 = false"
              ></v-date-picker>
            </v-menu>
          </v-flex>
          <v-flex>
            <v-btn :loading="loading" @click="onCreatedMeetup()" class="primary"
              >create meetup</v-btn
            >
          </v-flex>
        </v-form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { format, parseISO } from "date-fns";
import axios from "axios";

export default {
  name: "organize_meetup-view",
  data() {
    return {
      loading: false,
      title: "",
      rulesTitle: [
        (v) => !!v || "Title is required",
        (v) => v.length <= 15 || "Title must be less than 10 characters",
      ],
      location: "",
      rulesLocation: [
        (v) => !!v || "location is required",
        (v) => v.length <= 30 || "Location must be less than 30 characters",
      ],
      image: "",
      rulesImage: [(v) => !!v || "location is required"],
      description: "",
      rulesDescription: [
        (v) => !!v || "description is required",
        (v) => v.length >= 60 || "Description must be plus than 60 characters",
      ],
      date: format(parseISO(new Date().toISOString()), "yyyy-MM-dd"),
      menu2: false,
    };
  },
  computed: {
    computedDateFormattedDatefns() {
      return this.date ? format(parseISO(this.date), "EEEE, MMMM do yyyy") : "";
    },
  },
  methods: {
    onCreatedMeetup() {
      this.$refs.organize_mettup_form.validate();
      if (this.$refs.organize_mettup_form.validate()) {
        this.loading = true;
        return axios
          .post("http://localhost:7000/meetups", {
            email: JSON.parse(localStorage.getItem("user"))[0].email,
            title: this.title,
            location: this.location,
            image_URL: this.image,
            due: this.computedDateFormattedDatefns,
            desc: this.description,
          })
          .then(() => {
            this.$router.push("/view_meetups");
          });
      }
    },
  },
};
</script>


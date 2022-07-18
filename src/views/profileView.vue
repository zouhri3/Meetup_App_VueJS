<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" sm="9" md="6">
        <v-card v-if="this.user.userName">
          <div class="pa-4 d-flex align-center">
            <v-avatar
              color="primary"
              size="90"
              class="info--text text-uppercase font-weight-bold text-h4"
            >
              {{ userAvatar }}
            </v-avatar>
            <v-card-title class="d-block">
              <span class="text-capitalize">{{ user.userName }} </span>
              <br />
              <span class="caption">
                {{ user.email }}
              </span>
            </v-card-title>
          </div>
          <v-divider></v-divider>

          <v-card-actions class="pa-4">
            <v-btn class="primary" router to="/log_out">
              <v-icon class="me-2" small>exit_to_app</v-icon> sign out
            </v-btn>
            <v-btn color="info">
              <v-icon class="me-2" small>mdi-eyedropper</v-icon> edit profile
            </v-btn>
          </v-card-actions>
        </v-card>
        <v-sheet v-else color="grey lighten-4" class="pa-3">
          <v-skeleton-loader
            class="mx-auto"
            max-width="300"
            type="card"
          ></v-skeleton-loader>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "profile-view",
  data() {
    return {
      user: {},
    };
  },

  mounted() {
    this.user = JSON.parse(localStorage.getItem("user"))[0];
  },
  computed: {
    userAvatar() {
      return `${this.user.userName.split(" ")[0][0]}.${
        this.user.userName.split(" ")[1][0]
      }`;
    },
  },
};
</script>


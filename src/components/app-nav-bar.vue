<template>
  <div class="header">
    <!-- ----------------  navigation-drawer ------------- -->
    <v-navigation-drawer right v-model="drawer" app temporary>
      <v-list-item
        v-for="(link, index) in links"
        :key="index"
        router
        :to="link.router_link"
      >
        <v-list-item-action>
          <v-icon>{{ link.icon }}</v-icon>
        </v-list-item-action>
        <v-list-item-content class="text-capitalize"
          >{{ link.content }}
        </v-list-item-content>
      </v-list-item>
    </v-navigation-drawer>

    <!-- ----------------  app bar ------------- -->

    <v-app-bar app color="primary" class="white--text">
      <v-container d-inline-flex align-center>
        <v-toolbar-title> DevMeetup </v-toolbar-title>

        <v-spacer></v-spacer>

        <v-toolbar-items
          v-for="(link, index) in links"
          :key="index"
          class="hidden-md-and-down"
        >
          <v-btn
            depressed
            router
            :to="link.router_link"
            class="py-5 white--text"
            color="primary"
          >
            <v-icon left>{{ link.icon }}</v-icon>
            <span>{{ link.content }}</span>
          </v-btn>
        </v-toolbar-items>

        <v-app-bar-nav-icon
          @click="drawer = !drawer"
          class="hidden-lg-and-up white--text"
        ></v-app-bar-nav-icon>
      </v-container>
    </v-app-bar>
  </div>
</template>

<script>
export default {
  name: "app-nav-bar",
  data() {
    return {
      drawer: false,
    };
  },

  computed: {
    links() {
      return this.$store.state.links;
    },
  },
};
</script>

<style lang="scss"  scoped>
.theme--light.v-btn--active {
  color: #2196f3 !important;

  &::before {
    display: none;
  }
}
</style>
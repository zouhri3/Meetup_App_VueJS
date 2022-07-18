
<template>
  <v-container>
    <div
      ref="circular"
      style="min-height: 80vh"
      class="d-flex justify-center align-center"
    >
      <v-progress-circular
        :size="200"
        :width="10"
        indeterminate
        color="info"
      ></v-progress-circular>
    </div>
  </v-container>
</template>
<script>
export default {
  name: "logout-view",
  mounted() {
    localStorage.removeItem("user");
    setTimeout(() => {
      this.$router.push({ path: "/login" });
      this.$store.commit("links", [
        {
          icon: "face",
          content: "sign up",
          router_link: "/sign_up",
        },
        {
          icon: "lock_open",
          content: "login",
          router_link: "/login",
        },
      ]);
      this.$refs.circular.style.opacity = "0";
    }, 3000);
  },
};
</script>
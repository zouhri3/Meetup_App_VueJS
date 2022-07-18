<template>
  <v-app>
    <app-nav-bar />

    <v-main class="mt-8">
      <transition name="router" mode="out-in">
        <router-view />
      </transition>
    </v-main>
  </v-app>
</template>

<script>
import AppNavBar from "@/components/app-nav-bar.vue";
export default {
  name: "App-view",
  components: {
    AppNavBar,
  },
  mounted() {
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
    }
  },
};
</script>
<style>
.router-leave-to {
  transform: translateY(100%);
  opacity: 0;
}
.router-leave-from {
  transform: translateY(0);
}

.router-enter-active {
  animation: enterFrom 0.4s ease-in;
  position: fixed;
  left: 0;
  right: 0;
}

.router-leave-active {
  transition: all 0.4s;
  position: fixed;
  left: 0;
  right: 0;
}
.router-move {
  position: fixed;
  left: 0;
  right: 0;
}

@keyframes enterFrom {
  0% {
    opacity: 0;
    transform: translateY(-100%);
  }

  15% {
    transform: translateX(-15px);
  }
  30% {
    transform: translateX(15px);
  }
  40% {
    opacity: 0.7;

    transform: translateX(-7px);
  }
  50% {
    transform: translateX(7px);
  }
  60% {
    transform: translateX(0);
  }

  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>

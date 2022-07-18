<template>
  <v-container>
    <v-layout>
      <v-flex xs12 sm6 offset-sm3 class="mt-4">
        <v-card>
          <v-card-text>
            <v-container>
              <v-form ref="login">
                <v-layout row class="py-5 px-3">
                  <v-flex xs12>
                    <v-text-field
                      name="email"
                      label="Mail"
                      id="email"
                      v-model="email"
                      type="email"
                      required
                      :rules="rulesEmail"
                      outlined
                    >
                    </v-text-field>
                  </v-flex>
                  <v-flex xs12>
                    <v-text-field
                      name="password"
                      label="Password"
                      id="password"
                      v-model="password"
                      type="password"
                      required
                      :rules="rulesPassword"
                      outlined
                    >
                    </v-text-field>
                  </v-flex>
                </v-layout>
                <div
                  class="mb-3 text-uppercase error--text font-weight-medium"
                  v-if="checkUsersEmail"
                >
                  your email or passwor are uncorrect !
                </div>
                <v-layout>
                  <v-flex xs12>
                    <v-btn :loading="loading" @click="onLogin()" class="primary"
                      >login</v-btn
                    >
                    <v-btn
                      class="ms-3 primary--text"
                      text
                      link
                      :to="{ path: '/sign_up', name: 'sign_up-view' }"
                      >go to sign up</v-btn
                    >
                  </v-flex>
                </v-layout>
              </v-form>
            </v-container>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import axios from "axios";
export default {
  name: "login-view",
  data() {
    return {
      checkUsersEmail: false,
      loading: false,
      valid: false,
      email: "",
      rulesEmail: [
        (v) => !!v || "E-mail is required",
        (v) => /.+@.+/.test(v) || "E-mail must be valid",
      ],

      password: "",
      rulesPassword: [
        (v) => !!v || "Password is required",
        (v) => v.length > 10 || "Password must be grand than 10 characters",
      ],
    };
  },
  methods: {
    async onLogin() {
      this.$refs.login.validate();
      if (this.$refs.login.validate()) {
        this.loading = true;

        return await axios
          .get(
            `http://localhost:7000/users/?email=${this.email}&password=${this.password}`
          )
          .then((value) => {
            if (value.data.length) {
              this.checkUsersEmail = false;

              localStorage.setItem("user", JSON.stringify(value.data));

              setTimeout(() => {
                this.$router.push({ path: "/", name: "Home-view" });
                this.loading = false;
              }, 1000);
            } else {
              this.checkUsersEmail = true;
            }
          });
      }
    },
  },
};
</script> 
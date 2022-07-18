<template>
  <v-container>
    <v-layout>
      <v-flex xs12 sm6 offset-sm3 class="mt-4">
        <v-card class="">
          <v-card-text>
            <v-container>
              <v-form ref="signup">
                <v-layout row class="py-5 px-3">
                  <v-flex xs12>
                    <v-text-field
                      name="name"
                      label="full Name"
                      id="name"
                      v-model="Full_Name"
                      type="text"
                      required
                      :rules="rulesFull_Name"
                      outlined
                    >
                    </v-text-field>
                  </v-flex>
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
                  <v-flex xs12>
                    <v-text-field
                      name="confirmPassword"
                      label="Confirm Password"
                      id="confirmPassword"
                      v-model="confirmPassword"
                      type="password"
                      required
                      :rules="rulesConfirmPassword"
                      outlined
                    >
                    </v-text-field>
                  </v-flex>
                </v-layout>

                <div
                  class="mb-3 text-uppercase error--text font-weight-medium"
                  v-if="checkUsersEmail"
                >
                  we have an account with this E-mail !
                </div>

                <v-layout>
                  <v-flex xs12>
                    <v-btn
                      :loading="loading"
                      @click="on_sing_up()"
                      class="primary"
                      >sign up</v-btn
                    >
                    <v-btn
                      class="ms-3 primary--text"
                      text
                      link
                      :to="{ path: '/login', name: 'login-view' }"
                      >go to login</v-btn
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
  name: "sign_up-view",
  data() {
    return {
      checkUsersEmail: false,
      loading: false,
      Full_Name: "",
      rulesFull_Name: [
        (v) => !!v || "Full Name is required",
        (v) => v.length > 10 || "Full Name must be grand than 10 characters",
      ],

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

      confirmPassword: "",
      rulesConfirmPassword: [
        (v) => !!v || "Password is required",
        (v) => v == this.password || "Confirm Your Password Please",
      ],
    };
  },

  methods: {
    async on_sing_up() {
      this.$refs.signup.validate();
      if (this.$refs.signup.validate()) {
        return await axios
          .get(`http://localhost:7000/users/?email=${this.email}`)
          .then((value) => {
            // check in data users email
            if (!value.data.length) {
              this.checkUsersEmail = false;
              this.loading = true;

              axios
                .post("http://localhost:7000/users", {
                  userName: this.Full_Name,
                  email: this.email,
                  password: this.password,
                })
                .then(() => {
                  setTimeout(() => {
                    this.$router.push("/login");
                    this.loading = false;
                  }, 600);
                });
            } else {
              this.checkUsersEmail = true;
            }
          });
      }
    },
  },
};
</script> 
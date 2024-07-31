<template>
  <div class="bg-light py-3 py-md-5">
    <div class="container">
      <div class="row justify-content-md-center">
        <div class="col-12 col-sm-10 col-md-10 col-lg-8 col-xl-6 col-xxl-5">
          <div class="bg-white p-4 p-md-5 rounded shadow-sm">
            <div class="row">
              <div class="col-12">
                <div class="mb-5">
                  <h3 class="text-center">
                    Log in
                  </h3>
                </div>
              </div>
            </div>
            <div class="mb-4 text-center">
              <span
                v-if="errorAlert"
                class="redStar h6 "
              >Invalide Credential : <br> Email or Password incorrect</span>
            </div>
            <form @submit.prevent="login()">
              <div class="row gy-3 gy-md-4 overflow-hidden">
                <div class="col-12">
                  <label
                    for="email"
                    class="form-label"
                  >Email <span class="text-danger">*</span></label>
                  <input
                    id="email"
                    v-model="email"
                    type="email"
                    class="form-control"
                    name="email"
                    required
                  >
                </div>
                <div class="col-12">
                  <label
                    for="password"
                    class="form-label"
                  >Password <span class="text-danger">*</span></label>
                  <input
                    id="password"
                    v-model="password"
                    type="password"
                    class="form-control"
                    name="password"
                    required
                  >
                </div>
                <div class="col-12">
                  <div class="form-check">
                    <input
                      id="remember_me"
                      v-model="isChecked"
                      class="form-check-input"
                      type="checkbox"
                      value=""
                      name="remember_me"
                    >
                    <label
                      class="form-check-label text-secondary text-start"
                      for="remember_me"
                    >
                      Keep me logged in
                    </label>
                  </div>
                </div>
                <div class="col-12">
                  <div class="d-grid">
                    <button
                      class="btn btn-lg btn-primary"
                      type="submit"
                    >
                      Log in now
                    </button>
                  </div>
                </div>
              </div>
            </form>
            <div class="row">
              <div class="col-12">
                <hr class="mt-5 mb-4 border-secondary-subtle">
                <div class="d-flex gap-2 gap-md-4 flex-column flex-md-row justify-content-md-end">
                  <router-link
                    to="signup"
                    class="link-secondary text-decoration-none"
                  >
                    Create new account
                  </router-link>
                  <router-link
                    to="forgotpassword"
                    class="link-secondary text-decoration-none"
                  >
                    Forgot password
                  </router-link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Cookies from 'vue-cookies'

export default {
  name: 'LoginPage',
  components: {},
  data() {
    return {
      email: '',
      password: '',
      errorAlert : false,
      isChecked : false,
    }
  },

  methods: {
    async login() {
      try {
        const response = await axios.post('login', {
          email: this.email,
          password: this.password
        })
       // Securely store access token in HttpOnly cookie
        Cookies.set('token', response.data.token, {
          expires: '1d',
          httpOnly: true
        })
        if (this.isChecked) {
          Cookies.set('refreshToken', response.data.user.refreshToken, {
          expires: '7d',
          httpOnly: true
        })
        } 
          this.$store.commit("setUser", response.data.user) // Commit mutation to update user data

          const response2 = await axios.get('profile')
          this.$store.commit("setProfile", response2.data.profileData)
           this.$router.push('/dashboard')

      } catch (error) {
        console.error('Login error:', error.response.data.error)
        this.errorAlert = true
      }
    }
  }
}
</script>

<style scoped>

</style>
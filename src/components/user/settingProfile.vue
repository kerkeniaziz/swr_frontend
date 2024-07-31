<template>
  <section class="bg-light py-4">
    <div class="container">
      <div class="row gy-4 gy-lg-0">
        <!-- Sidebar with navigation buttons -->
        <div class="col-12 col-lg-4 col-xl-3">
          <div class="card widget-card border-light shadow-sm">
            <h4 class="card-header bg-primary text-white text-center">
              Settings
            </h4>
            <div class="card-body px-0 pb-0">
              <div
                id="profileTab"
                class="nav flex-column nav-pills"
                role="tablist"
              >
                <!-- Profile Tab Button -->
                <button
                v-if="this.$store.state.userRole ==='candidate'"
  :class="{ active: this.$store.state.userRole === 'candidate' }"
  :aria-selected="this.$store.state.userRole === 'candidate'"
                  id="profile-tab"
                  class="nav-link"
                  data-bs-toggle="pill"
                  data-bs-target="#profile-tab-pane"
                  type="button"
                  role="tab"
                  aria-controls="profile-tab-pane"
                  
                >
                  Profile
                </button>
                <!-- Resource Tab Button -->
                <button
                  :class="{ active: this.$store.state.userRole !== 'candidate' }"
  :aria-selected="this.$store.state.userRole !== 'candidate'"
                  id="resource-tab"
                  class="nav-link"
                  data-bs-toggle="pill"
                  data-bs-target="#resource-tab-pane"
                  type="button"
                  role="tab"
                  aria-controls="resource-tab-pane"
                >
                  Resource
                </button>
                <!-- Password Tab Button -->
                <button
                  id="password-tab"
                  class="nav-link"
                  data-bs-toggle="pill"
                  data-bs-target="#password-tab-pane"
                  type="button"
                  role="tab"
                  aria-controls="password-tab-pane"
                  aria-selected="false"
                >
                  Password
                </button>
                <!-- Language Tab Button -->
                <button
                  id="language-tab"
                  class="nav-link"
                  data-bs-toggle="pill"
                  data-bs-target="#language-tab-pane"
                  type="button"
                  role="tab"
                  aria-controls="language-tab-pane"
                  aria-selected="false"
                >
                  Language
                </button>
                <!-- Account Tab Button -->
                <button
                  id="account-tab"
                  class="nav-link"
                  data-bs-toggle="pill"
                  data-bs-target="#account-tab-pane"
                  type="button"
                  role="tab"
                  aria-controls="account-tab-pane"
                  aria-selected="false"
                >
                  Account
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Main content area with tab panes -->
        <div class="col-12 col-lg-8 col-xl-9">
          <div
            id="profileTabContent"
            class="tab-content"
          >
            <!-- Profile Tab Pane -->
            <div
            v-if="this.$store.state.userRole ==='candidate'"
              :class="{ 'show active': this.$store.state.userRole === 'candidate' }"
              id="profile-tab-pane"
              class="tab-pane fade "
              role="tabpanel"
              aria-labelledby="profile-tab"
            >
              <ProfileEdite />
            </div>
            <!-- Resource Tab Pane -->
            <div
              :class="{ 'show active': this.$store.state.userRole !== 'candidate' }"
              id="resource-tab-pane"
              class="tab-pane fade"
              role="tabpanel"
              aria-labelledby="resource-tab"
            >
              <ResourcePage />
            </div>
            <!-- Password Tab Pane -->
            <div
              id="password-tab-pane"
              class="tab-pane fade"
              role="tabpanel"
              aria-labelledby="password-tab"
            >
              <ChangePassword />
            </div>
            <!-- Language Tab Pane -->
            <div
              id="language-tab-pane"
              class="tab-pane fade"
              role="tabpanel"
              aria-labelledby="language-tab"
            >
              <LanguageSelector />
            </div>
            <!-- Account Tab Pane -->
            <div
              id="account-tab-pane"
              class="tab-pane fade"
              role="tabpanel"
              aria-labelledby="account-tab"
            >
              <AccountSetting />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import ProfileEdite from './profileEdite.vue';
import ResourcePage from './resourcePage.vue';
import ChangePassword from './changePassword.vue';
import LanguageSelector from './languageSelector.vue';
import AccountSetting from './accountSetting.vue';

export default {
  name: 'SettingProfile',
  components: {
    ProfileEdite,
    ResourcePage,
    ChangePassword,
    LanguageSelector,
    AccountSetting,
  },
};
</script>

<style scoped>
/* Add scoped styles here if needed */
.nav-link:hover{
  background-color: rgba(173, 173, 173, 0.496);
}
.active:hover{
  background-color: #0d6efd ;
}
</style>

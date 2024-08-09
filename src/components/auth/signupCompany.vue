<template>
  <div class="container my-5">
    <div class="card border-light-subtle shadow-sm">
      <div class="row g-0">
        <div class="col-12 col-md-6 text-bg-primary">
          <div class="d-flex align-items-center justify-content-center h-100">
            <div class="col-10 col-xl-8 py-3">
              <img
                class="img-fluid rounded "
                loading="lazy"
                src="../../assets/img/2_white.png"
                alt="BootstrapBrain Logo"
              >
              <hr class="border-3  mb-4">
              <h2 class="h1 mb-4">
                Create your employer space
              </h2>
              <p class="lead m-0">
                Save time by contacting the right candidates, and interact with artificial intelligence.
              </p>
            </div>
          </div>
        </div>
        <div class="col-12 col-md-6">
          <div class="card-body p-3 p-md-4 p-xl-5">
            <div class="row">
              <div class="col-12">
                <div class="mb-5">
                  <h2 class="h3">
                    Registration
                  </h2>
                  <h3 class="fs-6 fw-normal text-secondary m-0">
                    Enter your details to register
                  </h3>
                </div>
              </div>
            </div>
            <form action="#!">
              <div class="row gy-3 gy-md-4 overflow-hidden">
                <div class="col-12">
                  <label
                    for="email"
                    class="form-label"
                  >Email <span class="text-danger">*</span></label>
                  <input
                    id="email"
                    type="email"
                    class="form-control"
                    name="email"
                    placeholder="name@example.com"
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
                    type="password"
                    class="form-control"
                    name="password"
                    value=""
                    required
                  >
                </div>
                <div class="col-12">
                  <label
                    for="password"
                    class="form-label"
                  >Confirm Password <span class="text-danger">*</span></label>
                  <input
                    id="password"
                    type="password"
                    class="form-control"
                    name="password"
                    value=""
                    required
                  >
                </div>

                <div class="col-12">
                  <label
                    for="firstName"
                    class="form-label"
                  >Company Name <span class="text-danger">*</span></label>
                  <input
                    id="firstName"
                    type="email"
                    class="form-control"
                    name="firstName"
                    placeholder="First Name"
                    required
                  >
                </div>
                <div class="col-12">
                  <label
                    for="lastName"
                    class="form-label"
                  >Web Site <span class="text-danger">*</span></label>
                  <input
                    id="lastName"
                    type="email"
                    class="form-control"
                    name="lastName"
                    placeholder="Last Name"
                    required
                  >
                </div>
                
                <div>phone</div>

                <div>company logo</div>
                
                <div class="col-12">
                  <div class="form-check">
                    <input
                      id="iAgree"
                      class="form-check-input"
                      type="checkbox"
                      value=""
                      name="iAgree"
                      required
                    >
                    <label
                      class="form-check-label text-secondary"
                      for="iAgree"
                    >
                      I agree to the <router-link
                        to="terms_and_conditions"
                        class="link-primary text-decoration-none"
                      >terms and conditions</router-link>
                    </label>
                  </div>
                </div>
                <div class="col-12">
                  <div class="d-grid">
                    <button
                      class="btn bsb-btn-xl btn-primary"
                      type="submit"
                    >
                      Sign up
                    </button>
                  </div>
                </div>
              </div>
            </form>
            <div class="row">
              <div class="col-12">
                <hr class="mt-5 mb-4 border-secondary-subtle">
                <p class="m-0 text-secondary text-center">
                  Already have an account? <router-link
                    to="login"
                    class="link-primary text-decoration-none"
                  >
                    Sign in
                  </router-link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    name : "SignupCompany",
}

</script>

<style scoped>
@import url('https://unpkg.com/bs-brain@2.0.3/components/registrations/registration-5/assets/css/registration-5.css');

</style>
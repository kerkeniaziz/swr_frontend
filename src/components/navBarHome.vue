<template>
  <nav class="navbar navbar-expand-lg bg-white navbar-light shadow sticky-top p-0 z-index-10">
    <router-link
      to="/"
      class="navbar-brand d-flex align-items-center text-center py-0 px-4 px-lg-5"
    >
      <img
        src="../assets/img/2.png"
        alt="SWR Logo"
        height="44"
        class="me-5"
      >
    </router-link>
    
    <button
      type="button"
      class="navbar-toggler"
      data-bs-toggle="collapse"
      data-bs-target="#navbarCollapse"
      aria-controls="navbarCollapse"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon" />
    </button>
    <div
      id="navbarCollapse"
      class="collapse navbar-collapse justify-content-between"
    >
      <ul class="navbar-nav mx-auto">
        <li class="nav-item">
          <router-link
            to="/"
            class="nav-link active"
          >
            Home
          </router-link>
        </li>
        <li class="nav-item">
          <router-link
            to="/findjob"
            class="nav-link"
          >
            Find Job
          </router-link>
        </li>
        <li class="nav-item">
          <router-link
            to="/findcompany"
            class="nav-link "
          >
            Browse Companies
          </router-link>
        </li>
        <li class="nav-item">
          <router-link
            to="/about"
            class="nav-link"
          >
            About Us
          </router-link>
        </li>
        <li class="nav-item">
          <router-link
            to="/contact"
            class="nav-link d-none"
          >
            Contact Us
          </router-link>
        </li>
      </ul>
      <ul class="navbar-nav ms-auto">
        <li class="nav-item">
          <router-link
            to="/login"
            class="nav-link"
          >
            Login
          </router-link>
        </li>
        <li class="nav-item me-5">
          <router-link
            to="/signup"
            class="nav-link"
          >
            Sign Up
          </router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  name: "NavBarHome",
};
</script>

<style scoped>

/*** Navbar ***/
.navbar .dropdown-toggle::after {
  border: none;
  left: 0;
  content: "\f107";
  font-family: "Font Awesome 5 Free";
  font-weight: 900;
  vertical-align: middle;
  margin-left: 5px;
  transition: .5s;
}

.navbar .dropdown-toggle[aria-expanded=true]::after {
  transform: rotate(-180deg);
}

.navbar-dark .navbar-nav .nav-link,
.navbar-light .navbar-nav .nav-link {
  margin-right: 10px;
  padding: 25px 0;
  color: #FFFFFF;
  font-size: 15px;
  text-transform: uppercase;
  outline: none;
  margin-left: 20px;
}

.navbar-dark .navbar-nav .nav-link:hover,
.navbar-dark .navbar-nav .nav-link.active,
.navbar-light .navbar-nav .nav-link:hover,
.navbar-light .navbar-nav .nav-link.active {
  color: var(--primary);
}

@media (max-width: 991.98px) {
  .navbar-dark .navbar-nav .nav-link,
  .navbar-light .navbar-nav .nav-link  {
    margin-right: 0;
    padding: 10px 0;
  }

  .navbar-light .navbar-nav {
    border-top: 1px solid #EEEEEE;
  }
}

.navbar-light .navbar-brand,
.navbar-light a.btn {
  height: 75px;
}

.navbar-light .navbar-nav .nav-link {
  color: var(--dark);
  font-weight: 600;

}

@media (min-width: 992px) {
  .navbar .nav-item .dropdown-menu {
    display: block;
    top: 100%;
    margin-top: 0;
    transform: rotateX(-75deg);
    transform-origin: 0% 0%;
    opacity: 0;
    visibility: hidden;
    transition: .5s;

  }

  .navbar .nav-item:hover .dropdown-menu {
    transform: rotateX(0deg);
    visibility: visible;
    transition: .5s;
    opacity: 1;
  }
}

</style>

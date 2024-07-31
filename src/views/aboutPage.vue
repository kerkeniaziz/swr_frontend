<template>
  <div>
    <!-- Header End -->
    <div
      v-show="!dontShowCarousel"
      class="container-xxl py-5 bg-dark page-header mb-5"
    >
      <div class="container my-5 pt-5 pb-4">
        <h1 class="display-3 text-white mb-3 animated slideInDown">
          About Us
        </h1>
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb text-uppercase">
            <li class="breadcrumb-item">
              <router-link to="/">
                Home
              </router-link>
            </li>
            <li
              class="breadcrumb-item text-white active"
              aria-current="page"
            >
              About
            </li>
          </ol>
        </nav>
      </div>
    </div>
    <!-- Header End -->

    <!-- About Start -->
    <div class="container-xxl py-5">
      <div class="container">
        <div class="row g-5 align-items-center">
          <div
            class="col-lg-6 wow fadeIn"
            data-wow-delay="0.1s"
          >
            <div class="row g-0 about-bg rounded overflow-hidden">
              <div class="col-6 text-start">
                <img
                  class="img-fluid w-100"
                  src="../assets/img/about-1.jpg"
                >
              </div>
              <div class="col-6 text-start">
                <img
                  class="img-fluid"
                  src="../assets/img/about-2.jpg"
                  style="width: 85%; margin-top: 15%;"
                >
              </div>
              <div class="col-6 text-end">
                <img
                  class="img-fluid"
                  src="../assets/img/about-3.jpg"
                  style="width: 85%;"
                >
              </div>
              <div class="col-6 text-end">
                <img
                  class="img-fluid w-100"
                  src="../assets/img/about-4.jpg"
                >
              </div>
            </div>
          </div>
          <div
            class="col-lg-6 wow fadeIn"
            data-wow-delay="0.5s"
          >
            <h1 class="mb-4">
              We Help To Get The Best Job And Find A Talent
            </h1>
            <p class="mb-4">
              Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit. Aliqu diam amet diam et eos. Clita erat ipsum et lorem et sit, sed stet lorem sit clita duo justo magna dolore erat amet
            </p>
            <p><i class="bi bi-check-lg text-primary me-3" />Tempor erat elitr rebum at clita</p>
            <p><i class="bi bi-check-lg text-primary me-3" />Aliqu diam amet diam et eos</p>
            <p><i class="bi bi-check-lg text-primary me-3" />Clita duo justo magna dolore erat amet</p>
            <router-link
              class="btn btn-primary py-3 px-5 mt-3"
              to="about"
            >
              Read More
            </router-link>
          </div>
        </div>
      </div>
    </div>
    <!-- About End -->
  </div>
</template>

<script>

export default {
    name: 'AboutPage',
    components: {
        
    },
    props :{
        dontShowCarousel: Boolean,
    },
}
</script>

<style  >
.breadcrumb-item a {
    text-decoration: none;
    color:      var(--bs-heading-color);
    font-weight: 800;
}
/*** Header ***/
.header-carousel .container,
.page-header .container {
    position: relative;
    padding: 45px 0 45px 35px;
    border-left: 15px solid var(--primary);
}

.header-carousel .container::before,
.header-carousel .container::after,
.page-header .container::before,
.page-header .container::after {
    position: absolute;
    content: "";
    top: 0;
    left: 0;
    width: 100px;
    height: 15px;
    background: var(--primary);
}

.header-carousel .container::after,
.page-header .container::after {
    top: 100%;
    margin-top: -15px;
}

@media (max-width: 768px) {
    .header-carousel .owl-carousel-item {
        position: relative;
        min-height: 500px;
    }
    
    .header-carousel .owl-carousel-item img {
        position: absolute;
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    .header-carousel .owl-carousel-item p {
        font-size: 14px !important;
        font-weight: 400 !important;
    }

    .header-carousel .owl-carousel-item h1 {
        font-size: 30px;
        font-weight: 600;
    }
}

.header-carousel .owl-nav {
    position: absolute;
    top: 50%;
    right: 8%;
    transform: translateY(-50%);
    display: flex;
    flex-direction: column;
}

.header-carousel .owl-nav .owl-prev,
.header-carousel .owl-nav .owl-next {
    margin: 7px 0;
    width: 45px;
    height: 45px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #FFFFFF;
    background: transparent;
    border: 1px solid #FFFFFF;
    border-radius: 2px;
    font-size: 22px;
    transition: .5s;
}

.header-carousel .owl-nav .owl-prev:hover,
.header-carousel .owl-nav .owl-next:hover {
    background: var(--primary);
    border-color: var(--primary);
}

.page-header {
    background: linear-gradient(rgba(43, 57, 64, .5), rgba(43, 57, 64, .5)), url(../assets/img/carousel-1.jpg) center center no-repeat;
    background-size: cover;
}

.breadcrumb-item + .breadcrumb-item::before {
    color: var(--light);
}

.about-bg {
    background-image: -webkit-repeating-radial-gradient(center center, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2) 1px, transparent 1px, transparent 100%);
    background-image: -moz-repeating-radial-gradient(center center, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2) 1px, transparent 1px, transparent 100%);
    background-image: -ms-repeating-radial-gradient(center center, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2) 1px, transparent 1px, transparent 100%);
    background-image: -o-repeating-radial-gradient(center center, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2) 1px, transparent 1px, transparent 100%);
    background-image: repeating-radial-gradient(center center, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2) 1px, transparent 1px, transparent 100%);
    background-size: 5px 5px;
}
</style>

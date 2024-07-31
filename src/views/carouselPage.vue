<template>
  <div class="container-fluid p-0">
    <div class="owl-carousel header-carousel position-relative">
      <div class="owl-carousel-item position-relative">
        <img
          class="img-fluid"
          src="../assets/img/carousel-1.jpg"
          alt=""
        >
        <div
          class="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center"
          style="background: rgba(43, 57, 64, .5);"
        >
          <div class="container">
            <div class="row justify-content-start">
              <div class="col-10 col-lg-8">
                <h1 class="display-3 text-white animated slideInDown mb-4">
                  Find The Perfect Job That You Deserved
                </h1>
                <p class="fs-5 fw-medium text-white mb-4 pb-2">
                  Vero elitr justo clita lorem. Ipsum dolor at sed stet sit diam no. 
                  Kasd rebum ipsum et diam justo clita et kasd rebum sea elitr.
                </p>
                <a
                  href=""
                  class="btn btn-primary py-md-3 px-md-5 me-3 animated slideInLeft"
                >Search A Job</a>
                <a
                  href=""
                  class="btn btn-secondary py-md-3 px-md-5 animated slideInRight"
                >Find A Talent</a>
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
    name : 'CarouselPage'
}
</script>

<style >
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
    background: linear-gradient(rgba(43, 57, 64, .5), rgba(43, 57, 64, .5)),
     url(../assets/img/carousel-1.jpg) center center no-repeat;
    background-size: cover;
}

.breadcrumb-item + .breadcrumb-item::before {
    color: var(--light);
}

</style>
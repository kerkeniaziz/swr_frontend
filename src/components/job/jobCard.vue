<template>
  <div class="container mt-5 mb-3">
    <div class="row">
      <div class="col-md-4">
        <div class="card p-3 mb-2">
          <div class="d-flex justify-content-between">
            <div class="d-flex flex-row align-items-center">
              <div class="icon">
                <i class="bx bxl-mailchimp" />
              </div>
              <div class="ms-2 c-details">
                <h6 class="mb-0">
                  {{ title }}
                </h6> <span>{{ companyName }}</span>
              </div>
            </div>
            <div class="badge">
              <span>{{ category }}</span>
            </div>
          </div>
          <div class="mt-5">
            <h3 class="heading">
              <i class="bi bi-geo-alt-fill" /> {{ title }}
            </h3>
            <p> Expirence : {{ experienceRequired }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    name: 'JobCard',
    props: {
      title: {
      type: String,
      default: ''
    },
    location: {
      type: Object,
      default: () => ({})
    },
    salaryRangeStart: {
      type: Number,
      default: 0
    },
    salaryRangeEnd: {
      type: Number,
      default: 0
    },
    remoteOption: {
      type: Boolean,
      default: false
    },
    experienceRequired: {
      type: String,
      default: ''
    },
    category: {
      type: String,
      default: ''
    }
  },
    data(){
        return{ 
            companyName : "SW Consolting",
        }
    },
    computed : {
        locations() {
            return `${this.location.state} , ${this.location.address}`;
    }
},
    
}
</script>

<style  scoped>

body {
    background-color: #eee
}

.card {
    /* border: none; */
    border-radius: 10px
}

.c-details span {
    font-weight: 300;
    font-size: 13px
}

.icon {
    width: 50px;
    height: 50px;
    background-color: #eee;
    border-radius: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 39px
}

.badge span {
    background-color: #fffbec;
    width: 60px;
    height: 25px;
    padding-bottom: 3px;
    border-radius: 5px;
    display: flex;
    color: #fed85d;
    justify-content: center;
    align-items: center
}

.progress {
    height: 10px;
    border-radius: 10px
}

.progress div {
    background-color: red
}

.text1 {
    font-size: 14px;
    font-weight: 600
}

.text2 {
    color: #a5aec0
}
</style>


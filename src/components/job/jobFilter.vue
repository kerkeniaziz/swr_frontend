<template>
  <div class="gy-4 gy-lg-0 col-12 col-lg-4 col-xl-3">
    <div class="card widget-card border-light shadow-sm bg-white p-4">
      <div class="d-flex justify-content-between">
        <h6 class="form-label my-auto">
          Filter
        </h6>
        <button
          class="my-auto resetButton text-primary"
          @click="reset"
        >
          reset
        </button>
      </div>
      
      <hr>

      <!-- Salary Range Filter -->
      <div class="mb-3 salary-range">
        <label
          for="salaryRange"
          class="form-label"
        >Salary Range</label>
        <div class="d-flex salary-range-inputs">
          <input
            v-model="query.salaryRangeStart"
            type="number"
            class="form-control"
            placeholder="Min"
            @input="applyFilter"
          >
          <span class="text-center">_</span>
          <input
            v-model="query.salaryRangeEnd"
            type="number"
            class="form-control"
            placeholder="Max"
            @input="applyFilter"
          >
        </div>
      </div>
      <hr>

      <div class="mb-3 jtype">
        <label class="form-label">Job Type</label>
        <div>
          <label>
            <input
              type="checkbox"
              value="full-time"
              :checked="query.jobType === 'full-time'"
              @change="updateJobType('full-time', $event)"
            >
            Full-time
          </label>
          <br>
          <label>
            <input
              type="checkbox"
              value="part-time"
              :checked="query.jobType === 'part-time'"
              @change="updateJobType('part-time', $event)"
            >
            Part-time
          </label>
          <br>
          <label>
            <input
              type="checkbox"
              value="freelance"
              :checked="query.jobType === 'freelance'"
              @change="updateJobType('freelance', $event)"
            >
            Freelance
          </label>
          <br>
          <label>
            <input
              type="checkbox"
              value="internship"
              :checked="query.jobType === 'internship'"
              @change="updateJobType('internship', $event)"
            >
            Internship
          </label>
        </div>
      </div>
      <hr>

      <!-- Remote Option Filter -->
      <div class="form-check form-switch mb-3 d-flex ps-0">
        <label
          for="remoteOption"
          class="form-label"
        >Open to Remote</label>
        <input
          id="flexSwitchCheckDefault"
          v-model="query.remoteOption"
          class="form-check-input me-0 ms-5"
          type="checkbox"
          @change="applyFilter"
        >
      </div>
      <hr>

      <div class="mb-3 lang">
        <label class="form-label">Language</label>
        <div>
          <label>
            <input
              type="checkbox"
              :checked="query.language === 'english'"
              @change="updateLanguage('english', $event)"
            >
            English
          </label>
          <br>
          <label>
            <input
              type="checkbox"
              :checked="query.language === 'french'"
              @change="updateLanguage('french', $event)"
            >
            French
          </label>
          <br>
          <label>
            <input
              type="checkbox"
              :checked="query.language === 'arabic'"
              @change="updateLanguage('arabic', $event)"
            >
            Arabic
          </label>
        </div>
      </div>
      <hr>

      <!-- Experience Required Filter -->
      <div class="mb-3 expRequired">
        <label
          for="experienceRequired"
          class="form-label"
        >Experience Required (Years)</label>
        <div
          id="experienceRequired"
          @change="applyFilter"
        >
          <input
            id="all"
            type="checkbox"
            class="btn-check"
            value=""
            :checked="query.experienceRequired === ''"
            @change="updateExperienceRequired('', $event)"
          >
          <label
            class="btn btn-outline-primary "
            for="all"
          >All</label>
          
          <input
            id="0-1"
            type="checkbox"
            class="btn-check"
            value="0-1"
            :checked="query.experienceRequired === '0-1'"
            @change="updateExperienceRequired('0-1', $event)"
          >
          <label
            class="btn btn-outline-primary"
            for="0-1"
          >0-1</label>
          
          <input
            id="1-3-m"
            type="checkbox"
            class="btn-check"
            value="1-3"
            :checked="query.experienceRequired === '1-3'"
            @change="updateExperienceRequired('1-3', $event)"
          >
          <label
            class="btn btn-outline-primary"
            for="1-3-m"
          >1-3</label>
          
          <input
            id="3-5"
            type="checkbox"
            class="btn-check"
            value="3-5"
            :checked="query.experienceRequired === '3-5'"
            @change="updateExperienceRequired('3-5', $event)"
          >
          <label
            class="btn btn-outline-primary"
            for="3-5"
          >3-5</label>
          
          <input
            id="5-10"
            type="checkbox"
            class="btn-check"
            value="5-10"
            :checked="query.experienceRequired === '5-10'"
            @change="updateExperienceRequired('5-10', $event)"
          >
          <label
            class="btn btn-outline-primary"
            for="5-10"
          >5-10</label>
          
          <input
            id="+10"
            type="checkbox"
            class="btn-check"
            value="+10"
            :checked="query.experienceRequired === '+10'"
            @change="updateExperienceRequired('+10', $event)"
          >
          <label
            class="btn btn-outline-primary"
            for="+10"
          >10+</label>
        </div>
      </div>
      <hr>

      <!-- Contract Length Filter -->
      <div class="mb-3 contractLength">
        <label
          for="contractLength"
          class="form-label"
        >Contract Length (Months)</label>
        <div
          id="contractLength"
          @change="applyFilter"
        >
          <input
            id="all-contract"
            type="checkbox"
            class="btn-check"
            value=""
            :checked="query.contractLength === ''"
            @change="updateContractLength('', $event)"
          >
          <label
            class="btn btn-outline-primary"
            for="all-contract"
          >All</label>
          
          <input
            id="1-3"
            type="checkbox"
            class="btn-check"
            value="1-3"
            :checked="query.contractLength === '1-3'"
            @change="updateContractLength('1-3', $event)"
          >
          <label
            class="btn btn-outline-primary"
            for="1-3"
          >1-3</label>
          
          <input
            id="4-6"
            type="checkbox"
            class="btn-check"
            value="4-6"
            :checked="query.contractLength === '4-6'"
            @change="updateContractLength('4-6', $event)"
          >
          <label
            class="btn btn-outline-primary"
            for="4-6"
          >4-6</label>
          
          <input
            id="7-12"
            type="checkbox"
            class="btn-check"
            value="7-12"
            :checked="query.contractLength === '7-12'"
            @change="updateContractLength('7-12', $event)"
          >
          <label
            class="btn btn-outline-primary"
            for="7-12"
          >7-12</label>
          
          <input
            id="13-24"
            type="checkbox"
            class="btn-check"
            value="13-24"
            :checked="query.contractLength === '13-24'"
            @change="updateContractLength('13-24', $event)"
          >
          <label
            class="btn btn-outline-primary"
            for="13-24"
          >13-24</label>
          
          <input
            id="25-36"
            type="checkbox"
            class="btn-check"
            value="25-36"
            :checked="query.contractLength === '25-36'"
            @change="updateContractLength('25-36', $event)"
          >
          <label
            class="btn btn-outline-primary"
            for="25-36"
          >25-36</label>
        </div>
      </div>
    </div>
  </div> 
</template>

<script>
export default {
  name: 'JobFilter',
  props: {
    categorys: {
      type:Object,
      default: () =>{}
    },
  }, 
  emits: ['update:filterjobs'],
  data() {
    return {
      jobType: {},
      query: {
        jobType: '',
        language: '',
        salaryRangeStart: '',
        salaryRangeEnd: '',
        experienceRequired: '',
        remoteOption: '',
        contractLength: '',
      }
    };
  },
  mounted() {
    Object.keys(this.$route.query).forEach(key => {
      if (key in this.query) {
        this.query[key] = this.$route.query[key];
      }
    });
  },
  methods: {
     reset() {
      this.jobType = {},

      this.query = {
        search : '',
        category:'',
        jobType: '',
        language: '',
        salaryRangeStart: '',
        salaryRangeEnd: '',
        experienceRequired: '',
        remoteOption: '',
        contractLength: '',
      };
      this.$router.push({ query: {} });
      this.applyFilter();
    },
    updateLanguage(value, event) {
      if (event.target.checked) {
        this.query.language = value;
      } else {
        this.query.language = '';
      }
      this.uncheckOthers('.lang', value);
      this.applyFilter();
    },
    updateJobType(value, event) {
      if (event.target.checked) {
        this.query.jobType = value;
      } else {
        this.query.jobType = '';
      }
      this.uncheckOthers('.jtype', value);
      this.applyFilter();
    },
    updateExperienceRequired(value, event) {
      if (event.target.checked) {
        this.query.experienceRequired = value;
      } else {
        this.query.experienceRequired = '';
      }
      this.uncheckOthers('.expRequired', value);
      this.applyFilter();
    },
    updateContractLength(value, event) {
      if (event.target.checked) {
        this.query.contractLength = value;
      } else {
        this.query.contractLength = '';
      }
      this.uncheckOthers('.contractLength', value);
      this.applyFilter();
    },
    uncheckOthers(selector, selectedValue) {
      const checkboxes = document.querySelectorAll(`${selector} input[type="checkbox"]`);
      checkboxes.forEach((checkbox) => {
        if (checkbox.value !== selectedValue) {
          checkbox.checked = false;
        }
      });
    },
    applyFilter() {
      this.$emit('update:filterjobs', this.query);
    }
  }
}
</script>

<style scoped>

.salary-range .form-label {
  font-weight: bold;
  font-size: 1.1rem;
}

.salary-range-inputs {
  display: flex;
  gap: 0.5rem;
}
.salary-range-inputs .form-control::-webkit-outer-spin-button,
.salary-range-inputs .form-control::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.salary-range-inputs .form-control {
  border: 1px solid #ccc;
  background-color: #ededed;
  border-radius: 0.375rem;
  padding: 0.5rem 1rem;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

.salary-range-inputs .form-control:focus {
  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
  box-shadow: none;
  outline: none
}

.salary-range-inputs .form-control::placeholder {
  color: #999;
}

.list-group-item {
  cursor: pointer;
}
.list-group-item:hover {
  background-color: #f0f0f0;
}
.form-label {
  font-size: 20px;
  font-weight: 500;
}
hr {
  border: 0;
  height: 3px;
  background: linear-gradient(to right, #d5d5d5, #050505, #d5d5d5);
  margin: 20px 0;
}
.resetButton {
  border: 0;
  border-radius: 10px;

  font-weight: 700;
  width: 90px;
}
.resetButton:hover {
  background-color: rgb(221, 221, 221);
}
.btn-outline-primary{
  margin-right: 10px;
  margin-top: 10px;
}
</style>

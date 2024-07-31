<template>
  <div class="skill-selector">
    <label
      for="skills"
      class="mb-2"
    >Skills <span
      class="redStar"
      :hidden="dnone"
    >*</span></label>
    <div
      class="input-wrapper w-75 d-flex me-4"
      :class="cclass"
    >
      <div class="selected-skills">
        <div
          v-for="skill in selectedSkills"
          :key="skill"
          class="selected-skill"
        >
          {{ skill }}
          <span
            class="remove-skill p-1"
            @click="removeSkill(skill)"
          >x</span>
        </div>
      </div>
      <input
        v-model="inputText"
        type="text"
        placeholder="Type a skill..."
        class="form-control"
        @input="filterSkills"
        @keydown.enter.prevent="selectSkill"
      >
      <ul
        v-if="filteredSkills.length && inputText"
        class="suggestions"
      >
        <li
          v-for="skill in filteredSkills"
          :key="skill"
          @click="selectSkill(skill)"
        >
          {{ skill }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "SkillSelector",
  props: {
    skills: {
      type:Array,
      default: () => []
    },
    neededSkills: {
      type:Array,
      default: () => []
    },
    dnone: {
      type :Boolean,
      default: false
    },
    cclass: {
      type: String,
      default: '' 
    }
  },
  emits: ['update:selectedSkills'],
  data() {
    return {
      inputText: "",
      filteredSkills: [],
      selectedSkillsInternal: []
    };
  },
  computed: {
    selectedSkills() {
      return this.selectedSkillsInternal;
    }
  },
  watch: {
    neededSkills: {
      immediate: true,
      handler(newVal) {
        this.selectedSkillsInternal = Array.isArray(newVal) ? newVal.slice() : [];
      }
    }
  },
  methods: {
    filterSkills() {
      const input = this.inputText.toLowerCase();
      if (Array.isArray(this.skills)) {
        this.filteredSkills = this.skills.filter(skill =>
          skill.toLowerCase().includes(input) && !this.selectedSkills.includes(skill)
        );
      } else {
        console.error('Skills array is not properly initialized.');
      }
    },
    selectSkill(skill) {
      if (typeof skill !== "string" && this.filteredSkills.length) {
        skill = this.filteredSkills[0];
      }
      if (typeof skill === "string" && !this.selectedSkills.includes(skill)) {
        this.selectedSkillsInternal.push(skill);
        this.inputText = ""; // Clear the input field
        this.filteredSkills = [];
        this.$emit('update:selectedSkills', this.selectedSkillsInternal);
      }
    },
    removeSkill(skill) {
      this.selectedSkillsInternal = this.selectedSkillsInternal.filter(s => s !== skill);
      this.$emit('update:selectedSkills', this.selectedSkillsInternal);
    }
  }
};
</script>
<style scoped>
.skill-selector {
  position: relative;
}

.redStar {
  color: red;
}

.input-wrapper {
  position: relative;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  border: 1px solid #ccc;
  padding: 5px;
  border-radius: 5px;
}

.selected-skills {
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 5px;
}

.selected-skill {
  display: flex;
  align-items: center;
  background: #007bff;
  color: white;
  padding: 5px 10px;
  margin: 5px;
  border-radius: 5px;
}

.remove-skill {
  margin-left: 10px;
  cursor: pointer;
}

.suggestions {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: white;
  border: 1px solid #ccc;
  z-index: 10;
  max-height: 150px;
  overflow-y: auto;
  list-style: none;
  padding: 0;
  margin: 0;
}

.suggestions li {
  padding: 8px;
  cursor: pointer;
}

.suggestions li:hover {
  background: #f0f0f0;
}

input.form-control {
  border: none;
  outline: none;
  flex-grow: 1;
  margin-bottom: 5px;
}
</style>

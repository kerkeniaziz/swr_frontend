<template>
  <div class="sidebar-container">
    <!-- Gray overlay -->
    <div
      v-if="!collapsed"
      class="overlay"
      :class="{'d-none z-index-0' : collapsed }"
      @click="toggleSidebar"
    />

    <div
      class="sidebar shadow-sm bg-white"
      :class="{ 'collapsed': collapsed }"
    >
      <div class="sidebar-content"> 
        <router-link
          to="/dashboard"
          class="sidebar-link"
          :class="{ 'active': isLinkActive('/dashboard') }"
          @click="toggleSidebar"
        >
          <i class="bi bi-speedometer2" />
          <span class="sidebar-text">Dashboard</span>
        </router-link>
        <router-link
          v-if="userRole ==='admin'"
          to="/users"
          class="sidebar-link"
          :class="{ 'active': isLinkActive('/users') }"
          @click="toggleSidebar" 
        >
          <i class="bi bi-people" />
          <span class="sidebar-text">Users</span>
        </router-link>
        <router-link
          v-if="userRole ==='admin'"
          to="/skills"
          class="sidebar-link"
          :class="{ 'active': isLinkActive('/skills') }"
          @click="toggleSidebar" 
        >
          <i class="bi bi-ui-checks" />
          <span class="sidebar-text">Skills</span>
        </router-link>
        <router-link
          v-if="userRole ==='admin'"
          to="/categories"
          class="sidebar-link"
          :class="{ 'active': isLinkActive('/categories') }"
          @click="toggleSidebar" 
        >
          <i class="bi bi-grid-3x3-gap" />
          <span class="sidebar-text">Categories</span>
        </router-link>
        <router-link
          v-if="userRole ==='admin'"
          to="/jobs"
          class="sidebar-link"
          :class="{ 'active': isLinkActive('/jobs') }"
          @click="toggleSidebar" 
        >
          <i class="bi bi-briefcase" />
          <span class="sidebar-text">Jobs</span>
        </router-link>

        <router-link
          to="/findjob"
          class="sidebar-link"
          :class="{ 'active': isLinkActive('/findjob') }"
          @click="toggleSidebar"
        >
          <i class="bi bi-search" />
          <span class="sidebar-text">Find Job</span>
        </router-link>
        <router-link
        v-if="userRole ==='candidate'"
          to="/profile"
          class="sidebar-link"
          :class="{ 'active': isLinkActive('/profile') }"
          @click="toggleSidebar"
        >
          <i class="bi bi-person" />
          <span class="sidebar-text">Profile</span>
        </router-link>
        
        <router-link
        v-if="userRole ==='candidate'"
          to="/dashboard/savedjobs"
          class="sidebar-link"
          :class="{ 'active': isLinkActive('/dashboard/savedjobs') }"
          @click="toggleSidebar"
        >
          <i class="bi bi-bookmark" />
          <span class="sidebar-text">Saved Jobs</span>
        </router-link>
        <router-link
          v-if="userRole ==='admin'"
          to="/notification-center"
          class="sidebar-link"
          :class="{ 'active': isLinkActive('/notification-center') }"
          @click="toggleSidebar" 
        >
          <i class="bi bi-bell" />
          <span class="sidebar-text">Notification center</span>
        </router-link>

        <router-link
          to="/setting"
          class="sidebar-link"
          :class="{ 'active': isLinkActive('/setting') }"
          @click="toggleSidebar"
        >
          <i class="bi bi-gear" />
          <span class="sidebar-text">Settings</span>
        </router-link>
      
        <div class="my-5" />
      </div>
    
      <!-- Collapse Button -->
      <button
        class="collapse-icon"
        @click="toggleSidebarAll"
      >
        <i :class="{ 'bi bi-arrow-bar-left': !collapsed, 'bi bi-arrow-bar-right': collapsed }" />
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SidebarAll',
  data() {
    return {
      collapsed: true,
      userRole:""
    };
  },
  mounted(){
     this.userRole = this.$store.state.userRole
  },
  methods: {
    toggleSidebarAll() {
     
      this.collapsed = !this.collapsed;
    },
    toggleSidebar() {
      this.collapsed = true;
    },
    isLinkActive(route) {
      return this.$route.path === route;
    },
  },
};
</script>

<style scoped>

.sidebar-content{
  overflow-y: auto; /* Enable vertical scrolling */
  /* Hide scrollbar for Firefox */
  /* scrollbar-width: none;

  -ms-overflow-style: none; */
  direction: rtl ;
}
.sidebar-content::-webkit-scrollbar {
  width: 7px; /* Width of the scrollbar */
  height: 10px; /* Height of the scrollbar */

}

.sidebar-content::-webkit-scrollbar-track {
  background: transparent; /* Track color */
}

.sidebar-content::-webkit-scrollbar-thumb {
  background-color: #ccc; /* Thumb color */
  border-radius: 5px; /* Rounded corners */
}
.sidebar-container {
  position: fixed;
  top: 65px;
  left: 0;
  height: 100%;

  overflow-x: hidden; /* Hide horizontal overflow */

}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* Semi-transparent gray */
  display: block;

}

.sidebar {
  background-color: var(--sidebar-bg-color);
  padding: 0.5em;
  position: sticky;
  top: 0;
  left: 0;
  width: 250px; /* Initial sidebar width */
  transition: transform 0.3s ease; /* Use transform for smoother animation */
  display: flex;
  flex-direction: column;
  /* z-index: 10; */
  height: calc(100vh - 65px);

}

.sidebar-link {
  margin-top: 5px;
  text-decoration: none;
  color: var(--sidebar-color);
  padding: 10px;
  font-weight: 700 ;
  font-size: 20px;
  display: flex;
  align-items: center;
  transition: background-color 0.3s ease; /* Smooth transition for hover effect */
}

.sidebar-link:hover {
  background-color: var(--sidebar-item-hover); /* Hover background color */

}

.sidebar-link.active {
  background-color: var(--sidebar-item-active); /* Active link background color */
  border-radius: 0px 10px 0px 10px;
}

.sidebar-text {
  margin-left: 10px; /* Adjust as needed */
  transition: opacity 0.3s ease; /* Smooth transition for text visibility */
  
}

.collapsed .sidebar-text {
  display: none;
}

.collapsed .sidebar {
  transform: translateX(-100%);
}

.collapsed {
  width: 80px; /* Collapsed width */
}

.collapse-icon {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 0.5em;
  color: var(--sidebar-color);
  text-align: right;
  cursor: pointer;
  border: none;
}

.bi {
  font-size: 1.5rem;
  margin-right: 0.5em;
  margin-left: 5px;
}

.bi.bi-arrow-bar-left {
  transform: rotate(0deg);
}

.bi.bi-arrow-bar-right {
  transform: rotate(180deg);
}

a {

  margin-left: 10px; /* Adjust link margin */
  direction: ltr;
}
</style>

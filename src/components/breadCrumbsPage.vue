<template>
  <nav aria-label="breadcrumb">
    <ol class="breadcrumb py-1 card widget-card border-light shadow-sm d-flex flex-row">
      <li
        v-for="(segment, index) in sanitizedSegments"
        :key="index"
        class="breadcrumb-item"
      >
        <router-link
          class="ms-3 fw-bold"
          :to="generateLink(index)"
        >
          {{ segment || 'Home' }} <!-- Default text for the first breadcrumb -->
        </router-link>
      </li>
    </ol>
  </nav>
</template>

<script>
import { computed } from 'vue';
import { useRoute } from 'vue-router';

export default {
  name: 'BreadCrumbsPage',
  setup() {
    const route = useRoute();

    const pathSegments = computed(() => route.path.split('/').filter(segment => segment));

    const sanitizedSegments = computed(() => pathSegments.value.map(segment => hideQueryString(segment)));

    const generateLink = (index) => {
      // Generate the link based on the segments up to the current index
      const segments = `/${pathSegments.value.slice(0, index + 1).join('/')}`;
      return segments;
    };

    const hideQueryString = (segment) => {
      const queryStringIndex = segment.indexOf('@');
      if (queryStringIndex !== -1) {
        // If segment contains a query string, remove it
        return segment.substring(0, queryStringIndex);
      }
      return segment;
    };

    return {
      sanitizedSegments,
      generateLink,
    };
  },
};
</script>

<style scoped>
.breadcrumb {
  background: transparent;
  padding: 0;
  margin: 5px 0;
}

.breadcrumb-item + .breadcrumb-item::before {
  content: '/';
  padding: 0 3px;
}

.router-link-active {
  color: #0d6efd;
}

a {
  color: #282828;
  text-decoration: none;
  font-size: 16px;
}

nav {
  background-color: white;
}
</style>

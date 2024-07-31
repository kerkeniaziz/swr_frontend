  import {ref , computed} from 'vue';

  export const collapsed = ref(false)
  export const toggleSidebar = () =>(collapsed.value = !collapsed.value)

  export const SIDEBAR_WIDTH = 250
  export const SIDEBAR_WIDHT_COLLAPSED = 80
  export const sidebarWith = computed(
    () => `${collapsed.value ? SIDEBAR_WIDHT_COLLAPSED : SIDEBAR_WIDTH}px`
  )

<template>
  <div>
    <DashboardAdmin v-if="userRole==='admin'" />
    <DashboardCandidate v-if="userRole ==='candidate'" />
  </div>
</template>
<script>
  import DashboardCandidate from '../components/candidate/dashboardCandidate.vue'
  import DashboardAdmin from '../components/admin/dashboardAdmin.vue';
    export default {
        name:'MainDashboard',
        components :{
            DashboardCandidate,
            DashboardAdmin
        },
        data() {
            return {}
        }, computed:{
      userRole: function(){
        return this.$store.state.userRole;
        
      }
    }
    }
</script>
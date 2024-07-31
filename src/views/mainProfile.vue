<template>
  <div>
    <ProfileCandidate v-if="userRole==='candidate'" />

    <ProfileAdmin v-if="userRole==='admin'" />
  </div>
</template>
  
  <script>
  //  
  import ProfileCandidate from '../components/candidate/profileCandidate.vue'
  import ProfileAdmin from '../components/admin/profileAdmin.vue';
  
  export default {
    name: "MainProfile",
    components: {
      ProfileCandidate,

      ProfileAdmin,
    },
    computed:{
      userRole: function(){
        return this.$store.state.userRole;
        
      }
    }
  }
</script>
  
  <style>

  </style>
  
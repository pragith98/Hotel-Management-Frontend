<template>
  <v-app>
    <app-AdminNavigation ></app-AdminNavigation>
    <!-- <app-AdminNavigation v-if="privilege == 'Super'"></app-AdminNavigation> -->
    <!-- <app-TeacherNavigation v-else-if="privilege == 'Guess'"></app-TeacherNavigation>
    <app-StandardNavigation v-else-if="privilege == 'Standard'"></app-StandardNavigation> -->
    <v-main class="blue-grey  lighten-5">
      <!-- <v-container> -->
        <router-view></router-view>
      <!-- </v-container> -->
      
    </v-main>

    <!-- <div style="bottom:10px;left: 0;right: 0;">
      <v-footer padless color="#ECEFF1">
        <v-col class="text-center grey--text" cols="12">© ICT Academy - Hakmana, Sri Lanka</v-col>
      </v-footer>
    </div> -->

  </v-app>
</template>


<script>
    import AdminNavigation from './components/Admin-Navigation.vue'
    // import TeacherNavigation from './components/Teacher-Navigation.vue'
    // import StandardNavigation from './components/Standard-Navigation.vue'

  export default{
    components:{
        'app-AdminNavigation':AdminNavigation,
        // 'app-TeacherNavigation':TeacherNavigation,
        // 'app-StandardNavigation':StandardNavigation
    },

    data(){
      return{
        logedUser : JSON.parse(localStorage.getItem('user')),
        privilege:''
      }
    },

    // created(){
    //   this.getUserPrivilege()
    // },

    methods:{
      getUserPrivilege(){
        if(this.logedUser){
          this.privilege = this.logedUser.privilege
        }
        
        
      }
    }
  }
</script>
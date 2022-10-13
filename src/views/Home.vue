<template>
    <div>
        


        <v-container class="mt-5">
            <h1 class="title font-weight-black grey--text">DASHBOARD</h1>
            <v-row class="mt-3">
                <v-col lg="3" md="3" sm="6" cols="12" class="mb-3" v-for="cardlist in cardlist" :key="cardlist.name">
                    <v-card flat  :color=cardlist.color dark class="lighten-2">
                        <!-- <v-row>
                            <v-col>
                                <v-responsive class="text-left ml-5">
                                    <v-icon size="80">{{cardlist.icon}}</v-icon>
                                </v-responsive>
                            </v-col>
                            <v-col class="text-right mr-5">
                                <div class="display-1 font-weight-black" >{{ cardlist.count }}</div>
                                <div class="title" >{{ cardlist.name }}</div>
                            </v-col>
                        </v-row> -->
                    </v-card>
                </v-col>
            </v-row>
            <v-row>
                <v-col>
                    
                    <!-- <v-card flat>
                        <v-card-title>TODAY CLASSES</v-card-title>
                        <v-data-table :headers="headers" :items="classes" :items-per-page="5">
                            <template v-slot:[`item.actions`]="{ item }">
                                <v-chip>{{item.day}}</v-chip>
                            </template>
                        </v-data-table>
                    </v-card> -->
                </v-col>
                <!-- <v-col>
                    <v-card flat width="566" height="200"> -->
                        

                        <!-- <v-card-title>EXPENDITURE</v-card-title>
                        <v-card width="800" height="190" flat class="px-5 pt-2">
                                <v-row>
                                    <v-col>
                                        <v-card flat color="red"  dark class="lighten-2 px-5">
                                            <v-row>
                                                <v-col  lg="6" md="6" sm="6" cols="12">
                                                    <v-responsive class="text-left pl-5">
                                                        <v-icon size="80">mdi-cash-clock</v-icon>
                                                    </v-responsive>
                                                </v-col>
                                            
                                            
                                                <v-col class="text-right pr-2"  lg="6" md="6" sm="6" cols="12">
                                                    <div class="display-1 font-weight-black" >444</div>
                                                    <div class="title" >DDDDDDDDDD</div>
                                                </v-col>
                                            </v-row>
                                        </v-card>
                                    </v-col>
                                </v-row>
                            </v-card> -->
                        <!-- <v-progress-circular class="ma-6" :rotate="-90" :size="150" :width="20" :value="expencesValue" color="primary">
                            <h2>{{ expencesValue }}%</h2>
                        </v-progress-circular> -->
                    <!-- </v-card>
                </v-col> -->
            </v-row>

        </v-container>
    </div>
</template>



<script>

    export default{

        data(){
            return{

                
                studentCount:'',
                teacherCount:'',
                staffCount:'',
                classCount:'',
                expencesValue:'',

                cardlist:[
                    {name:'STUDENTS', count:"", icon:'mdi-account-group', color:'purple lighten-2'},
                    {name:'TEACHERS', count:"", icon:'mdi-human-male-board', color:'pink lighten-2'},
                    {name:'EMPLOYEES', count:"", icon:'mdi-account-multiple', color:'brown'},
                    {name:'CLASSES', count:"", icon:'mdi-google-classroom', color:'blue'},
                    
                ],


                headers: [
                    { text: 'NAME',align: 'start', sortable: false, value:'className'},
                    { text: 'TIME', sortable: false, value: 'startTime',align: 'center' },
                    { text: 'LOCATION', sortable: false, value: 'room', align: 'end'},
                ],

                classes: [],
                

            }
        },

        created(){

            this.getClassDetails();
            this.getStudentCount();
            this.getTeacherCount();
            this.getStaffCount();
            this.getClassCount();
            this.getExpences();
        },

        methods:{

            getClassDetails(){
                const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
                const d = new Date();
                this.axios.get(this.$apiUrl+"/api/v1.0/ClassManagement/classes",{
                    params:{
                        status: "Active",
                        day:weekday[d.getDay()]
                    }
                }).then(Response=>(this.classes= Response.data.class.data))
            },

            getStudentCount(){
                this.axios.get(this.$apiUrl+"/api/v1.0/StudentManagement/students",{
                params:{
                    status: "Active"
                }
                
                }).then(Response=>(
                    this.studentCount=Response.data.student.meta.student_count,
                   

                    this.cardlist.forEach(element => {
                        if(element.name=="STUDENTS"){
                            element.count=this.studentCount
                        }
                    })
                ))
            },

            getTeacherCount(){
                this.axios.get(this.$apiUrl+"/api/v1.0/TeacherManagement/teachers",{
                params:{
                    status: "Active"
                }
                
                }).then(Response=>(
                    this.teacherCount=Response.data.teacher.meta.teacher_count,

                    this.cardlist.forEach(element => {
                        if(element.name=="TEACHERS"){
                            element.count=this.teacherCount
                            
                        }
                    })
                ))
            },

            getStaffCount(){
                this.axios.get(this.$apiUrl+"/api/v1.0/StaffManagement/staffs",{
                params:{
                    status: "Active"
                }
                
                }).then(Response=>(
                    this.staffCount=Response.data.staff.meta.staff_count,

                    this.cardlist.forEach(element => {
                        if(element.name=="EMPLOYEES"){
                            element.count=this.staffCount
                        }
                    })
                ))
            },

            getClassCount(){
                this.axios.get(this.$apiUrl+"/api/v1.0/ClassManagement/classes",{
                params:{
                    status: "Active"
                }
                
                }).then(Response=>(
                    this.classCount=Response.data.class.meta.class_count,

                    this.cardlist.forEach(element => {
                        if(element.name=="CLASSES"){
                            element.count=this.classCount
                        }
                    })
                ))
            },

            getExpences(){
                this.expencesValue=66;
            }
        }
        
    }
</script>




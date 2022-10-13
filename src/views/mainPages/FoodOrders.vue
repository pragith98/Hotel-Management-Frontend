<template>
    <div>

        
        <v-container>
            

            <v-snackbar :timeout="3000" v-model="unsuccessAlert" color="red" bottom>
                <v-icon left>mdi-alert-outline</v-icon> Student delete <strong>failed</strong>
            </v-snackbar>
            <v-snackbar :timeout="3000" v-model="successAlert" color="green" bottom>
                <v-icon left>mdi-check</v-icon>Student delete <strong>successful</strong>
            </v-snackbar>

            <template>
                <v-card flat class="mt-7">
                    <v-card-title class="heading-1 blue-grey lighten-4  blue-grey--text text--darken-2">Food Orders
                    </v-card-title>
                    <v-card-title>
                        <v-spacer></v-spacer>
                        <v-text-field v-model="search" append-icon="mdi-magnify" label="Search" single-line
                            hide-details></v-text-field>
                    </v-card-title>

                    <v-data-table :headers="headers" :items="orders" :search="search">
                        <template v-slot:[`item.actions`]="{ item }">
                            <v-card-actions>
                                <div>{{item.status}}</div>
                                <v-autocomplete :items="statusList" label="status" v-model="status" :item-text="item.status" return-object :item-value="item.status"></v-autocomplete>
                                <!-- <app-ViewStudentDetails @success="reCreate($event)" :student='item'>
                                </app-ViewStudentDetails>
                                <v-spacer></v-spacer>
                                <app-DeleteStudent class="ml-5" :student='item' @success="deleteAlert($event)"
                                    @failed="faileAlert($event)"></app-DeleteStudent> -->
                            </v-card-actions>
                        </template>
                    </v-data-table>
                </v-card>
            </template>



        </v-container>
    </div>


</template>

<script>
// import ViewStudentDetails from '../components/ViewStudentDetails.vue'
// import DeleteStudent from '../components/DeleteStudent.vue'

export default {
    // components: {
    //     'app-ViewStudentDetails': ViewStudentDetails,
    //     'app-DeleteStudent': DeleteStudent
    // },
    data() {
        return {
            search: '',
            status:'',
            headers: [
                { text: '#ID', align: 'start', sortable: true, value: 'id' },
                { text: 'NET PRICE',  sortable: false, value: 'price' },
                { text: 'DATE', align: 'start', sortable: false, value: 'date' },
                { text: 'STATUS', value: 'status' },
                { text: '', sortable: false, value: 'actions' },
            ],

            orders: [
                {id:'232', price:'2300', date:'2020-03-02', status:'pending', items:[
                    {id:'2'},
                    {id:'3'}
                ]}
            ],

            statusList: ['pending','Koththu','Drinks'],

            successAlert: false,
            unsuccessAlert: false,
        }
    },

    created() {
        this.getAllStudents();
    },

    methods: {

        getAllStudents() {
            this.axios.get(this.$apiUrl + "/api/v1.0/StudentManagement/students", {
                params: {
                    status: "Active"
                }

            }).then(Response => (
                this.students = Response.data.student.data,

                this.students.forEach(element => {
                    element.firstName = element.firstName + " " + element.lastName
                })
            ))
        },

        deleteAlert(success) {
            this.getAllStudents();
            this.successAlert = success;
        },
        faileAlert(failed) {
            this.unsuccessAlert = failed;
        },

        reCreate(success) {
            this.getAllStudents();
            console.log(success)

        },
    }
}
</script>
            





            
        
        


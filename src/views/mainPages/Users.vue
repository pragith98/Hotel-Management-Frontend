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
                    <v-card-title class="heading-1 blue-grey lighten-4  blue-grey--text text--darken-2">Users
                        <app-AddUsers class="mr-3"></app-AddUsers>
                    </v-card-title>
                    <v-card-title>
                        <v-spacer></v-spacer>
                        <v-text-field v-model="search" append-icon="mdi-magnify" label="Search" single-line
                            hide-details></v-text-field>
                    </v-card-title>

                    <v-data-table :headers="headers" :items="guests" :search="search">
                        <template v-slot:[`item.actions`]="{ item }">
                            <v-card-actions>
                                <app-EditUsers @success="reCreate($event)" :guest='item'>
                                </app-EditUsers>
                                <v-spacer></v-spacer>
                                <app-DeleteUsers class="ml-5" :guest='item' @success="deleteAlert($event)"
                                    @failed="faileAlert($event)"></app-DeleteUsers>
                            </v-card-actions>
                        </template>
                    </v-data-table>
                </v-card>
            </template>

        </v-container>
    </div>


</template>

<script>
    import AddUsers from '../../components/users/AddUsers.vue'
    import EditUsers from '../../components/users/EditUsers.vue'
    import DeleteUsers from '../../components/users/DeleteUsers.vue'

export default {
    components: {
        'app-AddUsers': AddUsers,
        'app-EditUsers': EditUsers,
        'app-DeleteUsers': DeleteUsers,
    },
    data() {
        return {
            search: '',
            headers: [
                { text: '#EMPLOYEE ID', align: 'start', sortable: true, value: 'no'},
                { text: 'USERNAME', align: 'start', sortable: false, value: 'name'},
                { text: 'STATUS', sortable: false, value: 'nic'},
                { text: '', sortable: false, value: 'actions'},
            ],

            guests: [
                {no:1, title:'Mr', firstName:'Saman', lastName:'Bandara', nic:'912323232v', gender:'male', email:'saman@g.com', telephone:'0776534323'},
            ],

            

            successAlert: false,
            unsuccessAlert: false,
        }
    },

    created() {
        this.getAllGuests()
    },

    methods: {
        getAllGuests(){
            this.guests.forEach(element => {
                element.name = element.title+". "+element.firstName+" "+element.lastName
            });
        },

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
            





            
        
        


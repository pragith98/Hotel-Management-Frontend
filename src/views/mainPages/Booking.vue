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
                    <v-card-title class="heading-1 blue-grey lighten-4  blue-grey--text text--darken-2">Bookings</v-card-title>
                    <v-card-title>
                        <v-spacer></v-spacer>
                        <v-text-field v-model="search" append-icon="mdi-magnify" label="Search" single-line
                            hide-details></v-text-field>
                    </v-card-title>

                    <v-data-table :headers="headers" :items="bookings" :search="search">
                        <template v-slot:[`item.actions`]="{ item }">
                            <v-card-actions>
                                <app-EditBooking @success="reCreate($event)" :guest='item'>
                                </app-EditBooking>
                                <v-spacer></v-spacer>
                                <app-DeleteBooking class="ml-5" :guest='item' @success="deleteAlert($event)"
                                    @failed="faileAlert($event)"></app-DeleteBooking>
                            </v-card-actions>
                        </template>
                    </v-data-table>
                </v-card>
            </template>

        </v-container>
    </div>


</template>

<script>
    
    import EditBooking from '../../components/bookings/EditBooking.vue'
    import DeleteBooking from '../../components/bookings/DeleteBooking.vue'

export default {
    components: {
        'app-EditBooking': EditBooking,
        'app-DeleteBooking': DeleteBooking,
    },
    data() {
        return {
            search: '',
            headers: [
                { text: 'BOOKING ID', align: 'start', sortable: true, value: 'id' },
                { text: 'DATE RANGE',  sortable: false, value: 'date' },
                { text: 'ROOM', align: 'start', sortable: false, value: 'room' },
                { text: 'STATUS', value: 'status' },
                { text: 'NO OF PERSONS', value: 'persons' },
                { text: 'BILL', sortable: false, value: 'bill' },
                { text: '', sortable: false, value: 'actions' },
            ],

            bookings: [
                {id:'323', dateFrom:'2020-05-01', dateTo:'2020-05-03', room:2, status:'booked', persons:2, bill:4500 }
            ],

            

            successAlert: false,
            unsuccessAlert: false,
        }
    },

    created() {
        this.getDate()
    },

    methods: {
        getDate(){
            this.bookings.forEach(element => {
                element.date = element.dateFrom+" - "+element.dateTo
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
            





            
        
        


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
                    <v-card-title class="heading-1 blue-grey lighten-4  blue-grey--text text--darken-2">Rooms
                        <app-AddRooms class="mr-3"></app-AddRooms>
                    </v-card-title>
                    <v-card-title>
                        <v-spacer></v-spacer>
                        <v-text-field v-model="search" append-icon="mdi-magnify" label="Search" single-line
                            hide-details></v-text-field>
                    </v-card-title>

                    <v-data-table :headers="headers" :items="rooms" :search="search">
                        <template v-slot:[`item.actions`]="{ item }">
                            <v-card-actions>
                                <app-EditRooms @success="reCreate($event)" :room='item'>
                                </app-EditRooms>
                                <v-spacer></v-spacer>
                                <app-DeleteRooms class="ml-5" :room='item' @success="deleteAlert($event)"
                                    @failed="faileAlert($event)"></app-DeleteRooms>
                            </v-card-actions>
                        </template>
                    </v-data-table>
                </v-card>
            </template>

        </v-container>
    </div>


</template>

<script>
    import AddRooms from '../../components/rooms/AddRooms.vue'
    import EditRooms from '../../components/rooms/EditRooms.vue'
    import DeleteRooms from '../../components/rooms/DeleteRooms.vue'

export default {
    components: {
        'app-AddRooms': AddRooms,
        'app-EditRooms': EditRooms,
        'app-DeleteRooms': DeleteRooms,
    },
    data() {
        return {
            search: '',
            headers: [
                { text: '#ID', align: 'start', sortable: true, value: 'id' },
                { text: 'NAME', align: 'start', sortable: false, value: 'name' },
                { text: 'TYPE', sortable: false, value: 'type' },
                { text: 'BED', value: 'bed' },
                { text: 'BED TYPE', sortable: false, value: 'bedType' },
                { text: 'PRICE', sortable: false, value: 'price' },
                { text: 'DESCRIPTION', sortable: false, value: 'description' },
                { text: '', sortable: false, value: 'actions' },
            ],

            rooms: [
                {id:1, name:'name', type:'ac', bed:'2', bedType:'single', price:'2000', description:'room description'},
                {id:42, name:'name', type:'non-ac', bed:'1', bedType:'double', price:'2000', description:'room description'},
                {id:23, name:'name', type:'non-ac', bed:'2', bedType:'single', price:'2000', description:'room description'},
                {id:12, name:'name', type:'ac', bed:'2', bedType:'double', price:'5000', description:'room description'}
            ],


            successAlert: false,
            unsuccessAlert: false,
        }
    },

    created() {
        //this.getAllStudents();
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
            





            
        
        


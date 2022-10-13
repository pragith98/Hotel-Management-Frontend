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
                    <v-card-title class="heading-1 blue-grey lighten-4  blue-grey--text text--darken-2">Food Items
                        <app-AddFoods class="mr-3"></app-AddFoods>
                    </v-card-title>
                    <v-card-title>
                        <v-spacer></v-spacer>
                        <v-text-field v-model="search" append-icon="mdi-magnify" label="Search" single-line
                            hide-details></v-text-field>
                    </v-card-title>

                    <v-data-table :headers="headers" :items="foods" :search="search">
                        <template v-slot:[`item.actions`]="{ item }">
                            <v-card-actions>
                                <app-EditFoods @success="reCreate($event)" :food='item'>
                                </app-EditFoods>
                                <v-spacer></v-spacer>
                                <app-DeleteFoods class="ml-5" :food='item' @success="deleteAlert($event)"
                                    @failed="faileAlert($event)"></app-DeleteFoods>
                            </v-card-actions>
                        </template>
                    </v-data-table>
                </v-card>
            </template>

        </v-container>
    </div>


</template>

<script>
    import AddFoods from '../../components/foods/AddFoods.vue'
    import EditFoods from '../../components/foods/EditFoods.vue'
    import DeleteFoods from '../../components/foods/DeleteFoods.vue'

export default {
    components: {
        'app-AddFoods': AddFoods,
        'app-EditFoods': EditFoods,
        'app-DeleteFoods': DeleteFoods,
    },
    data() {
        return {
            search: '',
            headers: [
                { text: '#No', align: 'start', sortable: true, value: 'no' },
                { text: '',  sortable: false, value: 'image' },
                { text: 'NAME', align: 'start', sortable: false, value: 'name' },
                { text: 'PRICE', value: 'price' },
                { text: 'CATEGORY', sortable: false, value: 'category' },
                { text: 'DESCRIPTION', sortable: false, value: 'description' },
                { text: '', sortable: false, value: 'actions' },
            ],

            foods: [
                {no:1, image:"", name:"roti", price:"Rs.50", category: "unknown", description:"roti description"},
                {no:2, image:"", name:"parata", price:"Rs.150", category: "unknown", description:"parata description"},
                {no:3, image:"", name:"bun", price:"Rs.100", category: "unknown", description:"bun description"},
                {no:4, image:"", name:"rolls", price:"Rs.50", category: "unknown", description:"rolls description"}
            ],

            breadcrumbs: [
                { text: 'Foods', disabled: false, href: '/Foods' },
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
            





            
        
        


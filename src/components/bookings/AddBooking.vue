<template>
    <v-row justify="center">
        <v-dialog v-model="dialog" scrollable max-width="700px" persistent>
            <template v-slot:activator="{ on, attrs }">
                <v-btn :disabled="show<=0" block class="primary" depressed v-bind="attrs" v-on="on">Add Booking</v-btn>
            </template>

            <v-card max-width="700" flat>
                <v-card-title class="heading-1 blue-grey lighten-4  blue-grey--text text--darken-2">Add Booking
                </v-card-title>
                <v-divider></v-divider>

                <v-card-text>
                    <v-form ref="form" v-model="valid" lazy-validation>
                        <v-row style="padding:12px">

                            <v-col>
                                <v-row justify="center" dense>
                                    <v-col cols="8" md="8" sm="8">
                                        <v-text-field v-model="tp" placeholder="ex: 0714332332" :rules="tpRules"
                                            label="Guest's Telephone No." required maxlength="10"></v-text-field>
                                    </v-col>

                                    <v-col cols="4" md="4" sm="4" align-self="center">
                                        <v-btn depressed color="primary">Check The Guest</v-btn>
                                    </v-col>
                                </v-row>

                                <v-row v-show="true">
                                    <v-col>
                                        <v-card class="pa-5 lighten-3" flat color="grey">
                                            <v-card-text>Not found any records. Please register the guest.</v-card-text>
                                            <app-AddGuests></app-AddGuests>
                                        </v-card>
                                    </v-col>
                                </v-row>

                                <v-row v-show="true">
                                    <v-col cols="12" md="6" sm="6">
                                        <template>
                                            <div>
                                                <v-menu ref="menud" v-model="startdateMenu"
                                                    :close-on-content-click="false" transition="scale-transition"
                                                    offset-y min-width="auto">
                                                    <template v-slot:activator="{ on, attrs }">
                                                        <v-text-field v-model="startdate" label="Date From" readonly
                                                            v-bind="attrs" v-on="on" :rules="dateRules"></v-text-field>
                                                    </template>
                                                    <v-date-picker @input="startdateMenu = false" v-model="startdate"
                                                        @change="enddate=startdate"
                                                        :active-picker.sync="startdatePicker"
                                                        :min="(new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)">
                                                    </v-date-picker>
                                                </v-menu>
                                            </div>
                                        </template>
                                    </v-col>

                                    <v-col cols="12" md="6" sm="6">
                                        <template>
                                            <div>
                                                <v-menu ref="menud" v-model="enddateMenu"
                                                    :close-on-content-click="false" transition="scale-transition"
                                                    offset-y min-width="auto">
                                                    <template v-slot:activator="{ on, attrs }">
                                                        <v-text-field v-model="enddate" label="Date To" readonly
                                                            v-bind="attrs" v-on="on" :rules="dateRules"></v-text-field>
                                                    </template>
                                                    <v-date-picker @input="enddateMenu = false" v-model="enddate"
                                                        :active-picker.sync="enddatePicker" :min=startdate>
                                                    </v-date-picker>
                                                </v-menu>
                                            </div>
                                        </template>
                                    </v-col>
                                </v-row>

                                <v-row>
                                    <v-col>
                                        <v-data-table :headers="headers" :items="selectedItems" hide-default-footer>                                          
                                        </v-data-table>
                                    </v-col>

                                    <v-col>
                                        <v-row class="ml-5 mt-3">
                                            <v-card-title class="display-1"> Total &nbsp; <strong>
                                                    Rs.{{total}}.00</strong>
                                            </v-card-title>
                                        </v-row>
                                    </v-col>
                                    

                                </v-row>

                            </v-col>
                        </v-row>
                    </v-form>
                </v-card-text>
                <v-divider></v-divider>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn @click="dialog = false, Reset ()" outlined color="grey">Cancel</v-btn>
                    <v-btn :loading="loading"
                        :disabled="!valid || !getTitle || !fname || !lname || !tp || !email || !address || !getGender || !nicNo || !nicType || !employeeType || !Bdate || !date"
                        color="primary" @click="createSubject()" depressed>Save</v-btn>
                </v-card-actions>

            </v-card>
        </v-dialog>
    </v-row>
</template>



<script>
import AddGuests from '../../components/guests/AddGuests.vue'
export default {
    props: ['selectedItems','total','show'],
    components: {
        'app-AddGuests': AddGuests
    },

    data() {
        return {
            loading: false,
            dialog: false,
            valid: true,
            getTitle: '',
            fname: '',
            lname: '',
            tp: '',
            email: '',
            address: '',
            getGender: '',
            nicNo: '',
            nicType: 'old',
            employeeType: '',

            startdatePicker: null,
            startdate: '',
            startdateMenu: false,

            enddatePicker: null,
            enddate: '',
            enddateMenu: false,

            headers: [
                { text: 'ROOM', align: 'start', sortable: false, value: 'no' },
                { text: 'NAME', align: 'start', sortable: false, value: 'name' },
                { text: 'PERSONS', sortable: false, value: 'persons' },
                { text: 'PRICE', sortable: false, value: 'price' },
                { text: '', sortable: false, value: 'actions' },
            ],

            // -----------Validation rules-----------
            nameRules: [v => !!v || 'Name is required', v => /^[a-zA-Z_ ]*$/.test(v) || 'Must be text only', v => (v && v.length > 2) || 'Name must be greater than 2'],
            titleRules: [v => !!v || 'Title is required'],
            genderRules: [v => !!v || 'Gender is required'],
            newNicRules: [v => !!v || 'NIC is required', v => /^\d+$/.test(v) || 'Must be a number', v => (v && v.length == 12) || 'New Nic no. must have 12 numbers'],
            oldNicRules: [v => !!v || 'NIC is required', v => /[0-9]+[vxVX]/.test(v) || 'Please insert valid NIC', v => (v && v.length == 10) || 'Old Nic no. must have 10 characters'],
            tpRules: [v => !!v || 'Telephone no. is required', v => /^\d+$/.test(v) || 'Must be a number', v => (v && v.length == 10) || 'Telephone no. must be 10'],
            emailRules: [v => !!v || 'email is required', v => /.+@.+\..+/.test(v) || 'email must be valid'],
            addressRules: [v => !!v || 'Address is required', v => (v && v.length > 5) || 'Address must be greater than 5'],
            dateRules: [v => !!v || 'Date is required'],
            typeRules: [v => !!v || 'Employee type is required'],


            // -----------dropdown list-----------
            gender: ['Male', 'Female', 'Other'],
            title: ['Mr.', 'Ms.', 'Mrs.', 'Miss.', 'Rev.'],
            types: ['Mr.', 'Ms.', 'Mrs.', 'Miss.', 'Rev.'],


        }
    },


    methods: {
        //get current date and time
        getDateTime() {
            this.date = (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)
        },

        createCategory() {
            var rule = /^[a-zA-Z\s.]+$/;
            if (!rule.test(this.newCategory)) {
                this.errormsg = "Must be text only"
            } else if (this.newCategory.length < 4) {
                this.errormsg = "Name must be greater than 3"
            } else {
                this.errormsg = null



                this.axios.post(this.$apiUrl + "/api/v1.0/CategoryManagement/categories", {
                    categoryName: this.newCategory
                })
                    .then(Response => {
                        if (Response.data.success == true) {
                            this.newCategory = null
                            this.categoryCreated = true
                            this.hideTable = false
                            this.hideActions = false

                            this.getAllCategories()
                        } else {
                            console.log('error in category creation');
                        }
                    })

            }
        },

        Reset() {
            this.$refs.form.reset()
            window.scrollTo(0, 0)
        },

        successAlert() {
            this.$emit('success', true)
        },
        failedAlert() {
            this.$emit('failed', true)
        }








    }
}
</script>


<style scoped>
fieldset {
    border-color: rgb(225, 225, 225);
    border-style: solid;
    border: 0.1;
    border-style: solid;
}
</style>
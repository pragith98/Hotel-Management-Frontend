<template>
    <v-row justify="end">
        <v-dialog v-model="dialog" scrollable max-width="700px" persistent>
            <template v-slot:activator="{ on, attrs }">
                <v-btn @click="getEmployees()" x-small class="blue-grey" fab dark depressed v-bind="attrs" v-on="on">
                    <v-icon dark>mdi-eye</v-icon>
                </v-btn>
            </template>

            <v-card max-width="700" flat>
                <v-card-title class="heading-1 blue-grey lighten-4  blue-grey--text text--darken-2">Guest
                </v-card-title>
                <v-divider></v-divider>

                <v-card-text>
                    <v-form ref="form" v-model="valid" lazy-validation>
                        <v-row style="padding:12px">

                            <v-col>
                                <v-row justify="center" dense>

                                    <v-col cols="12" md="12" sm="12">
                                        <v-select :items="title" :rules="titleRules" label="Title" v-model="getTitle">
                                        </v-select>
                                    </v-col>

                                    <v-col cols="12" md="6" sm="6">
                                        <v-text-field v-model="fname" :rules="nameRules" label="First Name" required>
                                        </v-text-field>
                                    </v-col>

                                    <v-col cols="12" md="6" sm="6">
                                        <v-text-field v-model="lname" :rules="nameRules" label="Last Name" required>
                                        </v-text-field>
                                    </v-col>

                                    <v-col cols="12" md="6" sm="6">
                                        <v-radio-group v-model="nicType" row
                                            style="flex-wrap:nowrap !important; justify-content:center !important ">
                                            <v-radio label="Old NIC" value="old"></v-radio>
                                            <v-radio label="New NIC" value="new"></v-radio>
                                        </v-radio-group>
                                    </v-col>

                                    <v-col cols="12" md="6" sm="6">
                                        <v-text-field v-if="nicType=='new'" placeholder="ex: 199836487634"
                                            v-model="nicNo" :rules="newNicRules" label="NIC no.new" required
                                            maxlength="12"></v-text-field>
                                        <v-text-field v-else-if="nicType=='old'" placeholder="ex: 981232289v"
                                            v-model="nicNo" :rules="oldNicRules" label="NIC no.old" required
                                            maxlength="10"></v-text-field>
                                    </v-col>

                                    <v-col cols="12" md="6" sm="6">
                                        <v-select :items="gender" :rules="genderRules" label="Gender"
                                            v-model="getGender"></v-select>
                                    </v-col>

                                    <v-col cols="12" md="6" sm="6">
                                        <v-text-field v-model="tp" placeholder="ex: 0714332332" :rules="tpRules"
                                            label="Telephone No." required maxlength="10"></v-text-field>
                                    </v-col>

                                    <v-col cols="12" md="6" sm="6">
                                        <template>
                                            <div>
                                                <v-menu ref="menud" v-model="BdateMenu" :close-on-content-click="false"
                                                    transition="scale-transition" offset-y min-width="auto">
                                                    <template v-slot:activator="{ on, attrs }">
                                                        <v-text-field v-model="Bdate" label="Birthday" readonly
                                                            v-bind="attrs" v-on="on" :rules="dateRules"></v-text-field>
                                                    </template>
                                                    <v-date-picker @input="BdateMenu = false" v-model="Bdate"
                                                        :active-picker.sync="BdatePicker"
                                                        :max="(new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)"
                                                        min="1950-01-01"></v-date-picker>
                                                </v-menu>
                                            </div>
                                        </template>
                                    </v-col>

                                    <v-col cols="12" md="6" sm="6">
                                        <v-text-field v-model="email" :rules="emailRules" label="E-mail" required>
                                        </v-text-field>
                                    </v-col>

                                    <v-col cols="12" md="12" sm="12">
                                        <v-text-field v-model="address" :rules="addressRules" label="Address" required>
                                        </v-text-field>
                                    </v-col>

                                    <v-col cols="12" md="6" sm="6">
                                        <v-text-field v-model="basicSalary" placeholder="ex: 2500.00"
                                            :rules="salaryRules" label="Basic Salary" required maxlength="10">
                                        </v-text-field>
                                    </v-col>

                                    <v-col cols="12" md="6" sm="6">
                                        <v-select disabled :items="types" :rules="typeRules" label="Employee Type"
                                            v-model="employeeType">
                                        </v-select>
                                    </v-col>

                                    <v-col cols="12" md="6" sm="6">
                                        <v-select :items="statusList" :rules="statusRules" label="Employee status"
                                            v-model="status">
                                        </v-select>
                                    </v-col>

                                    <v-col cols="12" md="6" sm="6"></v-col>

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
                        :disabled="!valid || !getTitle || !fname || !lname || !tp || !email || !address || !getGender || !nicNo || !nicType || !employeeType || !Bdate || !basicSalary"
                        color="primary" @click="updateEmployee()" depressed>Update</v-btn>
                </v-card-actions>

            </v-card>

            <v-snackbar :timeout="3000" v-model="unsuccess" color="red" bottom>
                <v-icon left>mdi-alert-outline</v-icon> Employee update has been<strong>failed</strong>
            </v-snackbar>

        </v-dialog>

        <v-snackbar :timeout="3000" v-model="success" color="green" bottom>
            <v-icon left>mdi-check</v-icon>Employee update has been <strong>successful</strong>
        </v-snackbar>

    </v-row>
</template>



<script>
export default {
    props: ['employee'],
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
            nicType: '',
            employeeType: '',
            basicSalary: '',
            status:'',

            BdatePicker: null,
            Bdate: '',
            BdateMenu: false,

            success: false,
            unsuccess: false,

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
            salaryRules: [v => !!v || 'Salary is required', v => /^\d+$/.test(v) || 'Must be a number'],
            statusRules: [v => !!v || 'status is required'],


            // -----------dropdown list-----------
            gender: ['Male', 'Female', 'Other'],
            title: ['Mr.', 'Ms.', 'Mrs.', 'Miss.'],
            types: ['Chef', 'Manager', 'Receptionist', 'Waiter', 'Cashier'],
            statusList: ['Active', 'Deactivate'],


        }
    },


    methods: {

        getEmployees() {
            this.axios.get(this.$apiUrl + "/api/v1.0/employees/" + this.employee.id).then(Response => {
                this.employeeType = Response.data.employeeType,
                    this.getTitle = Response.data.title,
                    this.nicNo = Response.data.nic,
                    this.fname = Response.data.firstName,
                    this.lname = Response.data.lastName,
                    this.Bdate = Response.data.dob,
                    this.getGender = Response.data.sex,
                    this.tp = Response.data.telNo,
                    this.address = Response.data.address,
                    this.email = Response.data.email,
                    this.basicSalary = Response.data.salary,
                    this.status = Response.data.status

                if (this.nicNo.length > 10) {
                    this.nicType = 'new'
                } else {
                    this.nicType = 'old'
                }

            })
        },


        updateEmployee() {
            this.loading = true
            this.axios.put(this.$apiUrl + "/api/v1.0/employees/"+ this.employee.id, {
                title: this.getTitle,
                nic: this.nicNo,
                firstName: this.fname,
                lastName: this.lname,
                dob: this.Bdate,
                sex: this.getGender,
                telNo: this.tp,
                address: this.address,
                email: this.email,
                salary: this.basicSalary + ".00",
                status: this.status

            }).then(Response => {
                if (Response.data == true) {
                    this.successAlert()
                    this.loading = false
                    this.dialog = false
                    this.Reset()
                } else {
                    this.unsuccessAlert = true
                    this.loading = false
                }
            }).catch(error => {
                this.unsuccessAlert = true
                this.loading = false
                console.log(error.data)
            });
        },


        Reset() {
            this.$refs.form.reset()
            window.scrollTo(0, 0)
        },

        successAlert() {
            this.$emit('success', true)
            this.success=true
        },
        failedAlert() {
            this.$emit('failed', true)
            this.success=false
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
<template>
    <v-row justify="end">
        <v-dialog v-model="dialog" scrollable max-width="700px" persistent>
            <template v-slot:activator="{ on, attrs }">
                <v-btn class="blue-grey" dark depressed v-bind="attrs" v-on="on">Add Guest
                    <v-icon dark right>mdi-plus</v-icon>
                </v-btn>
            </template>

            <v-card max-width="700" flat>
                <v-card-title class="heading-1 blue-grey lighten-4  blue-grey--text text--darken-2">Add Guest
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

                                    <v-col cols="12" md="12" sm="12">
                                        <v-text-field v-model="email" :rules="emailRules" label="E-mail" required>
                                        </v-text-field>
                                    </v-col>

                                    <v-col cols="12" md="12" sm="12">
                                        <v-text-field v-model="address" :rules="addressRules" label="Address" required>
                                        </v-text-field>
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
                        :disabled="!valid || !getTitle || !fname || !lname || !tp || !email || !address || !getGender || !nicNo || !nicType "
                        color="primary" @click="createSubject()" depressed>Save</v-btn>
                </v-card-actions>

            </v-card>
        </v-dialog>
    </v-row>
</template>



<script>
export default {

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

            // -----------Validation rules-----------
            nameRules: [v => !!v || 'Name is required', v => /^[a-zA-Z_ ]*$/.test(v) || 'Must be text only', v => (v && v.length > 2) || 'Name must be greater than 2'],
            titleRules: [v=> !!v || 'Title is required'],
            genderRules: [v=> !!v || 'Gender is required'],
            newNicRules: [v=> !!v || 'NIC is required', v => /^\d+$/.test(v) || 'Must be a number', v=> (v && v.length ==12)|| 'New Nic no. must have 12 numbers'],
            oldNicRules: [v=> !!v || 'NIC is required', v => /[0-9]+[vxVX]/.test(v) || 'Please insert valid NIC', v=> (v && v.length ==10)|| 'Old Nic no. must have 10 characters'],
            tpRules: [v=> !!v || 'Telephone no. is required', v => /^\d+$/.test(v) || 'Must be a number', v=> (v && v.length ==10)|| 'Telephone no. must be 10'],      
            emailRules: [v=> !!v || 'email is required', v=> /.+@.+\..+/.test(v) || 'email must be valid'],                    
            addressRules: [v=> !!v || 'Address is required', v=> (v && v.length >5)|| 'Address must be greater than 5'],

            // -----------dropdown list-----------
            gender:['Male','Female','Other'],
            title:['Mr.', 'Ms.', 'Mrs.', 'Miss.', 'Rev.'],

        }
    },


    methods: {
        
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
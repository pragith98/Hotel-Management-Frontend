<template>
    <v-row justify="end">
        <v-dialog v-model="dialog" scrollable max-width="700px" persistent>
            <template v-slot:activator="{ on, attrs }">
                <v-btn x-small class="blue-grey" fab dark depressed v-bind="attrs" v-on="on"><v-icon dark>mdi-pencil</v-icon></v-btn>
            </template>

            <v-card max-width="700" flat>
                <v-card-title class="heading-1 blue-grey lighten-4  blue-grey--text text--darken-2">Edit Room
                </v-card-title>
                <v-divider></v-divider>

                <v-card-text>
                    <v-form ref="form" v-model="valid" lazy-validation>
                        <v-row style="padding:12px">
                            <v-col max-width="600">

                                <v-row justify="center" dense>
                                    <v-col cols="12" md="12" sm="12">
                                        <v-text-field v-model="name" :rules="nameRules" label="Name" required>
                                        </v-text-field>
                                    </v-col>

                                    <v-col cols="12" md="12" sm="12">
                                        <v-select :items="types" :rules="typeRules" label="Type"
                                            v-model="type"></v-select>
                                    </v-col>

                                    <v-col cols="12" md="12" sm="12">
                                        <v-text-field v-model="bed" :rules="bedRules" label="Bed" required>
                                        </v-text-field>
                                    </v-col>

                                    <v-col cols="12" md="12" sm="12">
                                        <v-select :items="bedTypes" :rules="bedTypeRules" label="Bed Type"
                                            v-model="bedType"></v-select>
                                    </v-col>

                                    <v-col cols="12" md="12" sm="12">
                                        <v-text-field v-model="price" :rules="priceRules" label="Price" required>
                                        </v-text-field>
                                    </v-col>

                                    <v-col cols="12" md="12" sm="12">
                                        <v-text-field v-model="description" :rules="descriptionRules"
                                            label="Description" required></v-text-field>
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
                    <v-btn :loading="loading" :disabled="!valid || !name || !price || !description || !type || !bedType || !bed"
                        color="primary" @click="createSubject()" depressed>Update</v-btn>
                </v-card-actions>

            </v-card>
        </v-dialog>
    </v-row>
</template>



<script>
export default {
    props:['room'],
    data() {
        return {
            loading: false,
            dialog: false,
            valid: true,
            name: "",
            price: "",
            description: "",
            type: "",
            bedType: "",
            bed: "",

            // -----------Validation rules-----------
            nameRules: [v => !!v || 'Name is required', v => /^[a-zA-Z_ ]*$/.test(v) || 'Must be text only', v => (v && v.length > 2) || 'Name must be greater than 2'],
            descriptionRules: [v => !!v || 'Description is required'],
            typeRules: [v => !!v || 'Room type is required'],
            bedTypeRules: [v => !!v || 'Bed type is required'],
            bedRules: [v => !!v || 'Bed is required'],
            priceRules: [v => !!v || 'Price is required'],

            // -----------dropdown list-----------
            types: ['AC', 'Non-AC',],
            bedTypes: ['Single', 'Double']

        }
    },


    methods: {
        onPickFile() {
            this.$refs.fileInput.click();
        },
        onFilePicked(event) {
            const files = event.target.files
            let filename = files[0].name
            if (filename.lastIndexOf('.') <= 0) {
                return alert('please add a valid file!!!')
            }
            const fileReader = new FileReader()
            fileReader.addEventListener('load', () => {
                this.imageUrl = fileReader.result
            })
            fileReader.readAsDataURL(files[0])
            this.image = files[0]
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
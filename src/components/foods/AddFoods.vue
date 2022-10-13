<template>
    <v-row justify="end">
        <v-dialog v-model="dialog" scrollable max-width="700px" persistent>
            <template v-slot:activator="{ on, attrs }">
                <v-btn class="blue-grey" dark depressed v-bind="attrs" v-on="on">Add Food
                    <v-icon dark right>mdi-plus</v-icon>
                </v-btn>
            </template>

            <v-card max-width="700" flat>
                <v-card-title class="heading-1 blue-grey lighten-4  blue-grey--text text--darken-2">Add Food
                </v-card-title>
                <v-divider></v-divider>

                <v-card-text>
                    <v-form ref="form" v-model="valid" lazy-validation>
                        <v-row style="padding:12px">
                            <v-col max-width="600">
                                <v-responsive class="text-center">
                                    <v-avatar size="150" class="mb-2">
                                        <v-icon size="150" v-if="!imageUrl">mdi-account-circle</v-icon>
                                        <img :src="imageUrl" v-if="imageUrl">
                                    </v-avatar> <br>
                                    <v-btn @click="onPickFile" depressed class="white grey--text">
                                        <v-icon left>mdi-camera</v-icon>
                                        <span>upload image</span>
                                    </v-btn>
                                </v-responsive>
                                <input type="file" v-show="false" ref="fileInput" accept="image/*"
                                    @change="onFilePicked">

                                <v-row justify="center" dense>
                                    <v-col cols="12" md="12" sm="12">
                                        <v-select :items="categories" :rules="categoryRules" label="Category"
                                            v-model="category"></v-select>
                                    </v-col>

                                    <v-col cols="12" md="12" sm="12">
                                        <v-text-field v-model="name" :rules="nameRules" label="Name" required>
                                        </v-text-field>
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
                    <v-btn :loading="loading" :disabled="!valid || !name || !price || !category || !description"
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
            imageUrl: '',
            image: null,
            loading: false,
            dialog: false,
            valid: true,
            name: "",
            price: "",
            description: "",
            category: "",

            // -----------Validation rules-----------
            nameRules: [v => !!v || 'Name is required', v => /^[a-zA-Z_ ]*$/.test(v) || 'Must be text only', v => (v && v.length > 2) || 'Name must be greater than 2'],
            descriptionRules: [v => !!v || 'Description is required'],
            categoryRules: [v => !!v || 'Category is required'],
            priceRules: [v => !!v || 'Price is required'],

            // -----------dropdown list-----------
            categories: ['Short eats', 'category 2', 'category 3']

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
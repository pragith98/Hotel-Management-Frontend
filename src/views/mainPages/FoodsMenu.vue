<template>
    <div>

        <v-container>
            <h1 class="title font-weight-black grey--text mt-3 mb-3">Foods Menu</h1>

            <v-row>
                <v-col lg="8" md="8" sm="8" cols="12" max-width="600">
                    <v-row>
                        <v-col>
                            <v-card class="pa-2 pl-4">
                                <v-row>
                                    <v-col cols="6">
                                        <v-select :items="categories" label="Category" v-model="category"></v-select>
                                    </v-col>
                                </v-row>
                                
                            </v-card>
                        </v-col>
                    </v-row>

                    <v-row>
                        <v-col lg="3" md="4" sm="6" cols="12" v-for="cardlist in cardlist" :key="cardlist.name">
                            <v-hover close-delay="100" v-slot="{hover}">
                                <v-card :elevation="hover? 7:0" flat class="'on-hover': hover lighten-2">

                                    <v-responsive class="pt-4 text-center">
                                        <v-responsive class="text-center">
                                            <img width="150" height="150"
                                                :src="require(`../../assets/foods/${cardlist.img}`)">
                                        </v-responsive>
                                    </v-responsive>
                                    <v-card-text class=" mb-5" style="justify-content:center">
                                        <div class="subtitle-1" v-if="(cardlist.name).length<15">{{ cardlist.name }}
                                        </div>
                                        <div class="subtitle-1" v-else>{{ (cardlist.name).substring(0,14)+".. " }}</div>
                                        <div class="subtitle-2">Price Rs.{{ cardlist.price }}</div>
                                        <v-btn depressed color="primary" block small
                                            @click="foodDetailsDialog = true, selectedFoodImage = cardlist.img, selectedFood = cardlist">
                                            View</v-btn>
                                    </v-card-text>

                                </v-card>
                            </v-hover>

                        </v-col>
                    </v-row>
                </v-col>
                <v-col lg="4" md="4" sm="4" cols="12" max-width="200">
                    <v-card>
                        <v-card-title>Bill</v-card-title>

                        <v-data-table :headers="headers" :items="selectedItems" hide-default-footer>
                            <template v-slot:[`item.actions`]="{ item }">
                                <v-card-actions>
                                    <v-btn class="error" fab dark x-small depressed @click="deleteItem(item)">
                                        <v-icon dark>mdi-delete</v-icon>
                                    </v-btn>
                                </v-card-actions>
                            </template>
                        </v-data-table>
                        <v-row class="ml-5 mt-3">
                            <v-card-title class="display-1"> Total &nbsp; <strong> Rs.{{total}}.00</strong>
                            </v-card-title>
                        </v-row>
                        <v-row class="pa-3 ma-1">
                            <v-btn block color="primary" :disabled="selectedItems.length==0" depressed>Submit</v-btn>
                        </v-row>

                    </v-card>
                </v-col>
            </v-row>


            <!----------------------------------- dialog box / food details ------------------------------------------>

            <v-dialog v-model="foodDetailsDialog" persistent max-width="500px">
                <v-card>
                    <v-img :src="require(`../../assets/foods/${selectedFoodImage}`)" height="200"></v-img>
                    <v-card-text class="title"><strong>{{selectedFood.name}}</strong> <br>
                        <v-chip>Price Rs.{{selectedFood.price}}</v-chip>
                    </v-card-text>
                    <v-card-text>{{selectedFood.description}}</v-card-text>

                    <v-divider></v-divider>
                    <legend>
                        <v-card-text class="grey--text">Add to bill</v-card-text>
                    </legend>
                    <v-card-text>
                        <v-row class="ml-3 mr-3">
                            <v-col cols="9" align-self="center">Select quantity of this food</v-col>
                            <v-col cols="3" align-self="center">
                                <v-text-field v-model="quantity" :rules="qtyRules"
                                    prepend-inner-icon="mdi-minus-circle-outline" append-icon="mdi-plus-circle-outline"
                                    @click:prepend-inner="substractQty()" @click:append="addQty()">
                                </v-text-field>
                            </v-col>
                            <v-btn :disabled="!valid || quantity<=0" outlined depressed block color="primary"
                                @click="addItems()">Add to
                                bill</v-btn>
                        </v-row>
                    </v-card-text>
                    <v-divider></v-divider>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn class="mr-2" depressed color="primary" @click="foodDetailsDialog = false, quantity=0">Ok
                        </v-btn>
                    </v-card-actions>

                </v-card>
            </v-dialog>

            <!----------------------------------- dialog box ------------------------------------------>

        </v-container>
    </div>
</template>



<script>

export default {

    data() {
        return {
            foodDetailsDialog: false,
            selectedFoodImage: 'noFoodImage.jpg',
            selectedFood: [],
            quantity: 0,
            valid: true,
            selectedItems: [],
            total: 0,

            headers: [
                { text: 'NO', align: 'start', sortable: false, value: 'no' },
                { text: 'NAME', align: 'start', sortable: false, value: 'name' },
                { text: 'QTY', sortable: false, value: 'quantity' },
                { text: 'PRICE', sortable: false, value: 'price' },
                { text: '', sortable: false, value: 'actions' },
            ],

            cardlist: [
                { name: 'Roti', img: 'roti.jpg', price: '50.00', description: 'food description food description' },
                { name: 'Parippu wade', img: 'wade.jpg', price: '100.00', description: 'food description food description' },
                { name: 'Roti', img: 'roti.jpg', price: '150.00', description: 'food description food description' },
                { name: 'Roti', img: 'roti.jpg', price: '20.00', description: 'food description food description' },
                { name: 'Roti', img: 'roti.jpg', price: '65.00', description: 'food description food description' },
                { name: 'Roti', img: 'roti.jpg', price: '100.00', description: 'food description food description' },
                { name: 'Roti', img: 'roti.jpg', price: '120.00', description: 'food description food description' },
                { name: 'Roti', img: 'roti.jpg', price: '70.00', description: 'food description food description' },
            ],

            categories: ['Rice','Koththu','Drinks'],

            // -----------Validation rules-----------
            qtyRules: [v => !!v || 'Quantity required', v => /^\d+$/.test(v) || 'Must be a number'],


        }
    },

    methods: {

        addQty() {
            this.quantity++
        },

        substractQty() {
            if (this.quantity > 0) {
                this.quantity--
            }
        },

        deleteItem(index) {
            var editedIndex = this.selectedItems.indexOf(index)
            this.selectedItems.splice(editedIndex, 1);

            var price = index.price
            this.total -= price

            var i = 1;
            this.selectedItems.forEach(Element => {
                Element.no = i
                i++
            })
        },

        addItems() {
            var price = this.selectedFood.price * this.quantity
            var no = this.selectedItems.length + 1
            this.selectedItems.push({
                price: price,
                name: this.selectedFood.name,
                quantity: this.quantity,
                no: no
            })
            this.total += price

            var i = 1;
            this.selectedItems.forEach(Element => {
                Element.no = i
                i++
            })
        }
    }

}
</script>

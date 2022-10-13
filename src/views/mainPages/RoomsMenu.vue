<template>
    <div>

        <v-container>
            <h1 class="title font-weight-black grey--text mt-3">Rooms Menu</h1>
            <v-row>
                <v-col lg="8" md="8" sm="8" cols="12" max-width="600">
                    <v-row>
                        <v-col lg="3" md="4" sm="6" cols="12" v-for="cardlist in cardlist" :key="cardlist.name">
                            <v-hover close-delay="100" v-slot="{hover}">
                                <v-card :elevation="hover? 7:0" flat class="'on-hover': hover lighten-2">

                                    <v-card-text class=" mb-5" style="justify-content:center">
                                        <div class="subtitle-1" v-if="(cardlist.name).length<15">{{ cardlist.name }}
                                        </div>
                                        <div class="subtitle-1" v-else>{{ (cardlist.name).substring(0,14)+".. " }}</div>
                                        <div class="subtitle-2">Bed Type: <strong>{{ cardlist.bedType }}</strong></div>
                                        <div class="subtitle-2">Price: <strong>Rs.{{ cardlist.price }}.00</strong></div>
                                        <v-btn depressed color="primary" block small
                                            @click="roomDetailsDialog = true, selectedRoom = cardlist">
                                            view</v-btn>
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
                            <app-AddBooking class="pa-3" :selectedItems="selectedItems" :total="total" :show="selectedItems.length"></app-AddBooking>
                            <!-- <v-btn block color="primary" :disabled="selectedItems.length==0" depressed>Checkout</v-btn> -->
                        </v-row>

                    </v-card>
                </v-col>
            </v-row>


            <!----------------------------------- dialog box / food details ------------------------------------------>

            <v-dialog v-model="roomDetailsDialog" persistent max-width="500px">
                <v-card>
                    
                    <v-card-text class="title pt-5"><strong>{{selectedRoom.name}}</strong> <br>
                        <v-chip>Price Rs.{{selectedRoom.price}}</v-chip>
                    </v-card-text>
                    <v-card-text>
                        No: <strong>{{selectedRoom.id}} </strong><br>
                        Room Type: <strong>{{selectedRoom.type}}</strong> <br>
                        Bed: <strong>{{selectedRoom.bed}}</strong> <br>
                        Bed Type: <strong>{{selectedRoom.bedType}}</strong> <br>
                        {{selectedRoom.description}}
                    </v-card-text>

                    <v-divider></v-divider>
                    <legend>
                        <v-card-text class="grey--text">Add to bill</v-card-text>
                    </legend>
                    <v-card-text>
                        <v-row class="ml-3 mr-3">
                            <v-col cols="9" align-self="center">Select person count</v-col>
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
                        <v-btn class="mr-2" depressed color="primary" @click="roomDetailsDialog = false, quantity=0">Ok
                        </v-btn>
                    </v-card-actions>

                </v-card>
            </v-dialog>

            <!----------------------------------- dialog box ------------------------------------------>

        </v-container>
    </div>
</template>



<script>
import AddBooking from '../../components/bookings/AddBooking.vue'
export default {
    components: {
        'app-AddBooking': AddBooking,
    },
    data() {
        return {
            roomDetailsDialog: false,
            selectedRoom: [],
            quantity: 0,
            valid: true,
            selectedItems: [],
            total: 0,

            headers: [
                { text: 'ROOM', align: 'start', sortable: false, value: 'no' },
                { text: 'NAME', align: 'start', sortable: false, value: 'name' },
                { text: 'PERSONS', sortable: false, value: 'persons' },
                { text: 'PRICE', sortable: false, value: 'price' },
                { text: '', sortable: false, value: 'actions' },
            ],

            cardlist: [
                { id: 1, name: 'name', type: 'ac', bed: '2', bedType: 'single', price: 3000, description: 'room description' },
                { id: 42, name: 'name', type: 'non-ac', bed: '1', bedType: 'double', price: 1500, description: 'room description' },
                { id: 23, name: 'name', type: 'non-ac', bed: '2', bedType: 'single', price: 2000, description: 'room description' },
                { id: 12, name: 'name', type: 'ac', bed: '2', bedType: 'double', price: 5000, description: 'room description' }
            ],

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
        },

        addItems() {
            var price = this.selectedRoom.price
            this.selectedItems.push({
                price: price,
                name: this.selectedRoom.name,
                persons: this.quantity,
                no: this.selectedRoom.id
            })
            this.total += price
        }
    }

}
</script>

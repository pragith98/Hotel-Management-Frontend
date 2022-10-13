<template>
    <div>
        
        <v-container>
            <!-- <h1 class="title font-weight-black grey--text">CLASSES</h1> -->
            <v-row class="mt-10">
               
                    <v-col cols="12" >
                         <v-form ref="form" v-model="valid" lazy-validation>
                        <div :hidden="!resetAlert">
                            <v-card max-width="500"  style="margin: auto" rounded class="mb-2 px-3 py-3" flat>
                                <v-container class="text-center">
                                    <v-card-title>
                                        <v-row justify="center">
                                            <v-icon size="100" color="green">mdi-check-circle-outline</v-icon>
                                        </v-row>
                                    </v-card-title>
                                    <span style="color:green" class="text-h6 text-center">Your password was reset successfully. Please check your email inbox</span>
                                </v-container>
                            </v-card>
                            <div max-width="500" style="margin: auto" rounded class="mb-2 px-3 py-3 text-center" >
                                
                                    <v-btn color="success" depressed large to="/Login">Login</v-btn>
                                
                            </div>
                            
                            
                        </div>
                        

                        <div :hidden="resetAlert">
                            <v-card max-width="500" flat style="margin: auto">
                                <v-progress-linear :active="loading" :indeterminate="loading" absolute color="blue accent-4"></v-progress-linear>
                                <v-card-title class="heading-1 blue-grey lighten-4  blue-grey--text text--darken-2">Forgot Password</v-card-title>
                                
                                <v-col cols="12" >
                                    <v-row dense style="padding:12px">
                                        <v-col cols="12" md="12" sm="12" >
                                            <v-text-field :rules="emailRules"  label="Email" prepend-inner-icon="mdi-email" icon required v-model="userEmail"></v-text-field>
                                        </v-col>
                                    </v-row>

                                    <v-card-actions>
                                        <v-row>
                                            <v-col cols="12" md="12" sm="12">
                                                <!-- <v-btn :disabled="!valid || !userEmail" x-large block depressed color="primary" @click="loading=true, resetPassword()">Submit</v-btn> -->
                                                <v-btn disabled x-large block depressed color="primary" @click="loading=true, resetPassword()">Submit</v-btn>
                                            </v-col>
                                            
                                        </v-row>
                                        
                                        
                                    </v-card-actions>
                                </v-col>

                                
                            </v-card>
                        </div>
                        
                        
                      </v-form>  
                    </v-col>
                
            </v-row>

        </v-container>
    </div>
</template>



<script>
    import { loadScript } from "vue-plugin-load-script";
    export default{

        data(){
            return{
                resetAlert:false,
                valid:true,

                userEmail:'',

                loading:false,





            // -----------Validation rules-----------
                emailRules: [v=> !!v || 'email is required', v=> /.+@.+\..+/.test(v) || 'email must be valid'], 
            }
                
        },
            
        watch:{
            loading(val){
                if(!val) return
                setTimeout(()=>(this.loading=false),3000)
                setTimeout(()=>(this.resetAlert=true),3000)
                
            }
        },

        methods:{
            resetPassword(){
                if(this.$refs.form.validate()){
                    this.sendPassword(this.userEmail,this.genPassword());
                    this.passwordResetSuccessAlert=true
                }
            },

            genPassword() {
                var chars = "0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()ABCDEFGHIJKLMNOPQRSTUVWXYZ";
                var passwordLength = 12;
                var password = ""; 
                for (var i = 0; i <= passwordLength; i++) {
                    var randomNumber = Math.floor(Math.random() * chars.length);
                    password += chars.substring(randomNumber, randomNumber +1);
                }
                return password
            },

            sendPassword(emailAddress,password){
                loadScript("https://smtpjs.com/v3/smtp.js")
                .then(() => {
                    window.Email && window.Email.send({
                        Host : "smtp.gmail.com",
                        Username : this.$emailAddress,
                        Password : this.$emailPassword,
                        To : emailAddress,
                        From : this.$emailAddress,
                        Subject : "Password Reset",
                        Body : `Hello,<br>You got a new message from <b>ICT Academy</b>.<br><br>Your account password reset successfully. Please use the given password to log into the system. <br><br><b>User name:</b> ${emailAddress}<br><b>Password:</b> ${password}<br><br><i>Please change the password as soon as you log in to the system.</i><br><br>Best wishes,<br>ICT Academy - Hakmana<br>${this.$tpNo}`
                    }).then(
                        message => console.log(message)
                    );
                }).catch(() => {
                    // Failed to fetch script
                });
            },
        }
        
    }
</script>

<template>
    <div>
        <!-- <v-img src="../assets/background.svg" aspect-ratio="1.7" style="height:100vh;"> -->
            <div style="position: relative;" >
            
                <!-- <v-img  src="../assets/login_banner.jpg" aspect-ratio="1.7" height="400">
                    <v-row class="mt-15">
                        <v-col class="text-center">
                            <div class="display-2 font-weight-black white--text" >WELCOME TO THE ICT ACADEMY</div>
                            <div class="overline white--text" >Student Management and Office Automation System</div>
                        </v-col>
                    </v-row>

                </v-img> -->
        
                <div style="position: absolute;top:188px;left: 0;right: 0;">
                    <v-container>

                        <v-row >
                            <v-col cols="12" >
                                <v-form ref="form" v-model="valid" lazy-validation>
                                    

                                    <v-card max-width="500"  style="margin: auto">
                                        <v-card-title class="heading-1 blue-grey lighten-4  blue-grey--text text--darken-2">Login</v-card-title>
                                    
                                        <v-col cols="12" >
                                            <v-row dense style="padding:12px">
                                                <v-col cols="12" md="12" sm="12" >
                                                    <v-text-field v-model="userName" :rules="userNameRules"  label="Username" prepend-inner-icon="mdi-account" icon required></v-text-field>
                                                </v-col>
                                                <v-col cols="12" md="12" sm="12" >
                                                    <v-text-field v-model="password" :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'" :rules="passwordRules" :type="show ? 'text' : 'password'" name="input-10-2" hint="At least 8 characters" label="Password" @click:append="show = !show" prepend-inner-icon="mdi-lock" required></v-text-field>
                                                </v-col>
                                            </v-row>

                                            <v-card-actions>
                                                <v-row>
                                                    <v-col cols="12" md="12" sm="12">
                                                        <v-btn :loading="loading" :disabled="!valid || !userName || !password" x-large block depressed color="primary" @click="login()">Login</v-btn>
                                                    </v-col>
                                                    <v-col cols="12" md="12" sm="12">
                                                        <v-btn disabled text block depressed color="primary" to="/ForgotPassword">Forgot Password?</v-btn><br>
                                                    </v-col>
                                                </v-row>
                                            </v-card-actions>
                                        </v-col>
                                        
                                    </v-card>
                                    
                                </v-form>
                                
                            </v-col>
                        </v-row>
                        
                    </v-container>

                    <v-card max-width="500" style="margin: auto;top: 60px;" class="mb-4" color="error" dark flat>
                        <v-snackbar elevation="0" max-width="500" width="500" absolute class="text-center" timeout="-1" v-model="unsuccessAlert" color="red"  ><v-icon left>mdi-alert-outline</v-icon> Username or Password is incorrect!</v-snackbar>
                    </v-card>
                </div>

            </div>

            <!-- <div style="position: fixed;bottom:10px;left: 0;right: 0;">
                <v-footer padless color="#ECEFF1">
                    <v-col class="text-center grey--text" cols="12">© ICT Academy - Hakmana, Sri Lanka</v-col>
                </v-footer>
            </div> -->
            

        <!-- </v-img> -->
    </div>
    
    
</template>



<script>



    export default{

        data(){
            return{
                show:false,
                valid:true,
                loading:false,
                userName:'',
                password:'',
                loged:"",

                token:'',
                user:[],

                userNameRules: [v=> !!v || 'Username is required'],
                passwordRules: [v=> !!v || 'Password is required', v=> (v && v.length >8)|| 'Password must be greater than 8'],
                
                unsuccessAlert:false
            }
                
        },
            
        created(){
            this.loginStatus=true
            
            this.token="tokenString"
            this.saveUserLocalStorage()
        },

        methods:{

            login(){
                if(this.$refs.form.validate()){
                    this.loading=true
                    this.axios.post(this.$apiUrl+"/api/v1.0/UserManagement/users/login",{
                        username:this.userName,
                        password:this.password
                    })
                    .then(Response=>{
                        if(Response.data.success == true){
                            this.token=Response.data._token
                            this.user=Response.data.user
                            

                            this.saveUserLocalStorage()

                            this.loading=false
                            this.Reset();
                            this.unsuccessAlert=false

                            
                            window.location.replace("/")
                        }else{
                            this.loading=false
                        }
                    })
                    .catch(error => {
                        this.unsuccessAlert=true
                        this.loading=false
                        console.log(error.data)
                    });
                }
            },

            saveUserLocalStorage(){
                const jsonObj = JSON.stringify(this.user)
                localStorage.setItem('user', jsonObj)
                localStorage.setItem('userToken', this.token)
                
                localStorage.setItem('loginStatus', this.loginStatus)

            },

            Reset() {
                this.$refs.form.reset()
            },
        }
        
    }
</script>

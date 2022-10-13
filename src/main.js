import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
//import axios from 'axios'


require('./assets/custom-globle.css');



Vue.prototype.$apiUrl="http://127.0.0.1:8090"  //////////////change this address when change the backend server

Vue.prototype.$emailAddress="lakshanj1ace@gmail.com"  //////////////system email
Vue.prototype.$emailPassword="nymefuphawvotnst"  //////////////system email password
Vue.prototype.$tpNo="076 9198533"  //////////////system TP no.

//axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('userToken') ///////user token into header
 //axios.defaults.headers.common['Content-type'] = 'application/json'

// var logedUser = JSON.parse(localStorage.getItem('user'))
// if(logedUser){
//   axios.defaults.headers.common['employeeID']= JSON.parse(localStorage.getItem('user')).employee.employeeID
//   axios.defaults.headers.common['employeeName']= JSON.parse(localStorage.getItem('user')).employee.name
//   axios.defaults.headers.common['branchID']= JSON.parse(localStorage.getItem('user')).employee.branch.branchID
//   axios.defaults.headers.common['branchName']= JSON.parse(localStorage.getItem('user')).employee.branch.branchName

// }



Vue.config.productionTip = false

new Vue({

  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')


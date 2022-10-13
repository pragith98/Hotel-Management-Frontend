import Vue from 'vue'
import VueRouter from 'vue-router'

import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios)


import FoodsMenu from '../views/mainPages/FoodsMenu.vue'
import Foods from '../views/mainPages/Foods.vue'
import FoodOrders from '../views/mainPages/FoodOrders.vue'
import Employees from '../views/mainPages/Employees.vue'
import Rooms from '../views/mainPages/Rooms.vue'
import Guests from '../views/mainPages/Guests.vue'
import Booking from '../views/mainPages/Booking.vue'
import RoomsMenu from '../views/mainPages/RoomsMenu.vue'
import Users from '../views/mainPages/Users.vue'

import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import ForgotPassword from '../views/ForgotPassword.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/FoodsMenu', name: 'FoodsMenu', component: FoodsMenu ,meta:{ requiresAuth:true }},
  { path: '/Foods', name: 'Foods', component: Foods ,meta:{ requiresAuth:true }},
  { path: '/FoodOrders', name: 'FoodOrders', component: FoodOrders ,meta:{ requiresAuth:true }},
  { path: '/Employees', name: 'Employees', component: Employees ,meta:{ requiresAuth:true }},
  { path: '/Rooms', name: 'Rooms', component: Rooms ,meta:{ requiresAuth:true }},
  { path: '/Guests', name: 'Guests', component: Guests ,meta:{ requiresAuth:true }},
  { path: '/Booking', name: 'Booking', component: Booking ,meta:{ requiresAuth:true }},
  { path: '/RoomsMenu', name: 'RoomsMenu', component: RoomsMenu ,meta:{ requiresAuth:true }},
  { path:'/Users', name:'Users', component:Users ,meta:{ requiresAuth:true }},
  
  { path: '/', name: 'Home', component: Home ,meta:{ requiresAuth:true }},
  
  { path:'/Login', name:'Login', component:Login  ,meta:{ disableIfLoggedIn:true }},
  { path:'/ForgotPassword', name:'ForgotPassword', component:ForgotPassword},
  // { path:'/Users/SystemUsers', name:'SystemUsers', component:()=> import('../components/SystemUsers.vue') ,meta:{ requiresAuth:true }},

  { path: '*', name: 'WildCard', component: Home ,meta:{ requiresAuth:true } }
  
]




const router = new VueRouter({
  routes,
  mode:'history'
})



router.beforeEach((to,from,next) =>{
  const token=localStorage.getItem('userToken');
  if(to.meta.requiresAuth){
    if(token){
      next();
    }else{
      next('/Login');
    }
  }else{
    next();
  }

  if(to.meta.disableIfLoggedIn){
    if(token){
      next('/');
    }else{
      next('/Login');
    }
  }else{
    next();
  }
})




export default router








import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import HomeView from '../views/HomeView.vue'
import NotFound from '../views/NotFound.vue'
import axios from 'axios'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: LoginView,
      meta: { requiresAuth: false }
    },
    {
      path: '/home',
      name: 'home',
      component: HomeView,
      meta: { requiresAuth: true }
    },
    {
      path: '/:catchAll(.*)', // 捕獲所有未匹配的路徑
      name: 'not-found',
      component: NotFound
    }
  ]
})

// 獲取 Cookie 中的 authToken
router.beforeEach(async (to, from, next) => {
let isloginauth = false;
  try {
    const response = await axios.get('http://localhost:3000/api/check-auth', {
      withCredentials: true
    });
    isloginauth = response.data.message;
  } catch (error){
    console.log("error",error);
  }

  if (to.meta.requiresAuth && !isloginauth) {
    next({ name: 'login' }); 
  } else if(!to.meta.requiresAuth && isloginauth) {
    next({ name: 'home' }); 
  }else{
    next(); 
  }

});

export default router

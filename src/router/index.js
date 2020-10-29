import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
export const constantRoutes = [
  {
    path: '/',
    // 重定向路径
    redirect: '/about',
  },
  {
    path:'/about',
    name:'about',
    component:() => import('../views/About.vue')
  },
  {
    path:'/orderGantt',
    name:'orderGantt',
    component:() => import('../views/OrderGantt.vue')
  },
  {
    path:'/resourceGantt',
    name:'resourceGantt',
    component:() => import('../views/ResourceGantt.vue')
  },
  {
    path:'/resourceLoader',
    name:'resourceLoader',
    component:() => import('../views/ResourceLoader.vue')
  },
  {
    path:'/schedule',
    name:'schedule',
    component:() => import('../views/Schedule.vue')
  }
]


const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

// const routerPush = Router.prototype.push
// VueRouter.prototype.push = function push(location) {
//   return routerPush.call(this, location).catch(error => error)
// }

const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}
export default router

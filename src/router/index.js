import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login.vue'
import Home from '@/components/Home.vue'
import Welcome from '@/components/Welcome.vue'
import Users from '@/components/user/Users.vue'
import editorUser from '@/components/user/editorUser.vue'
import Rights from '@/components/power/Rights.vue'
import Roles from '@/components/power/Roles.vue'
import addReward from '@/components/reward/addReward.vue'
import searchReward from '@/components/reward/searchReward.vue'
import addSalary from '@/components/salary/addSalary.vue'
import searchSalary from '@/components/salary/searchSalary.vue'
import userList from '@/components/user/userList.vue'


Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/home',
      component: Home,
      redirect: '/welcome',
      children: [
        { path: '/welcome', component: Welcome },
        { path: '/Users', component: Users },
        { path: '/userList', component: userList },
        { path: '/editorUser', component: editorUser },
        { path: '/rights', component: Rights },
        { path: '/Roles', component: Roles },
        { path: '/addReward', component: addReward },
        { path: '/searchReward', component: searchReward },
        { path: '/addSalary', component: addSalary },
        { path: '/searchSalary', component: searchSalary },
      ]
    },

  ]
})
// 如果用户没有登录，但直接访问URL到特定页面，需要重新弄导航到登录页

// 挂载路由导航守卫
// router.beforeEach((to, from, next) => {
  // to 将要访问的路径
  // from 代表从哪个路径跳转而来
  // next  是一个函数，表示方行
  //    next()  方行  next('/login')    强制跳转
  // if (to.path === '/login') {
  //   return next()
  // }
  // 获取token
  // const tokenStr = window.sessionStorage.getItem('token');
  // if (!tokenStr) {
  //   return next('/login')
  // } else {
  //   next()
  // }
// })

export default router

// 解决保存 NavigationDuplicated {_name: "NavigationDuplicated", name: "NavigationDuplicated", message: "Navigat
const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
};
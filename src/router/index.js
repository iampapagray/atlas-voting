import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '@/components/Dashboard'
import CastVote from '@/components/CastVote'
import CastState from '@/components/CastState'
import Login from '@/components/Login'

Vue.use(Router)



let router = new Router({
  mode: "history",
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login,
      meta: { 
          guest: true
      }
    },
    {
      path: '/vote',
      name: 'cast-vote',
      component: CastVote,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/vote/done',
      name: 'cast-state',
      component: CastState,
      meta: {
        guest: true
      }
    },
    {
      path: '/ndzi',
      name: 'Dashboard',
      component: Dashboard,
      meta: {
        requiresAuth: true,
        is_admin : true
      }
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})

router.beforeEach((to, from, next) => {
    if(to.matched.some(record => record.meta.requiresAuth)) {
        if (localStorage.getItem('jwt') == null) {
            next({
                path: '/',
                params: { nextUrl: to.fullPath }
            })
        } else {
            let user = JSON.parse(localStorage.getItem('user'))
            next()
        }
    } else if(to.matched.some(record => record.meta.guest)) {
        if(localStorage.getItem('jwt') == null){
            next()
        }
        else{
            next({ name: 'cast-vote'})
        }
    }else {
        next() 
    }
})

export default router

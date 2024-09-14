import { createRouter, createWebHistory  } from "vue-router";
import store from "../store/Store";
// import Cookies from 'vue-cookies'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: () => import('../views/homePage.vue')
    },

    //auth
    {
        path: '/login',
        name: 'Login',
        component: () => import('../components/auth/loginPage.vue')
    },
    {
        path: '/signup',
        name: 'Signup',
        component: () => import('../components/auth/signupCandidate.vue')
    },
    {
        path: '/signupComapny',
        name: 'SignupCompany',
        component: () => import('../components/auth/signupCompany.vue')
    },

    {
        path: '/forgotpassword',
        name: 'ForgotPassword',
        component: () => import('../components/auth/forgotPassword.vue')
    },
    {
        path: '/resetPassword/:resetCode',
        name: 'ResetPassword',
        component: () => import('../components/auth/resetPassword.vue')
    },

    {
        path: '/jobs/application',
        name: 'JobApplication',
        component: () => import('../components/application/jobApplication.vue')
    },
    {
        path: '/setting',
        name: 'SettingProfile',
        component: () => import('../components/user/settingProfile.vue')
    },
    {
        path: '/jobs/application/review',
        name: 'ReviewPage',
        component: () => import('../components/application/reviewPage.vue')
    },

    {
        path: '/user/:id',
        name: 'UserProfile',
        component: () => import('../views/userProfile.vue')
    },

    {
        path: '/contact',
        name: 'ContactPage',
        component: () => import('../views/ContactPage.vue')
    },
    {
        path: '/dashboard/jobapplied',
        name: 'JobApplied',
        component: () => import('../components/job/jobApplied.vue')
    },
    {
        path: '/notification-center',
        name: 'NotificationCenter',
        component: () => import('../components/notificationCenter.vue')
    },
    {
        path: '/dashboard/notification',
        name: 'NotificationPage',
        component: () => import('../components/notificationPage.vue')
    },
    {
        path: '/dashboard/savedjobs',
        name: 'SavedJobs',
        component: () => import('../components/job/savedJob.vue')
    },
    {
        path: '/application/overview',
        name: 'OverView',
        component: () => import('../components/application/overView.vue')
    },

    {
        path: '/vuex',
        
        component: () => import('../components/vuexPage.vue')
    },
    {
        path: '/pdf/:pdfName',
        
        component: () => import('../components/pdfViewer.vue')
    },
    {
        path: '/doc/:docName',
        
        component: () => import('../components/docxViewer.vue')
    },

    // is logged in
    {
        path: '/dashboard',
        name: 'MainDashboard',
        component: () => import('../views/mainDashboard.vue'),
    },
    {
        path: '/users',
        name: 'UserCrud',
        component: () => import('../components/admin/userCrud.vue'),
    },
    {
        path: '/skills',
        name: 'SkillCrud',
        component: () => import('../components/skill/skillCrud.vue'),
    },
    {
        path: '/categories',
        name: 'CategoryCrud',
        component: () => import('../components/category/categoryCrud.vue'),
    },
    {
        path: '/jobs',
        name: 'JobCrud',
        component: () => import('../components/job/jobCrud.vue'),
    },
    {
        path: '/about',
        name: 'AboutPage',
        component: () => import('../views/aboutPage.vue'),
    },
    {
        path: '/job/:id',
        name: 'JobDetail',
        component: () => import('../components/job/jobDetail.vue'),
    },
    {
        path: '/category/:id',
        name: 'CategoryDetail',
        component: () => import('../components/category/categoryDetail.vue'),
    },
    {
        path: '/findcompany',
        name: 'FindCompanyPage',
        component: () => import('../views/findCompanyPage.vue'),
    },
    {
        path: '/findJob',
        name: 'FindJobPage',
        component: () => import('../views/findJobPage.vue'),
    },
    {
        path: '/category',
        redirect: '/categories'  // Redirect /category to /categories
      },

    //no access to this route
    {
        path: '/not_authorized',
        name: 'NotAuthorized',
        component: () => import('../components/notAuthorized.vue'),
    },

    //404   
    {
        path: '/:pathName(.*)',
        name: 'NotFound',
        component: () => import('../components/notFound.vue')
    },
    {
        path: '/terms_and_conditions',
        name: 'terms and conditions',
        component: () => import('../views/termAndCondition.vue')
    },
    { path: '/blocked',
      name: 'blocked',
      component: () => import('../components/blockedPage.vue')

     },
     { path: '/pending',
        name: 'pending',
        component: () => import('../components/PendingPage.vue')
  
       },
]; 
function Router() {
    const router = new createRouter({
        history: createWebHistory(),
        routes,
    });
    return router;
}

const router = Router();
router.beforeEach((to, from,next) => {
    const user = store.state.userData; // Assuming user data is stored in Vuex
    
    if (user && user.accountStatus === 'blocked') {
       if (to.name !== 'blocked') {
         next({ name: 'blocked' });
       } else {
         next(); // If already on the blocked page, continue
       }
    } else if (user && user.accountStatus === 'pending') {
        if (to.name !== 'pending') {
          next({ name: 'pending' });
        } else {
          next(); // If already on the blocked page, continue
        }
     } else {
      next(); // User is not blocked, allow normal navigation
    }
  });

export default router;

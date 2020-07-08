import { Home,NotFound,UserProfile,MyDashboardActivity } from 'containers';
import { AUTH_ONLY } from 'router/types';
import {Login,Register} from 'login'

export default () => [
    {
        path: '/',
        exact: true,
        component: Home,
        loading: 'Custom loading for home page...',
        error: 'Custom error for home page',
        meta: {
            [AUTH_ONLY]: false,
        },
    },
    {
        path: '/hello/:id',
        exact: true,
        component: Home,
        meta: {
            [AUTH_ONLY]: true,
        },
    },
    {
        path: '/goodbye',
        exact: true,
        component: Home,
    },
    {
        path: '/login',
        exact: true,
        component: Login,
    },

    {
        path: '/register',
        exact: true,
        component: Register,
    },


    {
        path: '/userProfile',
        exact: true,
        component: UserProfile,
        meta: {
            [AUTH_ONLY]: true,
        },
    },

    {
        path: '/myDashboardActivity',
        exact: true,
        component: MyDashboardActivity,
        meta: {
            [AUTH_ONLY]: true,
        },
    },

    {
        path: '*',
        component: NotFound,
        ignoreGlobal: true,
    },
];
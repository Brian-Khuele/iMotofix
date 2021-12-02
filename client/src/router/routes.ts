import { RouteConfig } from 'vue-router';

const routes: RouteConfig[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '/',
        component: () => import('pages/Index.vue'),
        children: [
          {
            path: '/',
            component: () => import('components/Customers/ViewClients.vue')
          },
          {
            path: 'registerClient',
            component: () => import('components/Customers/NewClient.vue'),
            props: { mode: 'NEW' }
          },
          {
            path: 'updateClient',
            component: () => import('components/Customers/UpdateClient.vue'),
            props: { mode: 'UPDATE' }
          },
          {
            path: 'Invoice',
            component: () => import('components/Invoice/Invoice.vue')
          },
          {
            path: 'Comms',
            component: () => import('components/Comms/Comms.vue')
          },
          {
            path: 'Bookings',
            component: () => import('components/Bookings/Bookings.vue')
          }
        ]
      }
    ]
  }
];

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  });
}

export default routes;

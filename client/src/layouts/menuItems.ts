export const menuItems = [
  {
    title: 'Clients',
    caption: 'view & manage client info',
    icon: 'supervisor_account',
    to: '/',
    subItems: [
      {
        title: 'New client',
        caption: 'Add new client',
        icon: 'add',
        to: '/registerClient'
      },
      {
        title: 'Update client',
        caption: 'Update existing client info',
        icon: 'edit',
        to: '/UpdateClient'
      }
    ]
  },
  {
    title: 'Invoice',
    caption: 'Generate invoices',
    icon: 'receipt',
    to: '/Invoice'
    // subItems: [],
  },
  {
    title: 'Communication',
    caption: 'Send client comms',
    icon: 'speaker',
    to: '/Comms'
    // subItems: [],
  },
  {
    title: 'Service bookings',
    caption: 'Manage online bookings',
    icon: 'book',
    to: '/Bookings'
    // subItems: [],
  }
];

import { BankCardPage } from '@pages/BankCardPage/BankCardPage';
import { ContactsPage } from '@pages/ContactsPage/ContactsPage';
import { HomePage } from '@pages/HomePage/HomePage';
import { TimelinePage } from '@pages/TimelinePage/TimelinePage';

export const ROUTES = [
  {
    component: HomePage,
    link: '/',
  },
  {
    component: TimelinePage,
    link: '/timeline',
  },
  {
    component: BankCardPage,
    link: '/bank-card',
  },
  {
    component: ContactsPage,
    link: '/contacts',
  },
];

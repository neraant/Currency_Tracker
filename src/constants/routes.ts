import { BankCardPage } from '@pages/BankCardPage';
import { ContactsPage } from '@pages/ContactsPage';
import { HomePage } from '@pages/HomePage';
import { NotFoundPage } from '@pages/NotFoundPage';
import { TimelinePage } from '@pages/TimelinePage';

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
  {
    component: NotFoundPage,
    link: '*',
  },
];

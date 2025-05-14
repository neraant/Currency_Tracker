import { HomePage } from '@pages/HomePage/HomePage';
import { TimelinePage } from '@pages/TimelinePage/TimelinePage';
import { BankCardPage } from '@pages/BankCardPage/BankCardPage';
import { ContactsPage } from '@pages/ContactsPage/ContactsPage';

export const Routes = [
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

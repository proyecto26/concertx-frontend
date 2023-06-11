import { add } from 'date-fns';

import createForeignCookie from './factory';

export const firstVisitCookie = createForeignCookie('INFV', {
  expires: add(new Date(), {
    years: 2,
  }),
});
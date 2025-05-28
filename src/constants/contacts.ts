import { contactInputs, FieldKey } from '@typings/contacts';

export const CONTACT_FIELDS: FieldKey[] = [
  contactInputs.NAME,
  contactInputs.EMAIL,
  contactInputs.MESSAGE,
];

export const CONTACT_INFO = [
  {
    title: 'Store hours',
    text: ['507-495 Flatbush Ave', 'New York, Brooklyn', 'NY 1125'],
  },
  {
    title: 'Contacts',
    text: ['mountain@point.com', '415 500 7665'],
  },
];

export type FieldKey = `${contactInputs}`;

export enum contactInputs {
  NAME = 'name',
  EMAIL = 'email',
  MESSAGE = 'message',
}

export interface RegisterInterface {
  name: string;
  email: string;
  message: string;
}

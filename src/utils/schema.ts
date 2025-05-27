import * as yup from 'yup';

const reqExpEmail = new RegExp(/^\S+@\S+\.\S+$/);

export const schema = yup.object().shape({
  name: yup
    .string()
    .trim()
    .required('Required field')
    .min(2, 'Name should has minimal length of 2'),
  email: yup.string().trim().required('Required field').matches(reqExpEmail, 'Invalid format'),
  message: yup
    .string()
    .trim()
    .required('Required field')
    .min(10, 'Message should has minimal length of 10'),
});

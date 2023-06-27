import * as yup from 'yup';

export const bankAccountValidationSchema = yup.object().shape({
  balance: yup.number().integer().required(),
  user_id: yup.string().nullable().required(),
});

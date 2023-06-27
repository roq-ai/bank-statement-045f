import * as yup from 'yup';

export const atmValidationSchema = yup.object().shape({
  location: yup.string().required(),
  organization_id: yup.string().nullable().required(),
});

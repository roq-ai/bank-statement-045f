import * as yup from 'yup';

export const branchValidationSchema = yup.object().shape({
  name: yup.string().required(),
  location: yup.string().required(),
  organization_id: yup.string().nullable().required(),
});

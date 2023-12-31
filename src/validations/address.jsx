import * as Yup from "yup";

const addressSchema = Yup.object().shape({
  address: Yup.string().min(2).max(100).required(),
  firstName: Yup.string().required(),
  lastName: Yup.string().required(),
  nationalCode: Yup.string().required(),
  phoneNumber: Yup.string().required(),
  plaque: Yup.number().required(),
  postalCode: Yup.string().required(),
});

export default addressSchema
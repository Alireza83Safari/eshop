import * as Yup from "yup";

const registerSchema = Yup.object().shape({
  username: Yup.string().min(3).max(20).required(),
  password: Yup.string().min(3).max(20).required(),
  passwordConfirmation: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required(),
});

export default registerSchema;

import * as Yup from "yup";

const loginSchema = Yup.object().shape({
  username: Yup.string().min(3).max(20).required(),
  password: Yup.string().min(3).max(20).required(),
});

export default loginSchema;

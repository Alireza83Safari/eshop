import * as Yup from "yup";

const appPicSchema = Yup.object().shape({
  description: Yup.string().min(2).max(30).required(),
  title: Yup.string().min(2).max(20).required(),
  url: Yup.string().required(),
});

export default appPicSchema;

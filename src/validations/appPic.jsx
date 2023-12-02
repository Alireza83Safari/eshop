import * as Yup from "yup";

const appPicSchema = Yup.object().shape({
  description: Yup.string().max(50).required(),
  title: Yup.string().max(30).required(),
  url: Yup.string().required(),
});

export default appPicSchema;

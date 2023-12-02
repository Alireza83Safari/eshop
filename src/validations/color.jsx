import * as Yup from "yup";

const colorSchema = Yup.object().shape({
  colorHex: Yup.string().required(),
  name: Yup.string().max(15).required(),
  code: Yup.string().required(),
});

export default colorSchema;

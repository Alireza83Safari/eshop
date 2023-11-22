import * as Yup from "yup";

const productSchema = Yup.object().shape({
  name: Yup.string().min(2).max(16).required(),
  code: Yup.string().min(2).max(16).required(),
  brandId: Yup.string().required(),
  categoryId: Yup.string().required(),
  description: Yup.string().min(10).max(100).required(),
  shortDescription: Yup.string().min(8).max(100).required(),
});

export default productSchema;

import * as Yup from "yup";

const productItemSchema = Yup.object().shape({
  status: Yup.string().required(),
  price: Yup.number("price must be a number").min(1).required(),
  quantity: Yup.number("quantity must be a number").required(),
  isMainItem: Yup.boolean().required(),
  productId: Yup.string().required(),
  colorId: Yup.string().required(),
});

export default productItemSchema;

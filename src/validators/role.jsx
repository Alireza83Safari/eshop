import * as Yup from "yup";

const roleShema = Yup.object().shape({
  name: Yup.string().min(2).max(16).required(),
  code: Yup.string().min(2).max(16).required(),

});

export default roleShema;

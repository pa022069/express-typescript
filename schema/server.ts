import { checkSchema } from "express-validator";

const schema = checkSchema({
  username: {
    notEmpty: true,
  },
  email: {
    notEmpty: true,
  },
});

export default schema;

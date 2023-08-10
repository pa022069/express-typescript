import { checkSchema } from "express-validator";

const schema = checkSchema({
  username: {
    notEmpty: true,
  },
  password: {
    notEmpty: true,
  },
});

export default schema;

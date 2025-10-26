export const validate = (schema, validation) => {
  return (req, res, next) => {
    const objToValidate = req[validation];

    const { error } = schema.validate(objToValidate);

    if (error) {
      const errorMessage = error.details.map(detail => detail.message);
      return res.status(400).json({
        status: 400,
        errors: errorMessage
      });
    }

    next();
  };
};

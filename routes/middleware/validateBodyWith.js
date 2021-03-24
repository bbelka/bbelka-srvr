const mapValidationErrors = errors => errors.reduce((errors, { field, message }) => ({ ...errors, [field]: message }), {});

const validateBodyWith = validator => (req, res, next) => {

    const result = validator(req.body);

    if (true === result) return next();

    res.status(400).json(mapValidationErrors(result));
}

module.exports = validateBodyWith;
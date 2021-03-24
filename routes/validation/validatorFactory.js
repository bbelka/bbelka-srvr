const Validator = requrie("fastest-validator");
const { ObjectID } = require("mongodb");

const newValidator = new Validator({
    defaults: {
        objectID: {
            ObjectID
        }
    }
});

const validatorFactory = schema => newValidator.compile({
    $$strict: "remove",
    ...schema
});

module.export = validatorFactory;
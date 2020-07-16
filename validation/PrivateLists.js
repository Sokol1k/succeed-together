const Joi = require('@hapi/joi');

const createPrivateListValidation = (data) => {
    const schema = Joi.object({
        title: Joi.string().max(255).required(),
        index: Joi.number()
    });
    return schema.validate(data);
}

const updatePrivateListValidation = (data) => {
    const schema = Joi.object({
        title: Joi.string().max(255).required(),
        favourite: Joi.boolean(),
        index: Joi.number()
    });
    return schema.validate(data);
}

module.exports = {
    createPrivateListValidation,
    updatePrivateListValidation
};
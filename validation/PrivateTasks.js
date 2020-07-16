const Joi = require('@hapi/joi');

const createPrivateTaskValidation = (data) => {
    const schema = Joi.object({
        text: Joi.string().max(255).required(),
        date: Joi.date().allow(null),
        deadline: Joi.date().allow(null)
    });
    return schema.validate(data);
}

const updatePrivateTaskValidation = (data) => {
    const schema = Joi.object({
        text: Joi.string().max(255).required(),
        status: Joi.string(),
        favourite: Joi.boolean(),
        date: Joi.date().allow(null),
        deadline: Joi.date().allow(null)
    });
    return schema.validate(data);
}

module.exports = {
    createPrivateTaskValidation,
    updatePrivateTaskValidation
};
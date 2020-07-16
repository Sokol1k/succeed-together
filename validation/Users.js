//VALIDATION
const Joi = require('@hapi/joi');

//publication validation
const updateUserValidation = (data) => {
    const schema = Joi.object({
        name: Joi.string().min(3).max(255).required(),
        email: Joi.string().min(6).max(255).required().email()
    });
    // return Joi.validate(data, schema);
    return schema.validate(data);
}

const updateRoleUserValidation = (data) => {
    const schema = Joi.object({
        role: Joi.string().required()
    });
    // return Joi.validate(data, schema);
    return schema.validate(data);
}

module.exports = {
    updateUserValidation,
    updateRoleUserValidation
};
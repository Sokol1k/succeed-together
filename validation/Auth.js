//VALIDATION
const Joi = require('@hapi/joi');

//register validation
const registerValidation = (data) => {
    const schema = Joi.object({
        name: Joi.string().min(3).max(255).required(),
        email: Joi.string().required().email(),
        password: Joi.string().min(6).max(255).required(),
        confirm_password: Joi.any().valid(Joi.ref("password")).required()
    });
    // return Joi.validate(data, schema);
    return schema.validate(data);
}

const loginValidation = (data) => {
    const schema = Joi.object({
        email: Joi.string().required().email(),
        password: Joi.string().required()
    });
    // return Joi.validate(data, schema);
    return schema.validate(data);
}

module.exports = { registerValidation, loginValidation };
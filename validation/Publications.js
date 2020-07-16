//VALIDATION
const Joi = require('@hapi/joi');

//publication validation
const createPublicationValidation = (data) => {
    const schema = Joi.object({
        title: Joi.string().min(5).max(255).required(),
        description: Joi.string().min(10).max(1024).required()
    });
    // return Joi.validate(data, schema);
    return schema.validate(data);
}

const updatePublicationValidation = (data) => {
    const schema = Joi.object({
        title: Joi.string().min(5).max(255).required(),
        description: Joi.string().min(10).max(1024).required()
    });
    return schema.validate(data);
}

module.exports = { createPublicationValidation, updatePublicationValidation };
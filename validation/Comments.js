const Joi = require('@hapi/joi');

const commentValidation = (data) => {
    const schema = Joi.object({
        text: Joi.string().max(1024).required(),
    });
    return schema.validate(data);
}


module.exports = { commentValidation };
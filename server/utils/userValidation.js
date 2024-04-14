const Joi = require('joi')

const userValidation = (req, res, next) => {
    const schema = Joi.object({
        fullName: Joi.string().min(10).max(30).required(),
        email: Joi.string().email().required(),
        contact: Joi.number().min(10).max(10).required(),
        password: Joi.string().min(8).max(30).alphanum().required()
    });

    const { error, value } = schema.validate(req.body);

    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    next();
}

module.exports = {
    userValidation
}

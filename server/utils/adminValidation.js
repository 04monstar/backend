const Joi = require('joi');

const adminValidation = (req, res, next) => {
    const adminSchema = Joi.object({
        admin_id: Joi.string().alphanum().required(), 
        fullName: Joi.string().min(10).max(30).required(),
        email: Joi.string().email().required(),
        dealer_contact : joi.number().min(10).max(10).required(),
        password: Joi.string().min(8).max(30).alphanum().required()
    });
    const adminData = req.body;
    const { error } = adminSchema.validate(adminData);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    next();
};

module.exports = adminValidation;

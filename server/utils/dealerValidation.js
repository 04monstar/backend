const joi = require('joi')

const dealerValidation = (req,res,next) =>{
    const schema = joi.object({
        dealer_id : joi.string.alphanum().min(8).required(),
        dealer_name : joi.string().min(8).max(80).required(),
        dealer_location : joi.string().alphanum().required(),
        dealer_contact : joi.number().min(10).max(10).required(),
        dealer_email : joi.string().email().required(),
        dealer_password : joi.string().min(8).max(30).alphanum().required()
    });
    const value = schema.validate(req.body);
    if(value.error){
        res.send(value.error.details[0].message);
    }else{
        next();
    }
};
module.exports ={
    dealerValidation
}
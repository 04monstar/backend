const joi = require('joi')

    const loginvalidate = (req,res,next) => {
        const schema = joi.object({
            email:joi.string().email().required(),
            password:joi.string().min(6).max(10).required()
        });
        const value = schema.validate(req.body);
        if(value.error){
            res.send(value.error.details[0].message)
        }else{
            next();
        }
    }

    module.exports={
        loginvalidate
    }
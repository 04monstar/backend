const joi = require('joi');

const Auth = (req, res, next) => {
   
    if (!req.headers.authorization) {
        return res.status(403).json({
            message: 'You are not authorized to access this route'
        });
    }

    
    const token = req.headers.authorization.split(' ')[1];

    try {
       
        const schema = joi.string().required();
        const { error } = schema.validate(token);
        if (error) {
            throw new Error('Invalid token');
        }


        next();
    } catch (err) {
        console.error('Error validating token:', err.message);
        return res.status(401).json({
            message: 'Unauthorized'
        });
    }
};

module.exports = Auth;

const Joi = require('joi');

const emailRegex = /^\S+@\S+\.\S+$/; // Basic email format validation

const adminSchema = Joi.object({
  admin_id: Joi.string().required(),
  password: Joi.string().alphanum().min(8).required(), // Alphanumeric characters with minimum length of 8
  token: Joi.string().allow('').optional()
});

const userSchema = Joi.object({
  user_email: Joi.string().email().required(),
  user_id: Joi.string().required(),
  user_location: Joi.string().allow('').optional(),
  user_info: Joi.object().allow(null).optional(),
  password: Joi.string().alphanum().min(8).required(), 
  vehicle_info: Joi.array().items(Joi.string()).allow(null).optional(),
  token: Joi.string().allow('').optional()
});

const dealerSchema = Joi.object({
  dealership_email: Joi.string().email().required(),
  dealership_id: Joi.string().required(),
  dealership_name: Joi.string().required(),
  dealership_location: Joi.string().allow('').optional(),
  password: Joi.string().alphanum().min(8).required(), // Alphanumeric characters with minimum length of 8
  dealership_info: Joi.object().allow(null).optional(),
  cars: Joi.array().items(Joi.string()).allow(null).optional(),
  deals: Joi.array().items(Joi.string()).allow(null).optional(),
  sold_vehicles: Joi.array().items(Joi.string()).allow(null).optional(),
  token: Joi.string().allow('').optional()
});

const dealSchema = Joi.object({
  deal_id: Joi.string().required(),
  car_id: Joi.string().required(),
  deal_info: Joi.object().allow(null).optional()
});

const carSchema = Joi.object({
  car_id: Joi.string().required(),
  type: Joi.string().allow('').optional(),
  name: Joi.string().allow('').optional(),
  model: Joi.string().allow('').optional(),
  car_info: Joi.object().allow(null).optional()
});

const soldVehicleSchema = Joi.object({
  vehicle_id: Joi.string().required(),
  car_id: Joi.string().required(),
  vehicle_info: Joi.object().allow(null).optional()
});

module.exports = {
  adminSchema,
  userSchema,
  dealerSchema,
  dealSchema,
  carSchema,
  soldVehicleSchema
};

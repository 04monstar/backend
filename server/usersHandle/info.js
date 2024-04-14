const bcrypt = require('bcrypt');
const { userSchema, dealerSchema, adminSchema } = require('../Schema/schema');
const { getUserByEmail, connectToDatabase } = require('../db/database'); 
const jwt = require('jsonwebtoken');

module.exports = {
    registerUser: async (req, res) => {
        try {
            const { error, value } = userSchema.validate(req.body);
            if (error) {
                return res.status(400).json({ message: 'Validation error', error: error.details });
            }

            const hashedPassword = await bcrypt.hash(req.body.password, 10);
            const userData = {
                user_email: req.body.user_email,
                user_id: req.body.user_id,
                user_location: req.body.user_location,
                user_info: req.body.user_info,
                password: hashedPassword,
                vehicle_info: req.body.vehicle_info
            };

            await  connectToDatabase('users', userData); 
            return res.status(201).json({ message: 'User registered successfully', data: userData });
        } catch (err) {
            return res.status(500).json({ message: 'Internal server error', error: err });
        }
    },

    dealerUser: async (req, res) => {
        try {
            const { error, value } = dealerSchema.validate(req.body);
            if (error) {
                return res.status(400).json({ message: 'Validation error', error: error.details });
            }

            const hashedPassword = await bcrypt.hash(req.body.password, 10);
            const dealerData = {
                dealership_email: req.body.dealership_email,
                dealership_id: req.body.dealership_id,
                dealership_name: req.body.dealership_name,
                dealership_location: req.body.dealership_location,
                password: hashedPassword,
                dealership_info: req.body.dealership_info,
                cars: req.body.cars,
                deals: req.body.deals,
                sold_vehicles: req.body.sold_vehicles
            };

            await saveToDatabase('dealers', dealerData); // Save dealer data to the 'dealers' collection
            return res.status(201).json({ message: 'Dealer registered successfully', data: dealerData });
        } catch (err) {
            return res.status(500).json({ message: 'Internal server error', error: err });
        }
    },

    adminUser: async (req, res) => {
        try {
            const { error, value } = adminSchema.validate(req.body);
            if (error) {
                return res.status(400).json({ message: 'Validation error', error: error.details });
            }

            const hashedPassword = await bcrypt.hash(req.body.password, 10);
            const adminData = {
                admin_id: req.body.admin_id,
                password: hashedPassword,
                token: req.body.token
            };

            await saveToDatabase('admin', adminData);
            return res.status(201).json({ message: 'Admin registered successfully', data: adminData });
        } catch (err) {
            return res.status(500).json({ message: 'Internal server error', error: err });
        }
    },
    loginUser: async (req, res) => {
        try {
            const { email, password } = req.body;
            const user = await getUserByEmail(email, 'users'); // Assuming 'users' is the collection name for users

            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            const passwordMatch = await bcrypt.compare(password, user.password);

            if (!passwordMatch) {
                return res.status(401).json({ message: 'Invalid password' });
            }

            return res.status(200).json({ message: 'Login successful', user });
                     // Generate JWT token
     //   const token = jwt.sign({ userId: user._id }, "secret", { expiresIn: '1hr' });
       // return res.status(200).json({ message: 'Login successful', token });
        } catch (err) {
            return res.status(500).json({ message: 'Internal server error', error: err });
        }
    }

};

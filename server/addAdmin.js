require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./Models/userModel');
const bcrypt = require('bcrypt');

mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB');
        addAdminUser();
    })
    .catch(err => {
        console.log('Failed to connect to MongoDB', err);
    });

const addAdminUser = async () => {
    try {
        const existingAdmin = await User.findOne({ isAdmin: true });
        if (existingAdmin) {
            console.log('Admin user already exists!');
            mongoose.connection.close();
            return;
        }

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, saltRounds);

        const admin = new User({
            name: process.env.ADMIN_NAME,
            email: process.env.ADMIN_EMAIL,
            password: hashedPassword,
            isAdmin: true
        });

        await admin.save();
        console.log('Admin user added!');
        mongoose.connection.close();
    } catch (error) {
        console.error('Error adding admin user:', error);
        mongoose.connection.close();
    }
};

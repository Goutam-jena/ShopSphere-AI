



// services/DataInitializationService.js
const User = require('../models/User');
const bcryptjs = require('bcryptjs');
const UserRoles = require('../domain/UserRole'); // Import your roles enum

class DataInitializationService {
    async initializeAdminUser() {
        // Read credentials securely from the .env file
        const adminEmail = process.env.ADMIN_EMAIL;
        const adminPassword = process.env.ADMIN_PASSWORD;

        if (!adminEmail || !adminPassword) {
            console.log("Admin credentials not found in .env file. Skipping admin creation.");
            return;
        }
        
        try {
            const adminExists = await User.findOne({ email: adminEmail });

            if (!adminExists) {
                const hashedPassword = await bcryptjs.hash(adminPassword, 10);

                const adminUser = new User({
                    fullName: 'Admin',
                    email: adminEmail,
                    password: hashedPassword,
                    // Use the enum for consistency
                    role: UserRoles.ADMIN, 
                });

                await adminUser.save();
                console.log('Admin user created successfully!');
            } else {
                console.log('Admin user already exists.');
            }
        } catch (error) {
            console.error('Error during admin initialization:', error);
        }
    }
}

module.exports = new DataInitializationService();
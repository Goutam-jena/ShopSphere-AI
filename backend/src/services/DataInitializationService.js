const User = require('../models/User');
const bcrypt = require('bcrypt');
const UserRoles = require('../domain/UserRole');

class DataInitializationService {
    async initializeAdminUser() {
        const adminEmail = process.env.ADMIN_EMAIL;
        const adminPassword = process.env.ADMIN_PASSWORD;

        if (!adminEmail || !adminPassword) {
            console.log("Admin credentials not found in .env file. Skipping admin creation.");
            return;
        }

        try {
            const adminExists = await User.findOne({ email: adminEmail });
            if (!adminExists) {
                const hashedPassword = await bcrypt.hash(adminPassword, 10);
                const adminUser = new User({
                    fullName: 'Admin',
                    email: adminEmail,
                    password: hashedPassword,
                    role: UserRoles.ADMIN,
                });
                await adminUser.save();
                console.log('Admin user created successfully!');
            }
        } catch (error) {
            console.error('Error during admin initialization:', error);
        }
    }
}

module.exports = new DataInitializationService();
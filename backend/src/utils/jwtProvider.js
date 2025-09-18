const jwt = require('jsonwebtoken');
const SECERET_KEY = process.env.SECRET_KEY;

class JwtProvider {
    createJwt(payload) {
        return jwt.sign(payload, SECERET_KEY, { expiresIn: '24h' });
    }

    getEmailFromJwt(token) {
        try {
            const decoded = jwt.verify(token, SECERET_KEY);
            return decoded.email;
        } catch (error) {
            throw new Error('Invalid token');
        }
    }
}

module.exports = new JwtProvider(SECERET_KEY);
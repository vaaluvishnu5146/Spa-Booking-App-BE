const jwt = require('jsonwebtoken');

const SECRET_KEY = "SPA_APPLICATION_SECRET_B4";

function generateToken(data = {}, userId = "") {
    const token = jwt.sign(data, SECRET_KEY, {
        expiresIn: "1h",
        subject: String(userId)
    });
    return token;
}

module.exports = {
    generateToken,
    SECRET_KEY
};
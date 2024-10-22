var jwt = require('jsonwebtoken');
const { SECRET_KEY } = require("../jwt.util");
const BOOKINGS_PERMS = require('../Permissions/bookings.perms');


function bookingsCreationGuard(request, response, next) {
    // invalid token - synchronous
    try {
        if(request.headers['token']) {
            const token = jwt.verify(request.headers['token'], SECRET_KEY); // valid = true or not valid = err
            if (token && BOOKINGS_PERMS['CREATE_BOOKINGS'].PERMITTED_ROLES.includes(token.role.toUpperCase())) {
               next();
            } else {
                return response.status(401).json({
                    message: "Operation is not permitted"
                });
            }
        } else {
            return response.status(403).json({
                message: "Token is missing"
            });
        }
    } catch(err) {
        // err
        return response.status(401).json({
            error: err.message,
            message: "Token expired"
        });
    }
}

function bookingsDeletionGuard(request, response, next) {
    // invalid token - synchronous
    try {
        if(request.headers['token']) {
            const token = jwt.verify(request.headers['token'], SECRET_KEY); // valid = true or not valid = err
            if (token && BOOKINGS_PERMS['DELETE_BOOKINGS'].PERMITTED_ROLES.includes(token.role.toUpperCase())) {
                next();
            } else {
                return response.status(401).json({
                    message: "Operation is not permitted"
                });
            }
        } else {
            return response.status(403).json({
                message: "Token is missing"
            });
        }
    } catch(err) {
        // err
        return response.status(401).json({
            error: err.message,
            message: "Token expired"
        });
    }
}

module.exports = {
    bookingsCreationGuard,
    bookingsDeletionGuard
};
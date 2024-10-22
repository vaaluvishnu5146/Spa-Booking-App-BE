const mongoose = require("mongoose");

const BookingSchema = mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    staffId: {
        type: mongoose.Types.ObjectId,
        required: false
    },
    bookingStartTime: {
        type: String,
        required: true
    },
    bookingEndTime: {
        type: String,
        required: true
    },
    business: {
        type: String,
        required: true
    },
    services: {
        type: Array,
        required: true
    }
}, { timestamps: true });

const BookingModel = mongoose.model("bookings", BookingSchema);

module.exports = BookingModel;
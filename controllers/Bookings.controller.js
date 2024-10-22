const mongoose = require("mongoose");
const BookingModel = require("../model/Booking.model");
const BookingRouter = require("express").Router();
const { bookingsCreationGuard, bookingsDeletionGuard } = require("../middleware/bookings.middleware");

/**
 * CREATE A NEW BOOKING
 * METHOD = POST
 */
BookingRouter.post("/create", bookingsCreationGuard, async (request, response) => {
    const booking = new BookingModel(request.body);
    booking.save().then((result) => {
        if (result && result._id) {
            return response.status(201).json({
                message: "Booking created successfully"
            });
        } else {
            return response.status(500).json({
                message: "Something went wrong!"
            });
        }
    }).catch((error) => {
        return response.status(400).json({
            error: error.message,
            message: "Bad request!"
        });
    })
})

/**
 * GET ALL THE BOOKINGS
 * METHOD = GET
 */
BookingRouter.get("/", async (request, response) => {
})

/**
 * DELETE A THE BOOKING
 * METHOD = DELETE
 */
BookingRouter.delete("/delete/:bookingId", bookingsDeletionGuard, async (request, response) => {
    const { bookingId } = request.params;
    if(!bookingId) {
        return response.status(400).json({
            message: "Booking Id is missing in the request"
        });
    }

    try {
        const res = await BookingModel.findByIdAndDelete({ _id: bookingId });
        if(res) {
            return response.status(200).json({
                message: "Booking deleted",
                bookingId: res._id
            });
        } else {
            // Something went wrong
            return response.status(410).json({
                message: "Requested resource is not available"
            });
        }
    } catch (error) {
        return response.status(400).json({
            error: error.message,
            message: "Something went wrong"
        });
    }
});

module.exports = BookingRouter;
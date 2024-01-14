// models/booking.js
import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    room: {
      type: String,
    },
    roomid: {
      type: Number,
    },
    userId: {
      type: Number,
    },
    fromdate: {
      type: String,
    },
    todate: {
      type: String,
    },
    totalamount: {
      type: Number,
    },
    totaldays: {
      type: Number,
    },
    status: {
      type: String,
      default: "booked",
    },
  },
  { timestamps: true }
);

const booking = mongoose.model("booking", bookingSchema);

export default booking;

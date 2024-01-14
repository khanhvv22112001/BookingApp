import express from "express";
import {
  bookingRoom,
  getBooking,
  getAllBookings,
  deleteBooking,
  updateBooking,
} from "../controllers/booking.js";

const router = express.Router();

router.post("/bookroom", bookingRoom);
router.get("/booking/:bookingId", getBooking);
router.get("/bookings", getAllBookings);
router.delete("/booking/:bookingId", deleteBooking);
router.put("/booking/:bookingId", updateBooking);
export default router;

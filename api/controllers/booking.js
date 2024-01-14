import booking from "../models/Booking.js";

const bookingRoom = async (req, res) => {
  const { room, userid, fromdate, todate, totalamount, totaldays } = req.body;

  try {
    const newbooking = new booking({
      room: room.name,
      roomid: room._id,
      userid,
      fromdate,
      todate,
      totalamount,
      totaldays,
    });

    const savedBooking = await newbooking.save();
    res.status(201).json(savedBooking); // Assuming you want to send a response back
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" }); // Sending a generic error response
  }
};
const updateBooking = async (req, res) => {
  const { bookingId } = req.params;
  const updateData = req.body;

  try {
    const updatedBooking = await booking.findByIdAndUpdate(
      bookingId,
      updateData,
      { new: true }
    );

    if (!updatedBooking) {
      return res.status(404).json({ error: "Booking not found" });
    }

    res.status(200).json(updatedBooking);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const deleteBooking = async (req, res) => {
  const { bookingId } = req.params;

  try {
    const deletedBooking = await booking.findByIdAndDelete(bookingId);

    if (!deletedBooking) {
      return res.status(404).json({ error: "Booking not found" });
    }

    res.status(200).json({ message: "Booking deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const getAllBookings = async (req, res) => {
  try {
    const allBookings = await booking.find();
    res.status(200).json(allBookings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const getBooking = async (req, res) => {
  const { bookingId } = req.params;

  try {
    const foundBooking = await booking.findById(bookingId);

    if (!foundBooking) {
      return res.status(404).json({ error: "Booking not found" });
    }

    res.status(200).json(foundBooking);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
export {
  bookingRoom,
  getBooking,
  getAllBookings,
  deleteBooking,
  updateBooking,
};

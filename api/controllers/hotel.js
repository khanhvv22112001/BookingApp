import Hotel from "../models/Hotel.js";
import Room from "../models/Room.js";

export const createHotel = async (req, res, next) => {
  const newHotel = new Hotel(req.body);

  try {
    const savedHotel = await newHotel.save();
    res.status(200).json(savedHotel);
  } catch (err) {
    next(err);
  }
};
export const updateHotel = async (req, res, next) => {
  try {
    const updatedHotel = await Hotel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedHotel);
  } catch (err) {
    next(err);
  }
};
export const deleteHotel = async (req, res, next) => {
  try {
    await Hotel.findByIdAndDelete(req.params.id);
    res.status(200).json("Hotel has been deleted.");
  } catch (err) {
    next(err);
  }
};
export const getHotel = async (req, res, next) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    res.status(200).json(hotel);
  } catch (err) {
    next(err);
  }
};
// Import the Hotel model or adjust the import path

export const getHotels = async (req, res, next) => {
  const { min, max, ...others } = req.query;
  const limit = parseInt(req.query.limit, 10) || 0; // Parse the limit parameter to an integer

  try {
    // Use parseInt to ensure min and max are numbers, and provide default values if they are not provided
    const hotels = await Hotel.find({
      ...others,
      cheapestPrice: {
        $gt: parseInt(min, 10) || 1,
        $lt: parseInt(max, 10) || 999,
      },
    }).limit(limit);

    res.status(200).json(hotels);
  } catch (err) {
    next(err);
  }
};
// router.post(
//   "/:hotelId/bookings/payment-intent",
//   verifyToken,
//   async (req, res) => {
//     const { numberOfNights } = req.body;
//     const hotelId = req.params.hotelId;

//     const hotel = await Hotel.findById(hotelId);
//     if (!hotel) {
//       return res.status(400).json({ message: "Hotel not found" });
//     }

//     const totalCost = hotel.pricePerNight * numberOfNights;

//     const paymentIntent = await stripe.paymentIntents.create({
//       amount: totalCost * 100,
//       currency: "gbp",
//       metadata: {
//         hotelId,
//         userId: req.userId,
//       },
//     });

//     if (!paymentIntent.client_secret) {
//       return res.status(500).json({ message: "Error creating payment intent" });
//     }

//     const response = {
//       paymentIntentId: paymentIntent.id,
//       clientSecret: paymentIntent.client_secret.toString(),
//       totalCost,
//     };

//     res.send(response);
//   }
// );

// export const searchHotels = async (req, res, next) => {
//   const { min, name, max, searchTerm, ...others } = req.query;
//   try {
//     const hotels = await Hotel.find({
//       $or: [
//         { name: { $regex: new RegExp(searchTerm, "i") } }, // Case-insensitive search for hotel name
//         // Add more fields to search if needed
//       ],
//       ...others,
//       cheapestPrice: { $gt: min | 1, $lt: max || 999 },
//     }).limit(req.query.limit);
//     res.status(200).json(hotels);
//   } catch (err) {
//     next(err);
//   }
// };

export const countByCity = async (req, res, next) => {
  try {
    // Check if 'cities' parameter is present in the query string
    if (!req.query.cities) {
      return res
        .status(400)
        .json({ error: "Missing 'cities' parameter in the query string" });
    }

    const cities = req.query.cities.split(",");

    const list = await Promise.all(
      cities.map((city) => {
        return Hotel.countDocuments({ city: city });
      })
    );

    res.status(200).json({ message: "City hotel", list });
  } catch (err) {
    next(err);
  }
};

export const countByType = async (req, res, next) => {
  try {
    const hotelCount = await Hotel.countDocuments({ type: "Khách sạn" });
    const apartmentCount = await Hotel.countDocuments({ type: "Căn hộ" });
    const resortCount = await Hotel.countDocuments({ type: "resort" });
    const villaCount = await Hotel.countDocuments({ type: "villa" });
    const cabinCount = await Hotel.countDocuments({ type: "cabin" });

    res.status(200).json([
      { type: "Khách sạn", count: hotelCount },
      { type: "căn hộ", count: apartmentCount },
      { type: "resorts", count: resortCount },
      { type: "villas", count: villaCount },
      { type: "cabins", count: cabinCount },
    ]);
  } catch (err) {
    next(err);
  }
};

export const getHotelRooms = async (req, res, next) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    const list = await Promise.all(
      hotel.rooms.map((room) => {
        return Room.findById(room);
      })
    );
    res.status(200).json(list);
  } catch (err) {
    next(err);
  }
};

import express from "express";
import {
  createRoom,
  deleteRoom,
  getRoom,
  getRooms,
  updateRoom,
  updateRoomAvailability,
} from "../controllers/room.js";
import { verifyAdmin } from "../utils/verifyToken.js";
import { upload } from "../controllers/room.js";
const router = express.Router();
// CREATE
router.post("/:hotelid", verifyAdmin, createRoom);

// UPDATE
router.put("/availability/:id", updateRoomAvailability);
router.put("/:id", verifyAdmin, updateRoom);
// DELETE
router.delete("/:id/:hotelid", verifyAdmin, deleteRoom);
// GET

router.get("/:id", getRoom);
// GET ALL

router.get("/", getRooms);

router.put("/:roomsid", upload.single("image"), async (req, res, next) => {
  const hotelId = req.params.hotelid;
  const newRoom = new Room({
    ...req.body,
    image: req.file ? req.file.filename : null, // Save the filename in the room model
  });

  try {
    const savedRoom = await newRoom.save();
    try {
      await Hotel.findByIdAndUpdate(hotelId, {
        $push: { rooms: savedRoom._id },
      });
    } catch (err) {
      next(err);
    }
    res.status(200).json(savedRoom);
  } catch (err) {
    next(err);
  }
});

export default router;

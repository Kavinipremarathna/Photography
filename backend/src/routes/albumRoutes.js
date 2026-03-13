import express from "express";
import {
  getAlbums,
  getAlbumById,
  createAlbum,
  updateAlbum,
  deleteAlbum
} from "../controllers/albumController.js";
import { protect } from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

router.get("/", getAlbums);
router.get("/:id", getAlbumById);
router.post(
  "/",
  protect,
  upload.fields([
    { name: "coverImage", maxCount: 1 },
    { name: "coverImages", maxCount: 500 }
  ]),
  createAlbum
);
router.put("/:id", protect, upload.single("coverImage"), updateAlbum);
router.delete("/:id", protect, deleteAlbum);

export default router;

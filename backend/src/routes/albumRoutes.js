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
router.post("/", protect, upload.single("coverImage"), createAlbum);
router.put("/:id", protect, upload.single("coverImage"), updateAlbum);
router.delete("/:id", protect, deleteAlbum);

export default router;

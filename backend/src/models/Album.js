import mongoose from "mongoose";

const albumSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    artist: { type: String, required: true },
    description: String,
    category: String,
    tracks: [String],
    coverImage: String,
    releaseDate: Date
  },
  { timestamps: true }
);

export default mongoose.model("Album", albumSchema);

import Album from "../models/Album.js";

export const getAlbums = async (req, res) => {
  const albums = await Album.find();
  res.json(albums);
};

export const getAlbumById = async (req, res) => {
  const album = await Album.findById(req.params.id);
  if (!album) return res.status(404).json({ message: "Album not found" });
  res.json(album);
};

export const createAlbum = async (req, res) => {
  const album = await Album.create({
    ...req.body,
    coverImage: req.file?.path
  });
  res.status(201).json(album);
};

export const updateAlbum = async (req, res) => {
  const album = await Album.findByIdAndUpdate(
    req.params.id,
    {
      ...req.body,
      ...(req.file && { coverImage: req.file.path })
    },
    { new: true }
  );
  res.json(album);
};

export const deleteAlbum = async (req, res) => {
  await Album.findByIdAndDelete(req.params.id);
  res.json({ message: "Album removed" });
};

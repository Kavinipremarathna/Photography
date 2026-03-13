import Album from "../models/Album.js";

const stripExtension = (fileName = "") => fileName.replace(/\.[^/.]+$/, "");
const resolveFileUrl = (req, file) => {
  if (!file) return undefined;
  if (file.path?.startsWith("http")) return file.path;
  if (file.filename) {
    return `${req.protocol}://${req.get("host")}/uploads/${file.filename}`;
  }
  return file.path;
};

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
  const singleCoverFile = req.files?.coverImage?.[0] || req.file;
  const singleCover = resolveFileUrl(req, singleCoverFile);
  const bulkFiles = req.files?.coverImages || [];

  if (bulkFiles.length > 0) {
    const photoUrls = bulkFiles.map(file => resolveFileUrl(req, file));
    const baseTitle = req.body.title?.trim() || "New Album";
    const artist = req.body.artist?.trim() || "Unknown Artist";

    const album = await Album.create({
      ...req.body,
      title: baseTitle,
      artist: artist,
      coverImage: photoUrls[0],
      photos: photoUrls
    });

    return res.status(201).json({
      message: `Album created with ${photoUrls.length} photos`,
      count: photoUrls.length,
      album: album
    });
  }

  const album = await Album.create({
    ...req.body,
    coverImage: singleCover,
    photos: singleCover ? [singleCover] : []
  });
  res.status(201).json(album);
};

export const updateAlbum = async (req, res) => {
  const album = await Album.findByIdAndUpdate(
    req.params.id,
    {
      ...req.body,
      ...(req.file && { coverImage: resolveFileUrl(req, req.file) })
    },
    { new: true }
  );
  res.json(album);
};

export const deleteAlbum = async (req, res) => {
  await Album.findByIdAndDelete(req.params.id);
  res.json({ message: "Album removed" });
};

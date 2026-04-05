import { Link } from "react-router-dom";

export default function AlbumCard({ album }) {
  const fallbackImage =
    "https://images.unsplash.com/photo-1494232410401-ad00d5433cfa?w=1200&q=80";

  return (
    <div className="bg-white shadow rounded overflow-hidden hover:shadow-lg transition">
      <img
        src={album?.coverImage || fallbackImage}
        alt={album?.title || "Album cover"}
        className="h-48 w-full object-cover"
        onError={(e) => {
          e.currentTarget.src = fallbackImage;
        }}
      />
      <div className="p-4">
        <h3 className="font-bold text-lg">
          {album?.title || "Untitled Album"}
        </h3>
        <p className="text-gray-600">{album?.artist || "Unknown Artist"}</p>
        <Link
          to={`/albums/${album?._id}`}
          className="text-blue-600 text-sm mt-2 inline-block"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}

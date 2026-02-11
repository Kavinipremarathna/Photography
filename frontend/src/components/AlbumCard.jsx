import { Link } from "react-router-dom";

export default function AlbumCard({ album }) {
  return (
    <div className="bg-white shadow rounded overflow-hidden hover:shadow-lg transition">
      <img
        src={album.coverImage}
        alt={album.title}
        className="h-48 w-full object-cover"
      />
      <div className="p-4">
        <h3 className="font-bold text-lg">{album.title}</h3>
        <p className="text-gray-600">{album.artist}</p>
        <Link
          to={`/albums/${album._id}`}
          className="text-blue-600 text-sm mt-2 inline-block"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}

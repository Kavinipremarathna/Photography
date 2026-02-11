import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="text-center py-20">
      <h1 className="text-4xl font-bold mb-4">Welcome to AlbumHub</h1>
      <p className="text-gray-600 mb-6">
        Discover and explore amazing music albums.
      </p>
      <Link
        to="/albums"
        className="bg-black text-white px-6 py-3 rounded"
      >
        Browse Albums
      </Link>
    </div>
  );
}

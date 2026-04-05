import { useEffect, useState } from "react";
import api from "../api/axios";
import AlbumCard from "../components/AlbumCard";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";

export default function Albums() {
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const { data } = await api.get("/albums");
        const normalizedAlbums = Array.isArray(data)
          ? data
          : Array.isArray(data?.albums)
            ? data.albums
            : [];
        setAlbums(normalizedAlbums);
        setLoading(false);
      } catch (err) {
        const message =
          err?.response?.data?.message || "Failed to fetch albums";
        setError(message);
        setLoading(false);
      }
    };
    fetchAlbums();
  }, []);

  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="p-6 pt-28 min-h-screen">
      {albums.length === 0 ? (
        <ErrorMessage message="No albums found yet." />
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {albums.map((album) => (
            <AlbumCard key={album._id} album={album} />
          ))}
        </div>
      )}
    </div>
  );
}

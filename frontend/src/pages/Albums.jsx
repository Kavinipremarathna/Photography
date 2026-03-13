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
        setAlbums(data);
        setLoading(false);
      } catch {
        setError("Failed to fetch albums");
        setLoading(false);
      }
    };
    fetchAlbums();
  }, []);

  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="p-6">
      <div className="grid md:grid-cols-3 gap-6">
        {albums.map((album) => (
          <AlbumCard key={album._id} album={album} />
        ))}
      </div>
    </div>
  );
}

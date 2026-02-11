import { useEffect, useState } from "react";
import api from "../api/axios";
import AlbumCard from "../components/AlbumCard";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";

export default function Albums() {
  const [albums, setAlbums] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const { data } = await api.get("/albums");
        setAlbums(data);
        setFiltered(data);
        setLoading(false);
      } catch {
        setError("Failed to fetch albums");
        setLoading(false);
      }
    };
    fetchAlbums();
  }, []);

  useEffect(() => {
    const result = albums.filter(
      (album) =>
        album.title.toLowerCase().includes(search.toLowerCase()) ||
        album.artist.toLowerCase().includes(search.toLowerCase())
    );
    setFiltered(result);
  }, [search, albums]);

  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="p-6">
      <input
        type="text"
        placeholder="Search by title or artist..."
        className="border p-2 w-full mb-6 rounded"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="grid md:grid-cols-3 gap-6">
        {filtered.map((album) => (
          <AlbumCard key={album._id} album={album} />
        ))}
      </div>
    </div>
  );
}

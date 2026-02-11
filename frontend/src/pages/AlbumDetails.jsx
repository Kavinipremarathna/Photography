import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";

export default function AlbumDetails() {
  const { id } = useParams();
  const [album, setAlbum] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAlbum = async () => {
      try {
        const { data } = await api.get(`/albums/${id}`);
        setAlbum(data);
        setLoading(false);
      } catch {
        setLoading(false);
      }
    };
    fetchAlbum();
  }, [id]);

  if (loading) return <Loader />;
  if (!album) return <ErrorMessage message="Album not found" />;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <img
        src={album.coverImage}
        alt={album.title}
        className="w-full h-80 object-cover rounded"
      />
      <h1 className="text-3xl font-bold mt-4">{album.title}</h1>
      <p className="text-gray-600">{album.artist}</p>
      <p className="mt-4">{album.description}</p>

      <h3 className="mt-6 font-bold">Tracks:</h3>
      <ul className="list-disc pl-6">
        {album.tracks?.map((track, index) => (
          <li key={index}>{track}</li>
        ))}
      </ul>
    </div>
  );
}

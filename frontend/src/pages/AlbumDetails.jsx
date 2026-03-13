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
    <div className="p-6 max-w-6xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">{album.title}</h1>
        <p className="text-gray-600 text-lg">{album.artist}</p>
        {album.description && <p className="mt-2 text-gray-700">{album.description}</p>}
      </div>

      {album.photos && album.photos.length > 0 ? (
        <>
          <h3 className="text-xl font-bold mb-4">Photos ({album.photos.length})</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {album.photos.map((photo, index) => (
              <div key={index} className="overflow-hidden rounded-lg shadow-md hover:shadow-xl transition">
                <img
                  src={photo}
                  alt={`${album.title} - Photo ${index + 1}`}
                  className="w-full h-64 object-cover"
                />
              </div>
            ))}
          </div>
        </>
      ) : (
        <img
          src={album.coverImage}
          alt={album.title}
          className="w-full h-80 object-cover rounded"
        />
      )}

      {album.tracks && album.tracks.length > 0 && (
        <>
          <h3 className="mt-8 font-bold">Tracks:</h3>
          <ul className="list-disc pl-6">
            {album.tracks.map((track, index) => (
              <li key={index}>{track}</li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

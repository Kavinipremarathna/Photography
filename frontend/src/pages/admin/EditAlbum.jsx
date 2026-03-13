import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../api/axios";
import AdminSidebar from "../../components/AdminSidebar";
import toast from "react-hot-toast";

export default function EditAlbum() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    artist: "",
    description: "",
    category: ""
  });
  const [currentPhotos, setCurrentPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = JSON.parse(localStorage.getItem("admin")).token;

  useEffect(() => {
    const fetchAlbum = async () => {
      try {
        const { data } = await api.get(`/albums/${id}`);
        setForm({
          title: data.title || "",
          artist: data.artist || "",
          description: data.description || "",
          category: data.category || ""
        });
        setCurrentPhotos(data.photos || []);
        setLoading(false);
      } catch (error) {
        toast.error("Failed to load album");
        setLoading(false);
      }
    };
    fetchAlbum();
  }, [id]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      Object.keys(form).forEach((key) => {
        if (form[key]) formData.append(key, form[key]);
      });

      await api.put(`/albums/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data"
        }
      });

      toast.success("Album updated");
      navigate("/admin/albums");
    } catch (error) {
      toast.error("Failed to update album");
    }
  };

  if (loading) {
    return (
      <div className="flex">
        <AdminSidebar />
        <div className="p-6 flex-1">Loading...</div>
      </div>
    );
  }

  return (
    <div className="flex">
      <AdminSidebar />
      <div className="p-6 flex-1">
        <h1 className="text-2xl font-bold mb-6">Edit Album</h1>

        {currentPhotos.length > 0 && (
          <div className="mb-6">
            <h3 className="font-bold mb-2">Current Photos ({currentPhotos.length})</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {currentPhotos.map((photo, index) => (
                <img
                  key={index}
                  src={photo}
                  alt={`Photo ${index + 1}`}
                  className="w-full h-32 object-cover rounded border"
                />
              ))}
            </div>
          </div>
        )}

        <form onSubmit={submitHandler} className="space-y-3">
          <input
            type="text"
            placeholder="Title"
            className="border p-2 w-full"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
          <input
            type="text"
            placeholder="Artist"
            className="border p-2 w-full"
            value={form.artist}
            onChange={(e) => setForm({ ...form, artist: e.target.value })}
          />
          <textarea
            placeholder="Description"
            className="border p-2 w-full"
            rows="3"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
          <input
            type="text"
            placeholder="Category"
            className="border p-2 w-full"
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
          />
          <div className="flex gap-3">
            <button className="bg-black text-white px-6 py-2">
              Update Album
            </button>
            <button
              type="button"
              onClick={() => navigate("/admin/albums")}
              className="bg-gray-500 text-white px-6 py-2"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

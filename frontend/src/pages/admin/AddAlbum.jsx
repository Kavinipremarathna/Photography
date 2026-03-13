import { useState } from "react";
import api from "../../api/axios";
import AdminSidebar from "../../components/AdminSidebar";
import toast from "react-hot-toast";

export default function AddAlbum() {
  const [form, setForm] = useState({ title: "", artist: "" });
  const [files, setFiles] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const token = JSON.parse(localStorage.getItem("admin")).token;

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!files.length) {
      toast.error("Please select at least one image");
      return;
    }

    const formData = new FormData();
    if (form.title) formData.append("title", form.title);
    if (form.artist) formData.append("artist", form.artist);

    if (files.length === 1) {
      formData.append("coverImage", files[0]);
    } else {
      files.forEach((file) => formData.append("coverImages", file));
    }

    setSubmitting(true);

    try {
      const { data } = await api.post("/albums", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data"
        },
        timeout: 0
      });

      const createdCount = data?.count || 1;
      const message = data?.count 
        ? `Album created with ${createdCount} photo${createdCount > 1 ? "s" : ""}`
        : "Album added successfully";
      toast.success(message);
      setForm({ title: "", artist: "" });
      setFiles([]);
      e.target.reset();
    } catch (error) {
      const message =
        error?.response?.data?.message || "Failed to add albums. Please try again.";
      toast.error(message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex">
      <AdminSidebar />
      <div className="p-6 flex-1">
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
          <input
            type="file"
            accept=".png,.jpg,.jpeg,.webp"
            multiple
            className="border p-2 w-full"
            onChange={(e) => setFiles(Array.from(e.target.files || []))}
          />
          <p className="text-sm text-gray-600">
            Selected files: {files.length}
          </p>
          <button
            disabled={submitting}
            className="bg-black text-white px-6 py-2 disabled:opacity-60"
          >
            {submitting ? "Uploading..." : "Add Album(s)"}
          </button>
        </form>
      </div>
    </div>
  );
}

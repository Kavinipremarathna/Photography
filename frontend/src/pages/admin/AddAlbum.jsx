import { useState } from "react";
import api from "../../api/axios";
import AdminSidebar from "../../components/AdminSidebar";
import toast from "react-hot-toast";

export default function AddAlbum() {
  const [form, setForm] = useState({});
  const token = JSON.parse(localStorage.getItem("admin")).token;

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.keys(form).forEach((key) =>
      formData.append(key, form[key])
    );

    await api.post("/albums", formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data"
      }
    });

    toast.success("Album added");
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
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
          <input
            type="text"
            placeholder="Artist"
            className="border p-2 w-full"
            onChange={(e) => setForm({ ...form, artist: e.target.value })}
          />
          <input
            type="file"
            className="border p-2 w-full"
            onChange={(e) =>
              setForm({ ...form, coverImage: e.target.files[0] })
            }
          />
          <button className="bg-black text-white px-6 py-2">
            Add Album
          </button>
        </form>
      </div>
    </div>
  );
}

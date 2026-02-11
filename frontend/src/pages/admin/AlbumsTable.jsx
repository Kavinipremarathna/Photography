import { useEffect, useState } from "react";
import api from "../../api/axios";
import AdminSidebar from "../../components/AdminSidebar";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

export default function AlbumsTable() {
  const [albums, setAlbums] = useState([]);

  const fetchAlbums = async () => {
    const { data } = await api.get("/albums");
    setAlbums(data);
  };

  useEffect(() => {
    fetchAlbums();
  }, []);

  const deleteAlbum = async (id) => {
    const token = JSON.parse(localStorage.getItem("admin")).token;
    await api.delete(`/albums/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    toast.success("Album deleted");
    fetchAlbums();
  };

  return (
    <div className="flex">
      <AdminSidebar />
      <div className="p-6 flex-1">
        <div className="flex justify-between mb-4">
          <h1 className="text-xl font-bold">Albums</h1>
          <Link to="/admin/albums/add" className="bg-black text-white px-4 py-2">
            Add Album
          </Link>
        </div>

        <table className="w-full bg-white shadow rounded">
          <thead>
            <tr className="border-b">
              <th className="p-2">Title</th>
              <th>Artist</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {albums.map((album) => (
              <tr key={album._id} className="border-b text-center">
                <td>{album.title}</td>
                <td>{album.artist}</td>
                <td>
                  <Link
                    to={`/admin/albums/edit/${album._id}`}
                    className="text-blue-500 mr-3"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => deleteAlbum(album._id)}
                    className="text-red-500"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

import { useEffect, useState } from "react";
import api from "../../api/axios";
import AdminSidebar from "../../components/AdminSidebar";

export default function Dashboard() {
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    api.get("/albums").then((res) => setAlbums(res.data));
  }, []);

  const categories = [...new Set(albums.map((a) => a.category))];

  return (
    <div className="flex">
      <AdminSidebar />
      <div className="p-6 flex-1">
        <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
        <div className="grid grid-cols-2 gap-6">
          <div className="bg-white p-4 shadow rounded">
            <h3>Total Albums</h3>
            <p className="text-2xl">{albums.length}</p>
          </div>
          <div className="bg-white p-4 shadow rounded">
            <h3>Total Categories</h3>
            <p className="text-2xl">{categories.length}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

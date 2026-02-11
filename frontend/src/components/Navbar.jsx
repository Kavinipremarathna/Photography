import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-black text-white p-4 flex justify-between">
      <Link to="/" className="text-xl font-bold">AlbumHub</Link>
      <Link to="/albums">Albums</Link>
    </nav>
  );
}

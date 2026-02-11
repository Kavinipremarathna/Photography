import { Link, NavLink } from "react-router-dom";

export default function Navbar() {
  const navClass = ({ isActive }) =>
    `text-sm px-3 py-2 rounded hover:bg-white/10 ${
      isActive ? "bg-white/10" : ""
    }`;

  return (
    <nav className="bg-black text-white">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold tracking-wide">
          AlbumHub
        </Link>

        <div className="flex items-center gap-2">
          <NavLink to="/" className={navClass} end>
            Home
          </NavLink>
          <NavLink to="/albums" className={navClass}>
            Albums
          </NavLink>
          <NavLink to="/about" className={navClass}>
            About
          </NavLink>
          <NavLink to="/contact" className={navClass}>
            Contact
          </NavLink>

          <Link
            to="/admin/login"
            className="ml-2 text-sm bg-white text-black px-3 py-2 rounded hover:opacity-90"
          >
            Admin
          </Link>
        </div>
      </div>
    </nav>
  );
}

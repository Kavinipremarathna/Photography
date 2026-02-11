import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div>
      <section className="bg-black text-white">
        <div className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              Showcase Albums with a Premium Experience
            </h1>
            <p className="text-white/80 mt-4">
              AlbumHub is a modern album platform with a secure admin panel to manage albums,
              upload images, and keep your content updated.
            </p>
            <div className="flex gap-3 mt-8">
              <Link to="/albums" className="bg-white text-black px-5 py-3 rounded font-semibold">
                Explore Albums
              </Link>
              <Link to="/contact" className="border border-white/40 px-5 py-3 rounded font-semibold hover:bg-white/10">
                Contact Us
              </Link>
            </div>
          </div>

          <div className="bg-white/10 rounded-2xl p-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/10 rounded-xl p-4">
                <p className="text-sm text-white/70">Secure Admin</p>
                <p className="text-xl font-bold mt-1">Manage Albums</p>
              </div>
              <div className="bg-white/10 rounded-xl p-4">
                <p className="text-sm text-white/70">Cloud Uploads</p>
                <p className="text-xl font-bold mt-1">Cover Images</p>
              </div>
              <div className="bg-white/10 rounded-xl p-4">
                <p className="text-sm text-white/70">Responsive UI</p>
                <p className="text-xl font-bold mt-1">All Devices</p>
              </div>
              <div className="bg-white/10 rounded-xl p-4">
                <p className="text-sm text-white/70">Fast</p>
                <p className="text-xl font-bold mt-1">Vite + API</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-14">
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white shadow rounded p-6">
            <h3 className="font-bold text-lg">Beautiful Album Grid</h3>
            <p className="text-gray-600 mt-2 text-sm">
              A clean layout to browse albums quickly with filters and search.
            </p>
          </div>
          <div className="bg-white shadow rounded p-6">
            <h3 className="font-bold text-lg">Powerful Admin Panel</h3>
            <p className="text-gray-600 mt-2 text-sm">
              Add, edit, delete albums and upload cover images securely.
            </p>
          </div>
          <div className="bg-white shadow rounded p-6">
            <h3 className="font-bold text-lg">Ready for Deployment</h3>
            <p className="text-gray-600 mt-2 text-sm">
              Works great with MongoDB Atlas + Cloudinary + Vercel/Render.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

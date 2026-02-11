export default function About() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <div className="bg-white shadow rounded p-8">
        <h1 className="text-3xl font-bold">About Us</h1>
        <p className="text-gray-700 mt-4 leading-relaxed">
          AlbumHub is a modern platform to showcase albums with beautiful visuals
          and clean UX. Our goal is to help creators and brands organize and present
          their albums professionally — with a secure admin dashboard to manage everything.
        </p>

        <div className="grid md:grid-cols-3 gap-6 mt-8">
          <div className="border rounded p-4">
            <h3 className="font-semibold">Modern UI</h3>
            <p className="text-sm text-gray-600 mt-2">
              Clean, responsive design that looks premium on every device.
            </p>
          </div>

          <div className="border rounded p-4">
            <h3 className="font-semibold">Admin Panel</h3>
            <p className="text-sm text-gray-600 mt-2">
              Add, edit, delete albums and upload images securely.
            </p>
          </div>

          <div className="border rounded p-4">
            <h3 className="font-semibold">Scalable</h3>
            <p className="text-sm text-gray-600 mt-2">
              Ready for deployment with Atlas + Cloudinary + Vercel/Render.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

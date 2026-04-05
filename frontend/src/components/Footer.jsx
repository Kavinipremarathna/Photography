import { Link } from "react-router-dom";
import { useSiteSettings } from "../context/SiteSettingsContext";

export default function Footer() {
  const { settings } = useSiteSettings();

  return (
    <footer className="bg-black text-white mt-16">
      <div className="max-w-6xl mx-auto px-6 py-10 grid md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-lg font-bold">
            {settings.siteName || "AlbumHub"}
          </h3>
          <p className="text-white/70 mt-2 text-sm">
            {settings.footer?.description ||
              "A modern album showcase platform with a secure admin panel to manage content."}
          </p>
        </div>

        <div>
          <h4 className="font-semibold mb-2">Pages</h4>
          <div className="flex flex-col gap-2 text-sm text-white/80">
            <Link to="/" className="hover:text-white">
              Home
            </Link>
            <Link to="/albums" className="hover:text-white">
              Albums
            </Link>
            <Link to="/about" className="hover:text-white">
              About
            </Link>
            <Link to="/contact" className="hover:text-white">
              Contact
            </Link>
          </div>
        </div>

        <div>
          <h4 className="font-semibold mb-2">Contact</h4>
          <p className="text-sm text-white/80">
            {settings.footer?.contactEmail || "hello@albumhub.com"}
          </p>
          <p className="text-sm text-white/80">
            {settings.footer?.contactLocation || "Sri Lanka"}
          </p>
          <p className="text-sm text-white/60 mt-4">
            © {new Date().getFullYear()} {settings.siteName || "AlbumHub"}. All
            rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

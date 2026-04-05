import mongoose from "mongoose";

const siteSettingsSchema = new mongoose.Schema(
  {
    key: { type: String, required: true, unique: true, default: "main" },
    siteName: { type: String, default: "AlbumHub" },
    logoUrl: { type: String, default: "/logo.jpeg" },
    home: {
      eyebrow: { type: String, default: "Premium Photography Platform" },
      titleLine1: { type: String, default: "Showcase" },
      titleLine2: { type: String, default: "Albums with" },
      titleAccent: { type: String, default: "Elegance" },
      primaryButtonText: { type: String, default: "Explore Albums" },
      secondaryButtonText: { type: String, default: "Get in Touch" },
      statsAlbumsValue: { type: String, default: "2.4k" },
      statsAlbumsLabel: { type: String, default: "Albums" },
      statsPhotosValue: { type: String, default: "98k" },
      statsPhotosLabel: { type: String, default: "Photos" },
      statsVisitorsValue: { type: String, default: "12k" },
      statsVisitorsLabel: { type: String, default: "Visitors" },
      description: {
        type: String,
        default:
          "AlbumHub is a refined photography platform with secure admin controls, cloud image hosting, and a layout built to let your work breathe.",
      },
    },
    about: {
      eyebrow: { type: String, default: "About AlbumHub" },
      title: { type: String, default: "Built for Artists and Their Stories" },
      subtitle: {
        type: String,
        default:
          "We believe every image deserves a beautiful home. AlbumHub gives photographers a premium space to present work with confidence.",
      },
    },
    contact: {
      eyebrow: { type: String, default: "Get In Touch" },
      title: {
        type: String,
        default: "Let us build your next photo experience",
      },
      subtitle: {
        type: String,
        default:
          "Questions, ideas, or collaboration requests - send us a message and we will get back to you soon.",
      },
      email: { type: String, default: "hello@albumhub.com" },
      location: { type: String, default: "Colombo, Sri Lanka" },
      hours: { type: String, default: "Mon - Fri, 9am - 6pm" },
    },
    footer: {
      description: {
        type: String,
        default:
          "A modern album showcase platform with a secure admin panel to manage content.",
      },
      contactEmail: { type: String, default: "hello@albumhub.com" },
      contactLocation: { type: String, default: "Sri Lanka" },
    },
  },
  { timestamps: true },
);

export default mongoose.model("SiteSettings", siteSettingsSchema);

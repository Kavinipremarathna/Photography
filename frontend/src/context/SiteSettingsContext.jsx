import { createContext, useContext, useEffect, useMemo, useState } from "react";
import api from "../api/axios";

const DEFAULT_SETTINGS = {
  siteName: "AlbumHub",
  logoUrl: "/logo.jpeg",
  home: {
    eyebrow: "Premium Photography Platform",
    titleLine1: "Showcase",
    titleLine2: "Albums with",
    titleAccent: "Elegance",
    primaryButtonText: "Explore Albums",
    secondaryButtonText: "Get in Touch",
    statsAlbumsValue: "2.4k",
    statsAlbumsLabel: "Albums",
    statsPhotosValue: "98k",
    statsPhotosLabel: "Photos",
    statsVisitorsValue: "12k",
    statsVisitorsLabel: "Visitors",
    description:
      "AlbumHub is a refined photography platform with secure admin controls, cloud image hosting, and a layout built to let your work breathe.",
  },
  about: {
    eyebrow: "About AlbumHub",
    title: "Built for Artists and Their Stories",
    subtitle:
      "We believe every image deserves a beautiful home. AlbumHub gives photographers a premium space to present work with confidence.",
  },
  contact: {
    eyebrow: "Get In Touch",
    title: "Let us build your next photo experience",
    subtitle:
      "Questions, ideas, or collaboration requests - send us a message and we will get back to you soon.",
    email: "hello@albumhub.com",
    location: "Colombo, Sri Lanka",
    hours: "Mon - Fri, 9am - 6pm",
  },
  footer: {
    description:
      "A modern album showcase platform with a secure admin panel to manage content.",
    contactEmail: "hello@albumhub.com",
    contactLocation: "Sri Lanka",
  },
};

const SiteSettingsContext = createContext({
  settings: DEFAULT_SETTINGS,
  refreshSettings: async () => {},
});

export function SiteSettingsProvider({ children }) {
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);

  const refreshSettings = async () => {
    try {
      const { data } = await api.get("/settings");
      setSettings({ ...DEFAULT_SETTINGS, ...data });
    } catch {
      setSettings(DEFAULT_SETTINGS);
    }
  };

  useEffect(() => {
    refreshSettings();
  }, []);

  const value = useMemo(() => ({ settings, refreshSettings }), [settings]);

  return (
    <SiteSettingsContext.Provider value={value}>
      {children}
    </SiteSettingsContext.Provider>
  );
}

export const useSiteSettings = () => useContext(SiteSettingsContext);

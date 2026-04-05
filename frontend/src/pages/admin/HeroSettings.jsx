import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import api from "../../api/axios";
import AdminSidebar from "../../components/AdminSidebar";
import { useSiteSettings } from "../../context/SiteSettingsContext";

const EMPTY_HERO = {
  eyebrow: "",
  titleLine1: "",
  titleLine2: "",
  titleAccent: "",
  description: "",
  primaryButtonText: "",
  secondaryButtonText: "",
  statsAlbumsValue: "",
  statsAlbumsLabel: "",
  statsPhotosValue: "",
  statsPhotosLabel: "",
  statsVisitorsValue: "",
  statsVisitorsLabel: "",
};

export default function HeroSettings() {
  const [hero, setHero] = useState(EMPTY_HERO);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const { refreshSettings } = useSiteSettings();

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const { data } = await api.get("/settings");
        setHero({ ...EMPTY_HERO, ...(data?.home || {}) });
      } catch {
        toast.error("Failed to load hero settings");
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, []);

  const handleChange = (field, value) => {
    setHero((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      await api.put("/settings", { home: hero });
      await refreshSettings();
      toast.success("Hero updated successfully");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to save hero");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen bg-slate-100">
        <AdminSidebar />
        <div className="p-8 flex-1">Loading hero editor...</div>
      </div>
    );
  }

  const previewStats = [
    [hero.statsAlbumsValue || "2.4k", hero.statsAlbumsLabel || "Albums"],
    [hero.statsPhotosValue || "98k", hero.statsPhotosLabel || "Photos"],
    [hero.statsVisitorsValue || "12k", hero.statsVisitorsLabel || "Visitors"],
  ];

  return (
    <div className="flex min-h-screen bg-slate-100">
      <AdminSidebar />

      <div className="flex-1 p-6 md:p-8">
        <div className="mb-6">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
            Admin / Hero
          </p>
          <h1 className="text-3xl font-bold text-slate-900 mt-2">
            Hero Section Editor
          </h1>
          <p className="text-slate-600 mt-2">
            Update the main headline, buttons, and key stats shown on the home
            page hero.
          </p>
        </div>

        <div className="grid xl:grid-cols-2 gap-6">
          <form
            onSubmit={handleSave}
            className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 space-y-6"
          >
            <section className="space-y-3">
              <h2 className="font-semibold text-slate-900">Headline Content</h2>
              <input
                className="w-full border border-slate-300 rounded-lg px-3 py-2"
                placeholder="Eyebrow"
                value={hero.eyebrow}
                onChange={(e) => handleChange("eyebrow", e.target.value)}
              />
              <input
                className="w-full border border-slate-300 rounded-lg px-3 py-2"
                placeholder="Title line 1"
                value={hero.titleLine1}
                onChange={(e) => handleChange("titleLine1", e.target.value)}
              />
              <input
                className="w-full border border-slate-300 rounded-lg px-3 py-2"
                placeholder="Title line 2"
                value={hero.titleLine2}
                onChange={(e) => handleChange("titleLine2", e.target.value)}
              />
              <input
                className="w-full border border-slate-300 rounded-lg px-3 py-2"
                placeholder="Title accent"
                value={hero.titleAccent}
                onChange={(e) => handleChange("titleAccent", e.target.value)}
              />
              <textarea
                className="w-full border border-slate-300 rounded-lg px-3 py-2"
                rows={4}
                placeholder="Description"
                value={hero.description}
                onChange={(e) => handleChange("description", e.target.value)}
              />
            </section>

            <section className="space-y-3">
              <h2 className="font-semibold text-slate-900">Buttons</h2>
              <input
                className="w-full border border-slate-300 rounded-lg px-3 py-2"
                placeholder="Primary button text"
                value={hero.primaryButtonText}
                onChange={(e) =>
                  handleChange("primaryButtonText", e.target.value)
                }
              />
              <input
                className="w-full border border-slate-300 rounded-lg px-3 py-2"
                placeholder="Secondary button text"
                value={hero.secondaryButtonText}
                onChange={(e) =>
                  handleChange("secondaryButtonText", e.target.value)
                }
              />
            </section>

            <section className="space-y-3">
              <h2 className="font-semibold text-slate-900">Stats</h2>
              <div className="grid sm:grid-cols-2 gap-3">
                <input
                  className="border border-slate-300 rounded-lg px-3 py-2"
                  placeholder="Albums value"
                  value={hero.statsAlbumsValue}
                  onChange={(e) =>
                    handleChange("statsAlbumsValue", e.target.value)
                  }
                />
                <input
                  className="border border-slate-300 rounded-lg px-3 py-2"
                  placeholder="Albums label"
                  value={hero.statsAlbumsLabel}
                  onChange={(e) =>
                    handleChange("statsAlbumsLabel", e.target.value)
                  }
                />
                <input
                  className="border border-slate-300 rounded-lg px-3 py-2"
                  placeholder="Photos value"
                  value={hero.statsPhotosValue}
                  onChange={(e) =>
                    handleChange("statsPhotosValue", e.target.value)
                  }
                />
                <input
                  className="border border-slate-300 rounded-lg px-3 py-2"
                  placeholder="Photos label"
                  value={hero.statsPhotosLabel}
                  onChange={(e) =>
                    handleChange("statsPhotosLabel", e.target.value)
                  }
                />
                <input
                  className="border border-slate-300 rounded-lg px-3 py-2"
                  placeholder="Visitors value"
                  value={hero.statsVisitorsValue}
                  onChange={(e) =>
                    handleChange("statsVisitorsValue", e.target.value)
                  }
                />
                <input
                  className="border border-slate-300 rounded-lg px-3 py-2"
                  placeholder="Visitors label"
                  value={hero.statsVisitorsLabel}
                  onChange={(e) =>
                    handleChange("statsVisitorsLabel", e.target.value)
                  }
                />
              </div>
            </section>

            <button
              disabled={saving}
              className="rounded-lg bg-slate-900 text-white px-5 py-2.5 font-medium hover:bg-slate-800 disabled:opacity-60"
            >
              {saving ? "Saving..." : "Save Hero"}
            </button>
          </form>

          <div className="bg-slate-950 rounded-2xl text-white p-6 shadow-xl relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(245,158,11,0.35),transparent_35%),radial-gradient(circle_at_80%_30%,rgba(59,130,246,0.25),transparent_40%)]" />
            <div className="relative z-10">
              <p className="text-xs uppercase tracking-[0.24em] text-amber-300 mb-5">
                {hero.eyebrow || "Premium Photography Platform"}
              </p>
              <h2 className="text-4xl font-bold leading-tight mb-5">
                {hero.titleLine1 || "Showcase"}
                <br />
                {hero.titleLine2 || "Albums with"}
                <br />
                <span className="text-amber-300 italic">
                  {hero.titleAccent || "Elegance"}
                </span>
              </h2>
              <p className="text-slate-300 max-w-xl leading-relaxed mb-7">
                {hero.description ||
                  "AlbumHub is a refined photography platform with secure admin controls, cloud image hosting, and a layout built to let your work breathe."}
              </p>

              <div className="flex items-center gap-3 mb-10">
                <button
                  type="button"
                  className="px-4 py-2 rounded-lg bg-white text-slate-900 font-medium"
                >
                  {hero.primaryButtonText || "Explore Albums"}
                </button>
                <button
                  type="button"
                  className="px-4 py-2 rounded-lg border border-slate-500 text-slate-200 font-medium"
                >
                  {hero.secondaryButtonText || "Get in Touch"}
                </button>
              </div>

              <div className="grid grid-cols-3 gap-4">
                {previewStats.map(([value, label]) => (
                  <div
                    key={label}
                    className="rounded-xl bg-white/5 border border-white/10 p-3"
                  >
                    <p className="text-2xl font-semibold text-white">{value}</p>
                    <p className="text-xs uppercase tracking-[0.16em] text-slate-400 mt-1">
                      {label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

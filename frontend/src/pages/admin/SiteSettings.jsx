import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import api from "../../api/axios";
import AdminSidebar from "../../components/AdminSidebar";
import { useSiteSettings } from "../../context/SiteSettingsContext";

const EMPTY_FORM = {
  siteName: "",
  logoUrl: "",
  home: {
    eyebrow: "",
    titleLine1: "",
    titleLine2: "",
    titleAccent: "",
    description: "",
  },
  about: {
    eyebrow: "",
    title: "",
    subtitle: "",
  },
  contact: {
    eyebrow: "",
    title: "",
    subtitle: "",
    email: "",
    location: "",
    hours: "",
  },
  footer: {
    description: "",
    contactEmail: "",
    contactLocation: "",
  },
};

export default function SiteSettings() {
  const [form, setForm] = useState(EMPTY_FORM);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const { refreshSettings } = useSiteSettings();

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const { data } = await api.get("/settings");
        setForm({
          ...EMPTY_FORM,
          ...data,
          home: { ...EMPTY_FORM.home, ...(data.home || {}) },
          about: { ...EMPTY_FORM.about, ...(data.about || {}) },
          contact: { ...EMPTY_FORM.contact, ...(data.contact || {}) },
          footer: { ...EMPTY_FORM.footer, ...(data.footer || {}) },
        });
      } catch {
        toast.error("Failed to load site settings");
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, []);

  const updateNested = (group, field, value) => {
    setForm((prev) => ({
      ...prev,
      [group]: {
        ...prev[group],
        [field]: value,
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      await api.put("/settings", form);
      await refreshSettings();
      toast.success("Site settings updated");
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Failed to update settings",
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex">
        <AdminSidebar />
        <div className="p-6 flex-1">Loading site settings...</div>
      </div>
    );
  }

  return (
    <div className="flex">
      <AdminSidebar />
      <div className="p-6 flex-1">
        <h1 className="text-2xl font-bold mb-6">Site Settings</h1>

        <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl">
          <section className="bg-white p-4 rounded shadow space-y-3">
            <h2 className="font-semibold text-lg">Global</h2>
            <input
              className="border p-2 w-full"
              placeholder="Site name"
              value={form.siteName}
              onChange={(e) => setForm({ ...form, siteName: e.target.value })}
            />
            <input
              className="border p-2 w-full"
              placeholder="Logo URL"
              value={form.logoUrl}
              onChange={(e) => setForm({ ...form, logoUrl: e.target.value })}
            />
          </section>

          <section className="bg-white p-4 rounded shadow space-y-3">
            <h2 className="font-semibold text-lg">Home Page</h2>
            <input
              className="border p-2 w-full"
              placeholder="Home eyebrow"
              value={form.home.eyebrow}
              onChange={(e) => updateNested("home", "eyebrow", e.target.value)}
            />
            <input
              className="border p-2 w-full"
              placeholder="Home title line 1"
              value={form.home.titleLine1}
              onChange={(e) =>
                updateNested("home", "titleLine1", e.target.value)
              }
            />
            <input
              className="border p-2 w-full"
              placeholder="Home title line 2"
              value={form.home.titleLine2}
              onChange={(e) =>
                updateNested("home", "titleLine2", e.target.value)
              }
            />
            <input
              className="border p-2 w-full"
              placeholder="Home title accent"
              value={form.home.titleAccent}
              onChange={(e) =>
                updateNested("home", "titleAccent", e.target.value)
              }
            />
            <textarea
              className="border p-2 w-full"
              rows={3}
              placeholder="Home description"
              value={form.home.description}
              onChange={(e) =>
                updateNested("home", "description", e.target.value)
              }
            />
          </section>

          <section className="bg-white p-4 rounded shadow space-y-3">
            <h2 className="font-semibold text-lg">About Page</h2>
            <input
              className="border p-2 w-full"
              placeholder="About eyebrow"
              value={form.about.eyebrow}
              onChange={(e) => updateNested("about", "eyebrow", e.target.value)}
            />
            <input
              className="border p-2 w-full"
              placeholder="About title"
              value={form.about.title}
              onChange={(e) => updateNested("about", "title", e.target.value)}
            />
            <textarea
              className="border p-2 w-full"
              rows={3}
              placeholder="About subtitle"
              value={form.about.subtitle}
              onChange={(e) =>
                updateNested("about", "subtitle", e.target.value)
              }
            />
          </section>

          <section className="bg-white p-4 rounded shadow space-y-3">
            <h2 className="font-semibold text-lg">Contact Page</h2>
            <input
              className="border p-2 w-full"
              placeholder="Contact eyebrow"
              value={form.contact.eyebrow}
              onChange={(e) =>
                updateNested("contact", "eyebrow", e.target.value)
              }
            />
            <input
              className="border p-2 w-full"
              placeholder="Contact title"
              value={form.contact.title}
              onChange={(e) => updateNested("contact", "title", e.target.value)}
            />
            <textarea
              className="border p-2 w-full"
              rows={3}
              placeholder="Contact subtitle"
              value={form.contact.subtitle}
              onChange={(e) =>
                updateNested("contact", "subtitle", e.target.value)
              }
            />
            <input
              className="border p-2 w-full"
              placeholder="Contact email"
              value={form.contact.email}
              onChange={(e) => updateNested("contact", "email", e.target.value)}
            />
            <input
              className="border p-2 w-full"
              placeholder="Contact location"
              value={form.contact.location}
              onChange={(e) =>
                updateNested("contact", "location", e.target.value)
              }
            />
            <input
              className="border p-2 w-full"
              placeholder="Contact hours"
              value={form.contact.hours}
              onChange={(e) => updateNested("contact", "hours", e.target.value)}
            />
          </section>

          <section className="bg-white p-4 rounded shadow space-y-3">
            <h2 className="font-semibold text-lg">Footer</h2>
            <textarea
              className="border p-2 w-full"
              rows={2}
              placeholder="Footer description"
              value={form.footer.description}
              onChange={(e) =>
                updateNested("footer", "description", e.target.value)
              }
            />
            <input
              className="border p-2 w-full"
              placeholder="Footer contact email"
              value={form.footer.contactEmail}
              onChange={(e) =>
                updateNested("footer", "contactEmail", e.target.value)
              }
            />
            <input
              className="border p-2 w-full"
              placeholder="Footer contact location"
              value={form.footer.contactLocation}
              onChange={(e) =>
                updateNested("footer", "contactLocation", e.target.value)
              }
            />
          </section>

          <button
            disabled={saving}
            className="bg-black text-white px-6 py-2 disabled:opacity-60"
          >
            {saving ? "Saving..." : "Save Settings"}
          </button>
        </form>
      </div>
    </div>
  );
}

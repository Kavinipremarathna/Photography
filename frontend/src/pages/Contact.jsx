import { useState } from "react";
import toast from "react-hot-toast";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);

  const update = (k, v) => setForm((p) => ({ ...p, [k]: v }));

  const submit = async (e) => {
    e.preventDefault();

    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      toast.error("Please fill all fields");
      return;
    }

    setLoading(true);

    // For now: demo only (no email send yet)
    setTimeout(() => {
      toast.success("Message received! We'll contact you soon.");
      setForm({ name: "", email: "", message: "" });
      setLoading(false);
    }, 600);
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white shadow rounded p-8">
          <h1 className="text-3xl font-bold">Contact Us</h1>
          <p className="text-gray-600 mt-3">
            Send us a message and we’ll get back to you.
          </p>

          <form onSubmit={submit} className="mt-6 space-y-3">
            <input
              className="border p-2 rounded w-full"
              placeholder="Your name"
              value={form.name}
              onChange={(e) => update("name", e.target.value)}
            />
            <input
              className="border p-2 rounded w-full"
              placeholder="Your email"
              value={form.email}
              onChange={(e) => update("email", e.target.value)}
            />
            <textarea
              className="border p-2 rounded w-full"
              placeholder="Your message"
              rows={5}
              value={form.message}
              onChange={(e) => update("message", e.target.value)}
            />
            <button
              disabled={loading}
              className="bg-black text-white px-5 py-2 rounded disabled:opacity-60"
            >
              {loading ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>

        <div className="bg-black text-white shadow rounded p-8">
          <h2 className="text-xl font-bold">Contact Details</h2>
          <p className="text-white/80 mt-4">Email: hello@albumhub.com</p>
          <p className="text-white/80 mt-2">Location: Sri Lanka</p>

          <div className="mt-8 p-4 rounded bg-white/10">
            <p className="text-sm text-white/80">
              Want a custom version of AlbumHub for your business? We can add:
              booking, payments, gallery categories, user accounts, and more.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

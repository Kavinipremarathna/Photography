import SiteSettings from "../models/SiteSettings.js";

const DEFAULT_KEY = "main";

const getOrCreateSettings = async () => {
  let settings = await SiteSettings.findOne({ key: DEFAULT_KEY });
  if (!settings) {
    settings = await SiteSettings.create({ key: DEFAULT_KEY });
  }
  return settings;
};

export const getSiteSettings = async (_req, res) => {
  const settings = await getOrCreateSettings();
  res.json(settings);
};

export const updateSiteSettings = async (req, res) => {
  const allowedFields = [
    "siteName",
    "logoUrl",
    "home",
    "about",
    "contact",
    "footer",
  ];

  const payload = Object.fromEntries(
    Object.entries(req.body || {}).filter(([key]) =>
      allowedFields.includes(key),
    ),
  );

  const settings = await SiteSettings.findOneAndUpdate(
    { key: DEFAULT_KEY },
    { $set: payload, $setOnInsert: { key: DEFAULT_KEY } },
    { new: true, upsert: true, runValidators: true },
  );

  res.json(settings);
};

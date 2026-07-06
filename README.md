# Photography

Photography album upload and management app with a React frontend and an Express backend.

## Structure

- `frontend/` - Vite + React app
- `backend/` - Express + MongoDB API
- `vercel.json` - deployment config for the frontend/API routing
- `README-ARCHITECTURE.md` - detailed technical overview

## Development

Frontend:

```bash
cd frontend
npm install
npm run dev
```

Backend:

```bash
cd backend
npm install
npm run dev
```

## Notes

- Keep generated frontend output out of version control.
- Use `frontend/.env` or `frontend/.env.development` for local API settings.

## Quick Overview

- Users can browse albums and view album details.
- Admins can add, edit, and delete albums through a secure panel.
- Images are stored through Cloudinary when configured.

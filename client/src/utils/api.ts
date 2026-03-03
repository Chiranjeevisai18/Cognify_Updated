/**
 * Central API configuration.
 * In development: set VITE_API_BASE_URL=http://localhost:5000 in client/.env
 * In production:  set VITE_API_BASE_URL=https://your-backend.onrender.com in Vercel env vars
 */
export const API_BASE_URL =
    import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, '') ?? 'http://localhost:5000';

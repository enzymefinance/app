export const origin =
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : global.location?.origin) ?? "http://127.0.0.1:3000";

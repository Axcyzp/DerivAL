const requiredEnv = (name) => {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
};

export const SUPABASE_URL = requiredEnv("REACT_APP_SUPABASE_URL");
export const SUPABASE_ANON_KEY = requiredEnv("REACT_APP_SUPABASE_ANON_KEY");

export const PUBLIC_PAPER_ROOT =
  process.env.REACT_APP_PUBLIC_PAPER_ROOT ||
  `${SUPABASE_URL}/storage/v1/object/public/past-papers/Past Papers`;

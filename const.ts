export const API_KEY = Deno.env.get("LANGUAGES_URI") ?? "";
export const TRANSLATE_URI = Deno.env.get("TRANSLATE_URI") ??
  "http://localhost:5000/translate";
export const LANGUAGES_URI = Deno.env.get("LANGUAGES_URI") ??
  "http://localhost:5000/languages";

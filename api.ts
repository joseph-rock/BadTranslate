import { API_KEY, LANGUAGES_URI, TRANSLATE_URI } from "./const.ts";

type Language = {
  code: string;
  name: string;
  targets: string[];
};

export type Translate = {
  detectedLanguage: string;
  translatedText: string;
};

export async function translate(
  str: string,
  targetCode: string,
  sourceCode = "auto",
): Promise<Translate> {
  return await fetch(TRANSLATE_URI, {
    method: "POST",
    body: JSON.stringify({
      q: str,
      source: sourceCode,
      target: targetCode,
      format: "text",
      api_key: API_KEY,
    }),
    headers: { "Content-Type": "application/json" },
  })
    .then((res) => res.json())
    .then((res) => {
      return res as Translate;
    });
}

async function getLanguages(): Promise<Language[]> {
  return await fetch(LANGUAGES_URI, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  })
    .then((res) => res.json())
    .then((res) => {
      return res as Language[];
    });
}

export async function getLanguageCodes(): Promise<string[]> {
  return await getLanguages().then((languages) =>
    languages.map((lang) => lang.code)
  );
}

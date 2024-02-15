import { getLanguageCodes, Translate, translate } from "./api.ts";

async function main() {
  const codes = await getLanguageCodes();
  const limit = 2;
  const testString =
    "The greatest glory in living lies not in never falling, but in rising every time we fall.";

  const translation = await translationBlender(testString, codes, limit);
  console.log(translation.translatedText);
}

function randomLanguageCode(codes: string[]): string {
  const randomIndex = Math.floor(Math.random() * codes.length);
  return codes[randomIndex];
}

async function translationBlender(
  str: string,
  codes: string[],
  limit: number,
  sourceCode = "en",
  cycle = 0,
): Promise<Translate> {
  if (cycle >= limit) return await translate(str, "en");
  const targetCode = randomLanguageCode(codes);
  const translation = await translate(str, targetCode, sourceCode);
  return await translationBlender(
    translation.translatedText,
    codes,
    limit,
    translation.detectedLanguage,
    cycle + 1,
  );
}

main();

type Translation = Record<string, TranslationFunction>;

export type TranslationFunction = (...args: any[]) => string;

export default Translation;

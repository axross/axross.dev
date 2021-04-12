import { atomFamily, useRecoilValueLoadable } from "recoil";
import {
  Dictionary,
  fetchTranslationDictionary,
} from "../adapters/translation";

const translationAtom = atomFamily<Dictionary | null, string>({
  key: "Translation",
  default: null,
  effects_UNSTABLE: (locale) => [
    ({ setSelf, resetSelf }) => {
      setSelf(fetchTranslationDictionary(locale));

      return () => resetSelf();
    },
  ],
});

export function useTranslationDictionary(locale: string) {
  const dictionaryLoadable = useRecoilValueLoadable(translationAtom(locale));

  return {
    dictionary: dictionaryLoadable.contents,
    isLoading: dictionaryLoadable.state === "loading",
  };
}

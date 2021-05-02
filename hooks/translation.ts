import { atomFamily, useRecoilValueLoadable } from "recoil";
import {
  Dictionary,
  fetchTranslationDictionary,
} from "../adapters/translation";
import { useRouter } from "../hooks/router";

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

export function useTranslationDictionary() {
  const { locale } = useRouter();

  if (!locale) {
    throw new Error("No locale identifier found in the router.");
  }

  const dictionaryLoadable = useRecoilValueLoadable(translationAtom(locale));

  return {
    dictionary: dictionaryLoadable.contents,
    isLoading: dictionaryLoadable.state === "loading",
  };
}

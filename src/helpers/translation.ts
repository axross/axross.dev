import { type TFunction } from "i18next";

interface Translation {
  t: TFunction;
}

const fallbackNamespace = "common";

export { type TFunction } from "i18next";
export type { Translation };
export { fallbackNamespace };

import LocaleString from "../../entities/LocaleString";

type GetBioByLocale = (params: { locale: LocaleString }) => Promise<string>;

export default GetBioByLocale;

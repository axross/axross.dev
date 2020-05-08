import LocaleString from "../../entities/LocaleString";

type GetWebsitePurpose = (params: { locale: LocaleString }) => Promise<string>;

export default GetWebsitePurpose;

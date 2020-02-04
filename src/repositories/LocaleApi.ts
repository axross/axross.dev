import LocaleString from "../entities/LocaleString";

export default interface LocaleApi {
  getDefaultOne(): Promise<LocaleString>;

  getAllAvailableOnes(): Promise<LocaleString[]>;
}

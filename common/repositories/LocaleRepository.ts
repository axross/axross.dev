import LocaleString from "../entities/LocaleString";

export default interface LocaleRepository {
  getDefaultOne(): Promise<LocaleString>;

  getAllAvailableOnes(): Promise<LocaleString[]>;
}

import { I18nDictionaryService } from "../services/i18n-dictionary";
import { UserMonitoringService } from "../services/user-monitoring";

export interface ServiceContainer {
  i18nDictionary: I18nDictionaryService;
  userMonitoring: UserMonitoringService;
}

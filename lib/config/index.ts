import { en } from "../locales/en";
import { GlobalConfig } from "../types/config";

let globalConfig: GlobalConfig = {
  locale: en,
};

export function setAgendaKitConfig(newConfig: GlobalConfig) {
  globalConfig = { ...globalConfig, ...newConfig };
}

export function getAgendaKitConfig() {
  return globalConfig;
}

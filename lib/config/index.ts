import { pt } from "../locales/pt";
import { GlobalConfig } from "../types/config";

let globalConfig: GlobalConfig = {
  locale: pt,
};

export function setAgendaKitConfig(newConfig: GlobalConfig) {
  globalConfig = { ...globalConfig, ...newConfig };
}

export function getAgendaKitConfig() {
  return globalConfig;
}

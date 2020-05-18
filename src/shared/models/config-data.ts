import { AppConfigSettings } from '../basic/basic-service-impl';

export interface ConfigData<T extends AppConfigSettings> {
  appSettings: T;
  secrets: Secrets;
}

export interface Secrets {
  jwt: string;
}

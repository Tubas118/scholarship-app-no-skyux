import { ValidationContent } from '../auth/services/validation.service';

export const USER_CURRENT_SCHEMA = 2;

export interface LoginDetails extends ValidationContent {
  provider: string;
  email: string;
  name: string;
  image: string;
  signedToken?: string;
}

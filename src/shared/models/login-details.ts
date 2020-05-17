import { ValidationContent } from '../auth/services/validation.service';

export interface LoginDetails extends ValidationContent {
  provider: string;
  email: string;
  name: string;
  image: string;
  signedToken?: string;
}

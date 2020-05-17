import { Injectable } from '@angular/core';
import { UserService } from '../../services/user-service';
import { throwError, Observable, of } from 'rxjs';
import { catchError, mergeMap } from 'rxjs/operators';
import { LoginDetails } from '../../models/login-details';
import { BasicData } from '../../basic/basic-data';

export const INVALID_AUTH_TOKEN = 'invalid auth token';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {
  public currentUser: LoginDetails;

  constructor(private userService: UserService) { }

  public signUser(loginDetails: LoginDetails): LoginDetails {
    this.currentUser = loginDetails;
    console.log('signing token with placeholder');
    loginDetails.signedToken = 'placeholder';
    console.log(`signed? ${loginDetails.signedToken}`);
    return loginDetails;
  }

  public sign(content: LoginDetails): Observable<LoginDetails> {
    const findObservable = this.userService.find(content.id);
    return findObservable.pipe(
      catchError(err => {
        if (err.status === 404) {
          console.log('add new user');
          return this.userService.add(content);
        }
        console.log(err);
        return throwError(err);
      }),
      mergeMap((findUser: LoginDetails) => of(this.signUser(findUser)))
    );
  }

  public verify(token: string): ValidationResponse {
    if (token === 'placeholder') {
      return { verifiedToken: token };
    }
    return { error: INVALID_AUTH_TOKEN };
  }

  // protected findUser(content: LoginDetails): LoginDetails {
  //   return this.userService.find(content.id).pipe(
  //     map((findUser: LoginDetails) => this.signUser(findUser))
  //   );
  // }

  // protected handleError(error: HttpErrorResponse): LoginDetails {
  //   let user: LoginDetails = undefined;
  //   if (error.status === 404) {
  //     // return this.userService.add(content).pipe(
  //     //   map((findUser: LoginDetails) => this.signUser(findUser))
  //     // );
  //   }
  //   return user;
  // }
}

export interface ValidationContent extends BasicData<string> {
  token?: string;
}

export interface ValidationResponse {
  verifiedToken?: string;
  error?: string;
}

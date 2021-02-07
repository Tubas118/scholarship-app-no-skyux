import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { ValidateDeactivation } from "./validate-deactivation";

@Injectable({
  providedIn: 'root'
})
export class ValidateDeactivationGuard implements CanDeactivate<ValidateDeactivation> {
  constructor() { }

  public canDeactivate(component: ValidateDeactivation, currentRoute: ActivatedRouteSnapshot, currentState: RouterStateSnapshot, nextState?: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return (component !== undefined) ? component.isOkayToClose() : true;
  }

}

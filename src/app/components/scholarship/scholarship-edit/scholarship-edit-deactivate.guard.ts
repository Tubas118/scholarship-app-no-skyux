import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { ValidateDeactivation } from "../validate-deactivation";
import { ScholarshipEditComponent } from "./scholarship-edit.component";

@Injectable({
  providedIn: 'root'
})
export class ScholarshipEditDeactivateGuard implements CanDeactivate<ValidateDeactivation> {
  constructor() {
    console.log('ScholarshipEditDeactivateGuard - constructor');
  }

  public canDeactivate(component: ValidateDeactivation, currentRoute: ActivatedRouteSnapshot, currentState: RouterStateSnapshot, nextState?: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    console.log(`checking okay to deactivate: component exists? ${component !== undefined}`);
    return (component !== undefined) ? component.isOkayToClose() : true;
  }

}

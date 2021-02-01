export abstract class ValidateDeactivation {
  public abstract get debugId(): string;
  public abstract get validateForDeactivation(): boolean;

  public get doNotClose(): boolean {
    return false;
  }

  public isOkayToClose(): boolean {
    console.log(`ValidateDeactivation - isOkayToClose for ${this.debugId}`);
    if (this.doNotClose) {
      console.log(`do not close`);
      return false;
    }
    if (this.validateForDeactivation) {
      return window.confirm('There are unsaved changes. Do you want to discard changes?');
    }
    return true;
  }
}

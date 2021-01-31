export abstract class ValidateDeactivation {
  public abstract get debugId(): string;
  public abstract get validateForDeactivation(): boolean;

  public isOkayToClose(): boolean {
    console.log(`ValidateDeactivation - isOkayToClose for ${this.debugId}`);
    if (this.validateForDeactivation) {
      return window.confirm('There are unsaved changes. Do you want to discard changes?');
    }
    return true;
  }
}

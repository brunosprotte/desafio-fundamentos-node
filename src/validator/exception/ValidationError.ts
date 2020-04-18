import ValidationMessage from './ValidationMessage';

class ValidationError {
  errors: ValidationMessage[];

  constructor() {
    this.errors = [];
  }

  public addError({ field, error }: ValidationMessage): void {
    if (field && error) {
      this.errors.push({ field, error });
    }
  }
}
export default ValidationError;

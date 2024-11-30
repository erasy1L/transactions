export class TransactionNotFoundException extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'TransactionNotFoundException';
  }
}

export class TransactionValidationException extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'TransactionValidationException';
  }
}

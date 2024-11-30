"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionValidationException = exports.TransactionNotFoundException = void 0;
class TransactionNotFoundException extends Error {
    constructor(message) {
        super(message);
        this.name = 'TransactionNotFoundException';
    }
}
exports.TransactionNotFoundException = TransactionNotFoundException;
class TransactionValidationException extends Error {
    constructor(message) {
        super(message);
        this.name = 'TransactionValidationException';
    }
}
exports.TransactionValidationException = TransactionValidationException;
//# sourceMappingURL=transaction.exception.js.map
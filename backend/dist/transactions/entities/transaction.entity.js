"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Transaction = void 0;
const swagger_1 = require("@nestjs/swagger");
class Transaction {
}
exports.Transaction = Transaction;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The unique identifier of the transaction',
        example: '123e4567-e89b-12d3-a456-426614174000',
    }),
    __metadata("design:type", String)
], Transaction.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The date of the transaction',
        example: '2024-12-30',
    }),
    __metadata("design:type", Date)
], Transaction.prototype, "dateTime", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The author of the transaction',
        example: 'John Doe',
    }),
    __metadata("design:type", String)
], Transaction.prototype, "author", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The sum of the transaction',
        example: 100.5,
    }),
    __metadata("design:type", Number)
], Transaction.prototype, "sum", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The category of the transaction',
        enum: ['internet', 'gas', 'electricity'],
    }),
    __metadata("design:type", String)
], Transaction.prototype, "category", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Optional comment for the transaction',
        example: 'Weekly grocery shopping',
        required: false,
    }),
    __metadata("design:type", String)
], Transaction.prototype, "comment", void 0);
//# sourceMappingURL=transaction.entity.js.map
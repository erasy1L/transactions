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
exports.CreateTransactionDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class CreateTransactionDto {
}
exports.CreateTransactionDto = CreateTransactionDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The date and time of the transaction',
        example: '2024-12-30',
    }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Date can not be empty' }),
    (0, class_validator_1.IsISO8601)(),
    __metadata("design:type", Date)
], CreateTransactionDto.prototype, "dateTime", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The author of the transaction',
        example: 'John Doe',
    }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Author can not be empty' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateTransactionDto.prototype, "author", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The sum of the transaction',
        example: 100.5,
    }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Sum can not be empty' }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateTransactionDto.prototype, "sum", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The category of the transaction',
        enum: ['internet', 'gas', 'electricity'],
    }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Category can not be empty' }),
    (0, class_validator_1.IsIn)(['internet', 'gas', 'electricity'], {
        message: 'Category values must be either of internet, gas, electricity',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateTransactionDto.prototype, "category", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Optional comment for the transaction',
        example: 'Weekly grocery shopping',
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateTransactionDto.prototype, "comment", void 0);
//# sourceMappingURL=create-transaction.dto.js.map
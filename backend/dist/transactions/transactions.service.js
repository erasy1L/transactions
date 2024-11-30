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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var TransactionsService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionsService = void 0;
const common_1 = require("@nestjs/common");
let TransactionsService = TransactionsService_1 = class TransactionsService {
    constructor(transactionRepository) {
        this.transactionRepository = transactionRepository;
        this.logger = new common_1.Logger(TransactionsService_1.name);
    }
    async create(createTransactionDto) {
        try {
            const transaction = await this.transactionRepository.create(createTransactionDto);
            this.logger.log('Created transaction with ID: ', transaction.id);
            return transaction.id;
        }
        catch (err) {
            this.logger.error('Failed to create transaction', err.stack);
            throw new common_1.InternalServerErrorException();
        }
    }
    async findAll(limit, offset, sortBy, sortOrder) {
        try {
            return await this.transactionRepository.findAll({
                limit,
                offset,
                sortBy,
                sortOrder,
            });
        }
        catch (err) {
            this.logger.error('Failed to fetch transactions', err.stack);
            throw new common_1.InternalServerErrorException();
        }
    }
    async findOne(id) {
        try {
            return await this.transactionRepository.findOneById(id);
        }
        catch (err) {
            this.logger.error(`Failed to find transaction with ID: ${id}`, err.stack);
            if (err.name !== 'TransactionNotFoundException') {
                throw new common_1.InternalServerErrorException();
            }
            throw err;
        }
    }
    async update(id, updateTransactionDto) {
        try {
            return await this.transactionRepository.update(id, updateTransactionDto);
        }
        catch (err) {
            this.logger.error(`Failed to update transaction with ID: ${id}`, err.stack);
            if (err.name !== 'TransactionNotFoundException') {
                throw new common_1.InternalServerErrorException();
            }
            throw err;
        }
    }
    async remove(id) {
        try {
            return await this.transactionRepository.remove(id);
        }
        catch (err) {
            this.logger.error(`Failed to remove transaction with ID: ${id}`, err.stack);
            if (err.name !== 'TransactionNotFoundException') {
                throw new common_1.InternalServerErrorException();
            }
            throw err;
        }
    }
};
exports.TransactionsService = TransactionsService;
exports.TransactionsService = TransactionsService = TransactionsService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('ITransactionRepository')),
    __metadata("design:paramtypes", [Object])
], TransactionsService);
//# sourceMappingURL=transactions.service.js.map
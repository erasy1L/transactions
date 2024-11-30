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
exports.TransactionRepository = void 0;
const common_1 = require("@nestjs/common");
const postgres_service_1 = require("../../postgres/postgres.service");
const transaction_exception_1 = require("../exceptions/transaction.exception");
let TransactionRepository = class TransactionRepository {
    constructor(db) {
        this.db = db;
    }
    async create(data) {
        const query = `
      INSERT INTO transactions(dateTime, author, sum, category, comment)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
    `;
        const result = await this.db.query(query, [
            data.dateTime,
            data.author,
            data.sum,
            data.category,
            data.comment || null,
        ]);
        return result.rows[0];
    }
    async findAll(options) {
        const allowedSortColumns = [
            'id',
            'dateTime',
            'author',
            'sum',
            'category',
            'comment',
        ];
        const sortBy = options.sortBy && allowedSortColumns.includes(options.sortBy)
            ? options.sortBy
            : 'dateTime';
        const sortOrder = options.sortOrder === 'ASC' ? 'ASC' : 'DESC';
        const limit = options.limit || 50;
        const offset = options.offset || 0;
        const query = `
      SELECT id, dateTime, author, sum, category, comment
      FROM transactions
      ORDER BY ${sortBy} ${sortOrder}
      LIMIT $1 OFFSET $2
    `;
        try {
            const result = await this.db.query(query, [limit, offset]);
            return result.rows;
        }
        catch (error) {
            throw new Error('Failed to fetch transactions');
        }
    }
    async findOneById(id) {
        const query = `
      SELECT id, dateTime, author, sum, category, comment
      FROM transactions
      WHERE id = $1
    `;
        const result = await this.db.query(query, [id]);
        if (!result.rows[0]) {
            throw new transaction_exception_1.TransactionNotFoundException(`Transaction with ID ${id} not found`);
        }
        return result.rows[0];
    }
    async update(id, data) {
        const updateFields = [
            'dateTime',
            'author',
            'sum',
            'category',
            'comment',
        ];
        const fieldsToUpdate = updateFields.filter((field) => data[field] !== undefined && data[field] !== null);
        if (fieldsToUpdate.length === 0) {
            throw new transaction_exception_1.TransactionNotFoundException(`No fields to update for transaction ${id}`);
        }
        const sets = fieldsToUpdate.map((field, index) => `${String(field)} = $${index + 1}`);
        const args = fieldsToUpdate.map((field) => data[field]);
        const query = `
      UPDATE transactions
      SET ${sets.join(', ')}
      WHERE id = $${sets.length + 1}
      RETURNING *
    `;
        const result = await this.db.query(query, [...args, id]);
        if (!result.rows[0]) {
            throw new transaction_exception_1.TransactionNotFoundException(`Transaction with ID ${id} not found`);
        }
        return result.rows[0];
    }
    async remove(id) {
        const query = 'DELETE FROM transactions WHERE id = $1';
        const result = await this.db.query(query, [id]);
        if (result.rowCount === 0) {
            throw new transaction_exception_1.TransactionNotFoundException(`Transaction with ID ${id} not found`);
        }
        return true;
    }
};
exports.TransactionRepository = TransactionRepository;
exports.TransactionRepository = TransactionRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [postgres_service_1.PostgresService])
], TransactionRepository);
//# sourceMappingURL=transaction.repository.postgres.js.map
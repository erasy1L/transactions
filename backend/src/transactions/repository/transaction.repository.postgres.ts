import { Injectable } from '@nestjs/common';
import { PostgresService } from 'src/postgres/postgres.service';
import { Transaction } from '../entities/transaction.entity';
import { ITransactionRepository } from './transaction.repository.interface';
import { TransactionNotFoundException } from '../exceptions/transaction.exception';

@Injectable()
export class TransactionRepository implements ITransactionRepository {
  constructor(private readonly db: PostgresService<Transaction>) {}

  async create(data: Transaction): Promise<Transaction> {
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

  async findAll(options?: {
    limit?: number;
    offset?: number;
    sortBy?: keyof Transaction;
    sortOrder?: 'ASC' | 'DESC';
  }): Promise<Transaction[]> {
    const allowedSortColumns: Array<keyof Transaction> = [
      'id',
      'dateTime',
      'author',
      'sum',
      'category',
      'comment',
    ];
    const sortBy =
      options.sortBy && allowedSortColumns.includes(options.sortBy)
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
    } catch (error) {
      throw new Error('Failed to fetch transactions');
    }
  }

  async findOneById(id: string): Promise<Transaction> {
    const query = `
      SELECT id, dateTime, author, sum, category, comment
      FROM transactions
      WHERE id = $1
    `;
    const result = await this.db.query(query, [id]);

    if (!result.rows[0]) {
      throw new TransactionNotFoundException(
        `Transaction with ID ${id} not found`,
      );
    }

    return result.rows[0];
  }

  async update(id: string, data: Partial<Transaction>): Promise<Transaction> {
    const updateFields: (keyof Transaction)[] = [
      'dateTime',
      'author',
      'sum',
      'category',
      'comment',
    ];

    const fieldsToUpdate = updateFields.filter(
      (field) => data[field] !== undefined && data[field] !== null,
    );

    if (fieldsToUpdate.length === 0) {
      throw new TransactionNotFoundException(
        `No fields to update for transaction ${id}`,
      );
    }

    const sets = fieldsToUpdate.map(
      (field, index) => `${String(field)} = $${index + 1}`,
    );

    const args = fieldsToUpdate.map((field) => data[field]);

    const query = `
      UPDATE transactions
      SET ${sets.join(', ')}
      WHERE id = $${sets.length + 1}
      RETURNING *
    `;

    const result = await this.db.query(query, [...args, id]);

    if (!result.rows[0]) {
      throw new TransactionNotFoundException(
        `Transaction with ID ${id} not found`,
      );
    }

    return result.rows[0];
  }

  async remove(id: string): Promise<boolean> {
    const query = 'DELETE FROM transactions WHERE id = $1';
    const result = await this.db.query(query, [id]);

    if (result.rowCount === 0) {
      throw new TransactionNotFoundException(
        `Transaction with ID ${id} not found`,
      );
    }

    return true;
  }
}

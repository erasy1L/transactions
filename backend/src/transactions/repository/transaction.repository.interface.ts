import { Transaction } from '../entities/transaction.entity';

export interface ITransactionRepository {
  create(data: Transaction): Promise<Transaction>;
  findAll(options?: {
    limit?: number;
    offset?: number;
    sortBy?: keyof Transaction;
    sortOrder?: 'ASC' | 'DESC';
  }): Promise<Transaction[]>;
  findOneById(id: string): Promise<Transaction | null>;
  update(id: string, data: Partial<Transaction>): Promise<Transaction | null>;
  remove(id: string): Promise<boolean>;
}

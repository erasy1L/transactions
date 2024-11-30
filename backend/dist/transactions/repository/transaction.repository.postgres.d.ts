import { PostgresService } from 'src/postgres/postgres.service';
import { Transaction } from '../entities/transaction.entity';
import { ITransactionRepository } from './transaction.repository.interface';
export declare class TransactionRepository implements ITransactionRepository {
    private readonly db;
    constructor(db: PostgresService<Transaction>);
    create(data: Transaction): Promise<Transaction>;
    findAll(options?: {
        limit?: number;
        offset?: number;
        sortBy?: keyof Transaction;
        sortOrder?: 'ASC' | 'DESC';
    }): Promise<Transaction[]>;
    findOneById(id: string): Promise<Transaction>;
    update(id: string, data: Partial<Transaction>): Promise<Transaction>;
    remove(id: string): Promise<boolean>;
}

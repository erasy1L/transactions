import { TransactionCategory } from '../entities/transaction.entity';
export declare class CreateTransactionDto {
    dateTime: Date;
    author: string;
    sum: number;
    category: TransactionCategory;
    comment: string;
}

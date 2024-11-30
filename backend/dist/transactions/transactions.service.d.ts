import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { ITransactionRepository } from './repository/transaction.repository.interface';
import { Transaction } from './entities/transaction.entity';
export declare class TransactionsService {
    private readonly transactionRepository;
    private readonly logger;
    constructor(transactionRepository: ITransactionRepository);
    create(createTransactionDto: CreateTransactionDto): Promise<string>;
    findAll(limit?: number, offset?: number, sortBy?: keyof Transaction, sortOrder?: 'ASC' | 'DESC'): Promise<Transaction[]>;
    findOne(id: string): Promise<Transaction | null>;
    update(id: string, updateTransactionDto: UpdateTransactionDto): Promise<Transaction | null>;
    remove(id: string): Promise<boolean>;
}

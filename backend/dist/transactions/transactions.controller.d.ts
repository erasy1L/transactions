import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { Transaction } from './entities/transaction.entity';
export declare class TransactionsController {
    private readonly transactionsService;
    constructor(transactionsService: TransactionsService);
    create(createTransactionDto: CreateTransactionDto): Promise<string>;
    findAll(): Promise<Transaction[]>;
    findOne(id: string): Promise<Transaction>;
    update(id: string, updateTransactionDto: UpdateTransactionDto): Promise<Transaction>;
    remove(id: string): Promise<boolean>;
}

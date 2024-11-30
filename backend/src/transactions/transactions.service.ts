import {
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { ITransactionRepository } from './repository/transaction.repository.interface';
import { Transaction } from './entities/transaction.entity';

@Injectable()
export class TransactionsService {
  private readonly logger = new Logger(TransactionsService.name);

  constructor(
    @Inject('ITransactionRepository')
    private readonly transactionRepository: ITransactionRepository,
  ) {}

  async create(createTransactionDto: CreateTransactionDto): Promise<string> {
    try {
      const transaction =
        await this.transactionRepository.create(createTransactionDto);
      this.logger.log('Created transaction with ID: ', transaction.id);
      return transaction.id;
    } catch (err) {
      this.logger.error('Failed to create transaction', err.stack);
      throw new InternalServerErrorException();
    }
  }

  async findAll(
    limit?: number,
    offset?: number,
    sortBy?: keyof Transaction,
    sortOrder?: 'ASC' | 'DESC',
  ): Promise<Transaction[]> {
    try {
      return await this.transactionRepository.findAll({
        limit,
        offset,
        sortBy,
        sortOrder,
      });
    } catch (err) {
      this.logger.error('Failed to fetch transactions', err.stack);
      throw new InternalServerErrorException();
    }
  }

  async findOne(id: string): Promise<Transaction | null> {
    try {
      return await this.transactionRepository.findOneById(id);
    } catch (err) {
      this.logger.error(`Failed to find transaction with ID: ${id}`, err.stack);

      if (err.name !== 'TransactionNotFoundException') {
        throw new InternalServerErrorException();
      }
      throw err;
    }
  }

  async update(
    id: string,
    updateTransactionDto: UpdateTransactionDto,
  ): Promise<Transaction | null> {
    try {
      return await this.transactionRepository.update(id, updateTransactionDto);
    } catch (err) {
      this.logger.error(
        `Failed to update transaction with ID: ${id}`,
        err.stack,
      );

      if (err.name !== 'TransactionNotFoundException') {
        throw new InternalServerErrorException();
      }

      throw err;
    }
  }

  async remove(id: string): Promise<boolean> {
    try {
      return await this.transactionRepository.remove(id);
    } catch (err) {
      this.logger.error(
        `Failed to remove transaction with ID: ${id}`,
        err.stack,
      );

      if (err.name !== 'TransactionNotFoundException') {
        throw new InternalServerErrorException();
      }

      throw err;
    }
  }
}

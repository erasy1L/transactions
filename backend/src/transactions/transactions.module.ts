import { Module } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionsController } from './transactions.controller';
import { TransactionRepository } from './repository/transaction.repository.postgres';
import { PostgresModule } from 'src/postgres/postgres.module';

@Module({
  imports: [PostgresModule],
  controllers: [TransactionsController],
  providers: [
    TransactionsService,
    {
      provide: 'ITransactionRepository',
      useClass: TransactionRepository,
    },
  ],
})
export class TransactionsModule {}

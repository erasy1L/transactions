import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TransactionsModule } from './transactions/transactions.module';
import { PostgresModule } from './postgres/postgres.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TransactionsModule,
    PostgresModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

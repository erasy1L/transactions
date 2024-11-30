import {
  IsDate,
  IsIn,
  IsISO8601,
  IsNotEmpty,
  IsNotIn,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { TransactionCategory } from '../entities/transaction.entity';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTransactionDto {
  @ApiProperty({
    description: 'The date and time of the transaction',
    example: '2024-12-30',
  })
  @IsNotEmpty({ message: 'Date can not be empty' })
  @IsISO8601()
  dateTime: Date;

  @ApiProperty({
    description: 'The author of the transaction',
    example: 'John Doe',
  })
  @IsNotEmpty({ message: 'Author can not be empty' })
  @IsString()
  author: string;

  @ApiProperty({
    description: 'The sum of the transaction',
    example: 100.5,
  })
  @IsNotEmpty({ message: 'Sum can not be empty' })
  @IsNumber()
  sum: number;

  @ApiProperty({
    description: 'The category of the transaction',
    enum: ['internet', 'gas', 'electricity'],
  })
  @IsNotEmpty({ message: 'Category can not be empty' })
  @IsIn(
    ['internet', 'gas', 'electricity'] as const satisfies TransactionCategory[],
    {
      message: 'Category values must be either of internet, gas, electricity',
    },
  )
  @IsString()
  category: TransactionCategory;

  @ApiProperty({
    description: 'Optional comment for the transaction',
    example: 'Weekly grocery shopping',
    required: false,
  })
  @IsOptional()
  @IsString()
  comment: string;
}

import { ApiProperty } from '@nestjs/swagger';

export class Transaction {
  @ApiProperty({
    description: 'The unique identifier of the transaction',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  id?: string;

  @ApiProperty({
    description: 'The date of the transaction',
    example: '2024-12-30',
  })
  dateTime: Date;

  @ApiProperty({
    description: 'The author of the transaction',
    example: 'John Doe',
  })
  author: string;

  @ApiProperty({
    description: 'The sum of the transaction',
    example: 100.5,
  })
  sum: number;

  @ApiProperty({
    description: 'The category of the transaction',
    enum: ['internet', 'gas', 'electricity'],
  })
  category: TransactionCategory;

  @ApiProperty({
    description: 'Optional comment for the transaction',
    example: 'Weekly grocery shopping',
    required: false,
  })
  comment: string;
}

export type TransactionCategory = 'internet' | 'gas' | 'electricity';

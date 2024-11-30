import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
} from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
} from '@nestjs/swagger';
import { Transaction } from './entities/transaction.entity';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new transaction' })
  @ApiBody({ type: CreateTransactionDto })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Transaction has been successfully created.',
    type: String,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid input data.',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server error.',
  })
  create(@Body() createTransactionDto: CreateTransactionDto) {
    return this.transactionsService.create(createTransactionDto);
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all transactions' })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
    description: 'Number of transactions to return',
    default: 50,
  })
  @ApiQuery({
    name: 'offset',
    required: false,
    type: Number,
    description: 'Number of transactions to skip',
    default: 0,
  })
  @ApiQuery({
    name: 'sortBy',
    required: false,
    type: String,
    enum: ['dateTime', 'author', 'sum', 'category'],
    description: 'Field to sort by',
    schema: { default: 'dateTime' },
  })
  @ApiQuery({
    name: 'sortOrder',
    required: false,
    type: String,
    enum: ['ASC', 'DESC'],
    description: 'Sort order',
    schema: { default: 'DESC' },
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'List of transactions retrieved successfully.',
    type: [Transaction],
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server error.',
  })
  findAll() {
    return this.transactionsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a transaction by ID' })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'Transaction ID',
    required: true,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Transaction retrieved successfully.',
    type: Transaction,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Transaction not found.',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server error.',
  })
  findOne(@Param('id') id: string) {
    return this.transactionsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a transaction by ID' })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'Transaction ID',
    required: true,
  })
  @ApiBody({ type: UpdateTransactionDto })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Transaction updated successfully.',
    type: Transaction,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Transaction not found.',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid input data.',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server error.',
  })
  update(
    @Param('id') id: string,
    @Body() updateTransactionDto: UpdateTransactionDto,
  ) {
    return this.transactionsService.update(id, updateTransactionDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a transaction by ID' })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'Transaction ID',
    required: true,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Transaction deleted successfully.',
    type: Boolean,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Transaction not found.',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server error.',
  })
  remove(@Param('id') id: string) {
    return this.transactionsService.remove(id);
  }
}

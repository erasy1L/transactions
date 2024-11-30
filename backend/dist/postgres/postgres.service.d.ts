import { OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { QueryResult } from 'pg';
export declare class PostgresService<T> implements OnModuleInit, OnModuleDestroy {
    private configService;
    private pool;
    constructor(configService: ConfigService);
    onModuleInit(): void;
    query(text: string, params?: any[]): Promise<QueryResult<T>>;
    onModuleDestroy(): Promise<void>;
}

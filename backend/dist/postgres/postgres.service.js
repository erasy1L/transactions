"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostgresService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const pg_1 = require("pg");
let PostgresService = class PostgresService {
    constructor(configService) {
        this.configService = configService;
    }
    onModuleInit() {
        this.pool = new pg_1.Pool({
            user: this.configService.get('DATABASE_USER'),
            host: this.configService.get('DATABASE_HOST'),
            database: this.configService.get('DATABASE_NAME'),
            password: this.configService.get('DATABASE_PASSWORD'),
            port: this.configService.get('DATABASE_PORT'),
        });
    }
    async query(text, params) {
        return this.pool.query(text, params);
    }
    async onModuleDestroy() {
        await this.pool.end();
    }
};
exports.PostgresService = PostgresService;
exports.PostgresService = PostgresService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], PostgresService);
//# sourceMappingURL=postgres.service.js.map
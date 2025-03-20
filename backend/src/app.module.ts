import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { CustomersModule } from './modules/customers/customers.module';
import { SuppliersModule } from './modules/suppliers/suppliers.module';
import { QuotesModule } from './modules/quotes/quotes.module';
import { OrdersModule } from './modules/orders/order.module';
// import { InvoicesModule } from './domains/invoices/invoices.module';
import { getDatabaseConfig } from './config/database.config';
import { PurchaseOrdersModule } from './modules/purchase-orders/purchase-orders.module';
import { InventoryModule } from './modules/inventory/inventory.module';
import * as crypto from 'crypto';
(global as any).crypto = crypto;

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) =>
        getDatabaseConfig(configService),
      inject: [ConfigService],
    }),
    AuthModule,
    CustomersModule,
    SuppliersModule,
    PurchaseOrdersModule,
    InventoryModule,
    QuotesModule,
    OrdersModule,
    // InvoicesModule,
  ],
})
export class AppModule {}

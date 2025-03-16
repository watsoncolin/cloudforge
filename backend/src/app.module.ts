import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { CustomersModule } from './modules/customers/customers.module';
import { SuppliersModule } from './modules/suppliers/suppliers.module';
// import { InventoryModule } from './domains/inventory/inventory.module';
// import { QuotesModule } from './domains/quotes/quotes.module';
// import { OrdersModule } from './domains/orders/orders.module';
// import { InvoicesModule } from './domains/invoices/invoices.module';
// import { SharedModule } from './shared/shared.module';
import { databaseConfig } from './config/database.config';
import { PurchaseOrdersModule } from './modules/purchase-orders/purchase-orders.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(databaseConfig),
    // SharedModule,
    AuthModule,
    CustomersModule,
    SuppliersModule,
    PurchaseOrdersModule,
    // InventoryModule,
    // QuotesModule,
    // OrdersModule,
    // InvoicesModule,
  ],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CoreModule } from '../core/core.module';
import { RFQService } from './rfq.service';
import { RFQRepository } from './repositories/rfq.repository';
import { RFQMapper } from './mappers/rfq.mapper';
import { RFQController } from './controllers/rfq.controller';
import { RFQEntity } from './entities/rfq.entity';
import { CreateRFQHandler } from './commands/create-rfq/create-rfq.handler';
import { DeleteRFQHandler } from './commands/delete-rfq/delete-rfq.handler';
import { UpdateRFQHandler } from './commands/update-rfq/update-rfq.handler';
import { RFQItemMapper } from './mappers/rfq-item.mapper';
import { CustomersModule } from '../customers/customers.module';
import { InventoryModule } from '../inventory/inventory.module';
import { QuoteRepository } from './repositories/quote.repository';
import { QuoteEntity } from './entities/quote.entity';
import { QuoteMapper } from './mappers/quote.mapper';
import { QuoteItemMapper } from './mappers/quote-item.mapper';
import { QuoteController } from './controllers/quotes.controller';
import { GetAllQuotesForCustomerHandler } from './queries/get-all-quotes-for-customer/get-all-quotes-for-customer.handler';
import { GetAllQuotesHandler } from './queries/get-all-quotes/get-all-quotes.handler';
import { GetQuoteByIdHandler } from './queries/get-quote-by-id/get-quote-by-id.handler';
import { GetAllRFQsForCustomerHandler } from './queries/get-all-rfqs-for-customer/get-all-rfqs-for-customer.handler';
import { GetAllRFQsHandler } from './queries/get-all-rfqs/get-all-rfqs.handler';
import { GetRFQByIdHandler } from './queries/get-rfq-by-id/get-rfq-by-id.handler';
import { ConvertToQuoteHandler } from './commands/convert-to-quote/convert-to-quote.handler';
import { QuoteService } from './quote.service';
import { UpdateQuoteStatusHandler } from './commands/update-quote-status/update-quote-status.handler';
import { AIService } from './ai.service';

const CommandHandlers = [
  ConvertToQuoteHandler,
  CreateRFQHandler,
  UpdateRFQHandler,
  DeleteRFQHandler,
  UpdateQuoteStatusHandler,
];

const QueryHandlers = [
  GetQuoteByIdHandler,
  GetAllQuotesHandler,
  GetAllQuotesForCustomerHandler,
  GetAllRFQsHandler,
  GetAllRFQsForCustomerHandler,
  GetRFQByIdHandler,
];

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([RFQEntity, QuoteEntity]),
    CoreModule,
    CustomersModule,
    InventoryModule,
  ],
  controllers: [RFQController, QuoteController],
  providers: [
    RFQRepository,
    QuoteRepository,
    RFQService,
    RFQMapper,
    RFQItemMapper,
    QuoteMapper,
    QuoteItemMapper,
    QuoteService,
    AIService,
    ...CommandHandlers,
    ...QueryHandlers,
  ],
  exports: [RFQService, QuoteService, AIService],
})
export class QuotesModule {}

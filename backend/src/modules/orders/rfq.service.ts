import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { RFQ } from 'src/domain/quote/rfq';
import { CreateRFQDto } from './dtos/create-rfq.dto';
import { CreateRFQCommand } from './commands/create-rfq/create-rfq.command';
import { UpdateRFQCommand } from './commands/update-rfq/update-rfq.command';
import { UpdateRFQDto } from './dtos/update-rfq.dto';
import { DeleteRFQCommand } from './commands/delete-rfq/delete-rfq.command';
import { ConvertToQuoteCommand } from './commands/convert-to-quote/convert-to-quote.command';
import { Quote } from 'src/domain/quote/quote';
import { GetAllRFQsQuery } from './queries/get-all-rfqs/get-all-rfqs.query';
import { GetRFQByIdQuery } from './queries/get-rfq-by-id/get-rfq-by-id.query';

@Injectable()
export class RFQService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  create(createRfqDto: CreateRFQDto): Promise<RFQ> {
    return this.commandBus.execute(new CreateRFQCommand(createRfqDto));
  }

  findAll(): Promise<RFQ[]> {
    return this.queryBus.execute(new GetAllRFQsQuery());
  }

  findOne(id: string): Promise<RFQ> {
    return this.queryBus.execute(new GetRFQByIdQuery(id));
  }

  update(id: string, updateRfqDto: UpdateRFQDto): Promise<RFQ> {
    return this.commandBus.execute(new UpdateRFQCommand(id, updateRfqDto));
  }

  remove(id: string): Promise<void> {
    return this.commandBus.execute(new DeleteRFQCommand(id));
  }

  convertToQuote(id: string): Promise<Quote> {
    return this.commandBus.execute(new ConvertToQuoteCommand(id));
  }
}

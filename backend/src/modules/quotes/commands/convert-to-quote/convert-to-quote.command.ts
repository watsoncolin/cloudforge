import { CreateRFQDto } from '../../dtos/create-rfq.dto';

export class ConvertToQuoteCommand {
  constructor(public readonly id: string) {}
}

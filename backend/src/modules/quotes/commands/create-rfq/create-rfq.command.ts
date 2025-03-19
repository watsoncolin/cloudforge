import { CreateRFQDto } from '../../dtos/create-rfq.dto';

export class CreateRFQCommand {
  constructor(public readonly createRFQDto: CreateRFQDto) {}
}

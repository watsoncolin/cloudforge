import { UpdateRFQDto } from '../../dtos/update-rfq.dto';

export class UpdateRFQCommand {
  constructor(
    public readonly id: string,
    public readonly updateRFQDto: UpdateRFQDto,
  ) {}
}

import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { NotFoundException, ConflictException } from '@nestjs/common';
import { UpdateRFQCommand } from './update-rfq.command';
import { RFQRepository } from '../../repositories/rfq.repository';
import { RFQ } from 'src/domain/quote/rfq';

@CommandHandler(UpdateRFQCommand)
export class UpdateRFQHandler implements ICommandHandler<UpdateRFQCommand> {
  constructor(private readonly rfqRepository: RFQRepository) {}

  async execute(command: UpdateRFQCommand): Promise<RFQ> {
    const rfq = await this.rfqRepository.findById(command.id);
    if (!rfq) {
      throw new NotFoundException(`RFQ with ID "${command.id}" not found`);
    }

    const updatedRFQ = rfq.update(command.updateRFQDto);

    return this.rfqRepository.update(command.id, updatedRFQ);
  }
}

import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { NotFoundException } from '@nestjs/common';
import { DeleteRFQCommand } from './delete-rfq.command';
import { RFQRepository } from '../../repositories/rfq.repository';

@CommandHandler(DeleteRFQCommand)
export class DeleteRFQHandler implements ICommandHandler<DeleteRFQCommand> {
  constructor(private readonly rfqRepository: RFQRepository) {}

  async execute(command: DeleteRFQCommand): Promise<void> {
    const rfq = await this.rfqRepository.findById(command.id);
    if (!rfq) {
      throw new NotFoundException(`RFQ with ID "${command.id}" not found`);
    }

    // TODO: check the status of the RFQ, if it is not pending, throw an error

    await this.rfqRepository.delete(command.id);
  }
}

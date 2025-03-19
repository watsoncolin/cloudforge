import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { v4 as uuidv4 } from 'uuid';
import { SequenceService } from '../../../core/sequence/services/sequence.service';
import { CreateRFQCommand } from './create-rfq.command';
import { RFQRepository } from '../../repositories/rfq.repository';
import { RFQ } from 'src/domain/quote/rfq';

@CommandHandler(CreateRFQCommand)
export class CreateRFQHandler implements ICommandHandler<CreateRFQCommand> {
  constructor(
    private readonly rfqRepository: RFQRepository,
    private readonly sequenceService: SequenceService,
  ) {}

  async execute(command: CreateRFQCommand): Promise<RFQ> {
    // TODO: Add pricing service to set the prices

    const id = uuidv4();

    const rfq: RFQ = new RFQ(
      id,
      await this.sequenceService.getNextSequenceNumber('RFQ'),
      command.createRFQDto.customerId,
      command.createRFQDto.items.map((item) => ({
        id: uuidv4(),
        rfqId: id,
        materialType: item.materialType,
        grade: item.grade,
        dimensions: item.dimensions,
        quantity: item.quantity,
        unitOfMeasure: item.unitOfMeasure,
        createdAt: new Date(),
        updatedAt: new Date(),
        price: item.price,
        total: item.total,
      })),
      command.createRFQDto.status,
      command.createRFQDto.source,
      new Date(),
      new Date(),
      command.createRFQDto.notes,
    );

    return this.rfqRepository.create(rfq);
  }
}

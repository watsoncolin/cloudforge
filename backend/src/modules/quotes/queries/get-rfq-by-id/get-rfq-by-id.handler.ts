import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { NotFoundException } from '@nestjs/common';
import { GetRFQByIdQuery } from './get-rfq-by-id.query';
import { RFQRepository } from '../../repositories/rfq.repository';
import { RFQ } from 'src/domain/quote/rfq';

@QueryHandler(GetRFQByIdQuery)
export class GetRFQByIdHandler implements IQueryHandler<GetRFQByIdQuery> {
  constructor(private readonly rfqRepository: RFQRepository) {}

  async execute(query: GetRFQByIdQuery): Promise<RFQ> {
    const rfq = await this.rfqRepository.findById(query.id);
    if (!rfq) {
      throw new NotFoundException(`RFQ with ID "${query.id}" not found`);
    }
    return rfq;
  }
}

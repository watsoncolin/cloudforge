import { QueryHandler } from '@nestjs/cqrs';

import { IQueryHandler } from '@nestjs/cqrs';
import { GetAllRFQsQuery } from './get-all-rfqs.query';
import { RFQRepository } from '../../repositories/rfq.repository';
import { RFQ } from 'src/domain/quote/rfq';

@QueryHandler(GetAllRFQsQuery)
export class GetAllRFQsHandler implements IQueryHandler<GetAllRFQsQuery> {
  constructor(private readonly rfqRepository: RFQRepository) {}

  async execute(): Promise<RFQ[]> {
    return this.rfqRepository.findAll();
  }
}

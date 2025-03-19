import { QueryHandler } from '@nestjs/cqrs';

import { IQueryHandler } from '@nestjs/cqrs';
import { GetAllRFQsForCustomerQuery } from './get-all-rfqs-for-customer.query';
import { RFQRepository } from '../../repositories/rfq.repository';
import { RFQ } from 'src/domain/quote/rfq';

@QueryHandler(GetAllRFQsForCustomerQuery)
export class GetAllRFQsForCustomerHandler
  implements IQueryHandler<GetAllRFQsForCustomerQuery>
{
  constructor(private readonly rfqRepository: RFQRepository) {}

  async execute(query: GetAllRFQsForCustomerQuery): Promise<RFQ[]> {
    return this.rfqRepository.findAllForCustomer(query.customerId);
  }
}

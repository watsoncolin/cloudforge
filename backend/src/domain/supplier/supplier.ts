import { PaymentTerms } from 'src/enums/payment-terms.enum';
import { Address } from '../value-objects';
import { Contact } from '../value-objects';

export class Supplier {
  id: string;

  name: string;

  contact: Contact;

  address: Address;

  paymentTerms: PaymentTerms;

  isActive: boolean;

  createdAt: Date;

  updatedAt: Date;
}

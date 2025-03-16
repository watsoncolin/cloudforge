import { Contact, Address } from '../value-objects';
import { PaymentTerms } from '../../enums/payment-terms.enum';

export class Customer {
  id: string;

  name: string;

  contact: Contact;

  address: Address;

  paymentTerms: PaymentTerms;

  createdAt: Date;

  updatedAt: Date;
}

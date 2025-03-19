import { Contact, Address } from '../value-objects';
import { PaymentTerm } from 'src/enums';

export class Customer {
  id: string;
  readableId: string;
  name: string;
  contact: Contact;
  address: Address;
  paymentTerm: PaymentTerm;
  createdAt: Date;
  updatedAt: Date;
}

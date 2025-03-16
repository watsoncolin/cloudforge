import { PaymentTerm, Material } from 'src/enums';
import { Address } from '../value-objects';
import { Contact } from '../value-objects';

export class Supplier {
  id: string;
  name: string;
  contact: Contact;
  address: Address;
  paymentTerm: PaymentTerm;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  materials: Material[];
}

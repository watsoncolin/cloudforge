import { PaymentTerm, Material } from 'src/enums';
import { Address } from '../value-objects';
import { Contact } from '../value-objects';
import { InventoryBatch } from '../inventory/inventory-batch';

export class Supplier {
  id: string;
  readableId: string;
  name: string;
  contact: Contact;
  address: Address;
  paymentTerm: PaymentTerm;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  materials: Material[];
  batches: InventoryBatch[];
}

import { Inventory } from '../inventory/inventory';
import { Material, UnitOfMeasure } from 'src/enums';

export class OrderItem {
  id: string;
  orderId: string;
  inventoryId: string;
  batchIds: string[];
  quantity: number;
  unitOfMeasure: UnitOfMeasure;
  price: number;
  total: number;
}

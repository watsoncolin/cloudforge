import { UnitOfMeasure } from 'src/enums';

export class PurchaseOrderItem {
  id: string;
  materialType: string;
  grade: string;
  dimensions: {
    thickness: number;
    width: number;
    length?: number;
  };
  quantity: number;
  unitOfMeasure: UnitOfMeasure;
  unitPrice: number;
  totalPrice: number;
}

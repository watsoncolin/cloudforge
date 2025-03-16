import { Material, UnitOfMeasure } from 'src/enums';

export class PurchaseOrderItem {
  id: string;
  materialType: Material;
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

import { Material, ProcessingType, UnitOfMeasure } from 'src/enums';
import { Dimensions } from '../value-objects/dimensions';

export class RFQItem {
  id: string;
  rfqId: string;
  materialType: Material;
  processingType: ProcessingType;
  grade: string;
  dimensions: Dimensions;
  unitOfMeasure: UnitOfMeasure;
  quantity: number;
  price?: number;
  total?: number;
}

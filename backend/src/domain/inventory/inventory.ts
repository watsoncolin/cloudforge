import { Material, UnitOfMeasure } from 'src/enums';
import { Dimensions } from '../value-objects';

export class Inventory {
  id: string;
  materialType: Material;
  grade: string;
  dimensions: Dimensions;
  unitOfMeasure: UnitOfMeasure;
  createdAt: Date;
}

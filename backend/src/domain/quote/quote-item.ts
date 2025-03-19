import { Material, UnitOfMeasure } from 'src/enums';
import { Dimensions } from '../value-objects/dimensions';

export class QuoteItem {
  constructor(
    public readonly id: string,
    public readonly quoteId: string,
    public readonly materialType: Material,
    public readonly grade: string,
    public readonly dimensions: Dimensions,
    public readonly quantity: number,
    public readonly unitOfMeasure: UnitOfMeasure,
    public readonly price: number,
    public readonly total: number,
  ) {}
}

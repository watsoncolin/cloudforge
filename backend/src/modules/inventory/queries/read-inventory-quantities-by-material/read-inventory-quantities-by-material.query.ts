import { IQuery } from '@nestjs/cqrs';
import { Dimensions } from 'src/domain/value-objects';
import { Material } from 'src/enums';

// TODO add pagination
export class ReadInventoryByMaterialQuery implements IQuery {
  constructor(
    public readonly materialType: Material,
    public readonly grade: string,
    public readonly dimensions: Dimensions,
  ) {}
}

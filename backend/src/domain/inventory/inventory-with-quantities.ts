import { Inventory } from './inventory';
import { Quantities } from './quantities';

export class InventoryWithQuantities extends Inventory {
  quantities: Quantities;
}

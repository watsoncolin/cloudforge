export enum InventoryEventType {
  RECEIVED = 'RECEIVED', // Increases available quantity
  SHIPPED = 'SHIPPED', // Decreases available quantity
  ADJUSTED = 'ADJUSTED', // Increases or decreases available quantity
  ALLOCATED = 'ALLOCATED', // Decreases available quantity
}

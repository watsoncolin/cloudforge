import { OrderStatus } from 'src/enums';
import { OrderItem } from './order-item';

export class Order {
  id: string;
  readableId: string;
  quoteId: string;
  customerId: string;
  items: OrderItem[];
  status: OrderStatus;
  createdAt: Date;
  updatedAt: Date;
}

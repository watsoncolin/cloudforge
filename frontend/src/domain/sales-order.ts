import { Customer } from "./customer";
import { QuoteItem } from "./quote";

export interface SalesOrder {
  orderId: string;
  quoteId: string;
  customer: Customer;
  orderDate: string;
  status: "Pending" | "Processing" | "Shipped" | "Completed";
  items: SalesOrderItem[];
  totalPrice: number;
  currency: string;
  trackingNumber?: string;
  shippingDate?: string;
  deliveryDate?: string;
  createdAt: string;
  updatedAt?: string;
}

export interface SalesOrderItem extends QuoteItem {
  allocatedBatches: InventoryAllocation[]; // Tracks assigned inventory
}

export interface InventoryAllocation {
  batchId: string;
  allocatedQuantity: number; // Amount reserved from this batch
}

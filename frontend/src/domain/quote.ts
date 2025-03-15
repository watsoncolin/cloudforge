import { Customer } from "./customer";
import { MaterialType } from "./enums.ts/materialTypes.enum";
import { Units } from "./enums.ts/units.enum";

export interface Quote {
  quoteId: string;
  rfqId?: string;
  customer: Customer;
  quoteDate: string;
  expirationDate: string;
  status: "Draft" | "Pending Approval" | "Approved" | "Rejected" | "Converted to Order";
  items: QuoteItem[];
  subtotal: number;
  taxRate: number;
  taxAmount: number;
  totalPrice: number;
  currency: string;
  notes?: string;
  convertedOrderId?: string;
  createdAt: string;
  updatedAt?: string;
}

export interface QuoteItem {
  lineItemId: string;
  materialType: MaterialType;
  grade: string;
  dimensions: {
    thickness: number;
    width: number;
    length?: number;
  };
  quantity: number;
  unitOfMeasure: Units;
  stockAvailability: "Available" | "Needs Sourcing";
  basePrice: number; // System default price per unit
  adjustedPrice?: number; // Manually adjusted price
  volumeDiscount?: number; // Discount percentage for bulk orders
  customerSpecificPrice?: number; // Special rate for certain customers
  finalPrice: number; // Actual price used in the quote
  totalPrice: number; // Total price for the item
}

import { Customer } from "./customer";
import { MaterialType } from "./enums.ts/materialTypes.enum";
import { Units } from "./enums.ts/units.enum";

export interface Invoice {
  invoiceId: string; // "INV-20240316-001"
  orderId: string; // "SO-20240316-001" (Linked to Sales Order)
  customer: Customer;
  invoiceDate: string;
  dueDate: string;
  status: "Pending" | "Paid" | "Overdue";
  items: InvoiceItem[];
  subtotal: number;
  taxRate: number;
  taxAmount: number;
  totalPrice: number;
  currency: string;
  payments: Payment[];
  createdAt: string;
  updatedAt?: string;
}

export interface InvoiceItem {
  lineItemId: string;
  materialType: MaterialType;
  grade: string;
  dimensions: {
    thickness: number;
    width: number;
    length: number;
  };
  quantity: number;
  unitOfMeasure: Units;
  unitPrice: number;
  totalPrice: number;
}

export interface Payment {
  paymentId: string;
  invoiceId: string;
  paymentDate: string;
  amountPaid: number;
  paymentMethod: "Bank Transfer" | "Credit Card" | "Check" | "Wire Transfer";
  transactionReference?: string;
}

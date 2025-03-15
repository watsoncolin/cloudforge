import { Customer } from "./customer";
import { MaterialType } from "./enums.ts/materialTypes.enum";
import { Units } from "./enums.ts/units.enum";

export interface RFQ {
  rfqId: string;
  source: "Uploaded" | "Manual"; // Track if RFQ was uploaded or manually entered
  customer: Customer;
  receivedDate: string;
  extractedData?: RFQExtractedData; // Only for AI-extracted RFQs
  materials: RFQMaterial[];
  itemsRequested: number;
  status: "Pending" | "In Progress" | "Converted" | "Rejected";
  convertedQuoteId?: string;
  notes?: string;
  createdAt: string;
  updatedAt?: string;
}

export interface RFQExtractedData {
  source: "Uploaded" | "Email";
  fileUrl?: string; // Only for uploaded RFQs
  materials: RFQMaterial[];
  extractionConfidence: number; // AI confidence score (0-100%)
}

export interface RFQMaterial {
  lineItemId: string; // Unique identifier for this line item
  materialType: MaterialType; // Steel, Aluminum, Copper, etc.
  grade: string; // ASTM A36, 6061-T6, etc.
  dimensions: {
    thickness: number; // Thickness in inches
    width: number; // Width in inches
    length?: number; // Length in inches (nullable for coils)
  };
  quantity: number; // Number of units requested
  unitOfMeasure: Units; // Measurement unit
  requiredDate: string; // When the customer needs the material
  status: "Pending" | "Available" | "Needs Sourcing"; // Inventory status
}

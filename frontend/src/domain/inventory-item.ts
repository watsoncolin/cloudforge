import { MaterialType } from "./enums.ts/materialTypes.enum";
import { Units } from "./enums.ts/units.enum";

export interface InventoryItem {
  id: number;
  materialType: MaterialType;
  grade: string;
  dimensions: {
    thickness: string;
    width: string;
    length: string;
  };
  unitOfMeasure: Units;
  totalStock: number;
  availableStock: number;
  allocatedStock: number;
  reorderStatus: "Good" | "Low Stock" | "Critical";
  warehouseLocation: {
    warehouse: string;
    zone: string;
    bin: string;
  };
  batches: {
    id: number;
    supplierId: string;
    purchaseOrderId: string;
    batchNumber: string;
    heatNumber: string;
    millCertification: string;
    createdAt: string;
    totalStock: number;
    availableStock: number;
    allocatedStock: number;
    qualityIssues: boolean;
  }[];
}

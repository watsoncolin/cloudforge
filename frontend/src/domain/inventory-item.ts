export interface InventoryItem {
  id: number;
  materialType: string;
  grade: string;
  dimensions: {
    thickness: string;
    width: string;
    length: string;
  };
  unitOfMeasure: string;
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

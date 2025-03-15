import { MaterialType } from "./domain/enums.ts/materialTypes.enum";
import { Units } from "./domain/enums.ts/units.enum";
import { InventoryItem } from "./domain/inventory-item";
import { Invoice } from "./domain/invoice";
import { Quote } from "./domain/quote";
import { RFQ } from "./domain/rfq";
import { SalesOrder } from "./domain/sales-order";
import { Supplier } from "./domain/supplier";

export async function getRecentOrders() {
  return (await getSalesOrders()).slice(0, 10);
}

export async function getEvents() {
  return [
    {
      id: 1000,
      name: "Bear Hug: Live in Concert",
      url: "/events/1000",
      date: "May 20, 2024",
      time: "10 PM",
      location: "Harmony Theater, Winnipeg, MB",
      totalRevenue: "$102,552",
      totalRevenueChange: "+3.2%",
      ticketsAvailable: 500,
      ticketsSold: 350,
      ticketsSoldChange: "+8.1%",
      pageViews: "24,300",
      pageViewsChange: "-0.75%",
      status: "On Sale",
      imgUrl: "/events/bear-hug.jpg",
      thumbUrl: "/events/bear-hug-thumb.jpg",
    },
    {
      id: 1001,
      name: "Six Fingers — DJ Set",
      url: "/events/1001",
      date: "Jun 2, 2024",
      time: "8 PM",
      location: "Moonbeam Arena, Uxbridge, ON",
      totalRevenue: "$24,115",
      totalRevenueChange: "+3.2%",
      ticketsAvailable: 150,
      ticketsSold: 72,
      ticketsSoldChange: "+8.1%",
      pageViews: "57,544",
      pageViewsChange: "-2.5%",
      status: "On Sale",
      imgUrl: "/events/six-fingers.jpg",
      thumbUrl: "/events/six-fingers-thumb.jpg",
    },
    {
      id: 1002,
      name: "We All Look The Same",
      url: "/events/1002",
      date: "Aug 5, 2024",
      time: "4 PM",
      location: "Electric Coliseum, New York, NY",
      totalRevenue: "$40,598",
      totalRevenueChange: "+3.2%",
      ticketsAvailable: 275,
      ticketsSold: 275,
      ticketsSoldChange: "+8.1%",
      pageViews: "122,122",
      pageViewsChange: "-8.0%",
      status: "Closed",
      imgUrl: "/events/we-all-look-the-same.jpg",
      thumbUrl: "/events/we-all-look-the-same-thumb.jpg",
    },
    {
      id: 1003,
      name: "Viking People",
      url: "/events/1003",
      date: "Dec 31, 2024",
      time: "8 PM",
      location: "Tapestry Hall, Cambridge, ON",
      totalRevenue: "$3,552",
      totalRevenueChange: "+3.2%",
      ticketsAvailable: 40,
      ticketsSold: 6,
      ticketsSoldChange: "+8.1%",
      pageViews: "9,000",
      pageViewsChange: "-0.15%",
      status: "On Sale",
      imgUrl: "/events/viking-people.jpg",
      thumbUrl: "/events/viking-people-thumb.jpg",
    },
  ];
}

export function getCountries() {
  return [
    {
      name: "Canada",
      code: "CA",
      flagUrl: "/flags/ca.svg",
      regions: [
        "Alberta",
        "British Columbia",
        "Manitoba",
        "New Brunswick",
        "Newfoundland and Labrador",
        "Northwest Territories",
        "Nova Scotia",
        "Nunavut",
        "Ontario",
        "Prince Edward Island",
        "Quebec",
        "Saskatchewan",
        "Yukon",
      ],
    },
    {
      name: "Mexico",
      code: "MX",
      flagUrl: "/flags/mx.svg",
      regions: [
        "Aguascalientes",
        "Baja California",
        "Baja California Sur",
        "Campeche",
        "Chiapas",
        "Chihuahua",
        "Ciudad de Mexico",
        "Coahuila",
        "Colima",
        "Durango",
        "Guanajuato",
        "Guerrero",
        "Hidalgo",
        "Jalisco",
        "Mexico State",
        "Michoacán",
        "Morelos",
        "Nayarit",
        "Nuevo León",
        "Oaxaca",
        "Puebla",
        "Querétaro",
        "Quintana Roo",
        "San Luis Potosí",
        "Sinaloa",
        "Sonora",
        "Tabasco",
        "Tamaulipas",
        "Tlaxcala",
        "Veracruz",
        "Yucatán",
        "Zacatecas",
      ],
    },
    {
      name: "United States",
      code: "US",
      flagUrl: "/flags/us.svg",
      regions: [
        "Alabama",
        "Alaska",
        "American Samoa",
        "Arizona",
        "Arkansas",
        "California",
        "Colorado",
        "Connecticut",
        "Delaware",
        "Washington DC",
        "Micronesia",
        "Florida",
        "Georgia",
        "Guam",
        "Hawaii",
        "Idaho",
        "Illinois",
        "Indiana",
        "Iowa",
        "Kansas",
        "Kentucky",
        "Louisiana",
        "Maine",
        "Marshall Islands",
        "Maryland",
        "Massachusetts",
        "Michigan",
        "Minnesota",
        "Mississippi",
        "Missouri",
        "Montana",
        "Nebraska",
        "Nevada",
        "New Hampshire",
        "New Jersey",
        "New Mexico",
        "New York",
        "North Carolina",
        "North Dakota",
        "Northern Mariana Islands",
        "Ohio",
        "Oklahoma",
        "Oregon",
        "Palau",
        "Pennsylvania",
        "Puerto Rico",
        "Rhode Island",
        "South Carolina",
        "South Dakota",
        "Tennessee",
        "Texas",
        "Utah",
        "Vermont",
        "U.S. Virgin Islands",
        "Virginia",
        "Washington",
        "West Virginia",
        "Wisconsin",
        "Wyoming",
        "Armed Forces Americas",
        "Armed Forces Europe",
        "Armed Forces Pacific",
      ],
    },
  ];
}

export const getSuppliers = (): Supplier[] => [
  {
    id: "SUP-2024-001",
    name: "Steel Dynamics Inc.",
    address: "7575 West Jefferson Boulevard",
    city: "Fort Wayne",
    state: "Indiana",
    zip_code: "46804",
    country: "United States",
    contact_name: "Michael Johnson",
    contact_email: "mjohnson@steeldynamics.com",
    contact_phone: "+1 (260) 555-0123",
    payment_terms: "Net 30",
    default_currency: "USD",
    lead_time_days: 14,
    preferred_shipping_method: "LTL Freight",
    minimum_order_quantity: 5000,
    materials_supplied: ["Hot Rolled Steel", "Cold Rolled Steel", "Galvanized Steel", "Steel Plates"],
    active_status: true,
    rating: 4.8,
    created_at: "2024-01-15T08:30:00Z",
  },
  {
    id: "SUP-2024-002",
    name: "Nippon Steel Trading",
    address: "2-1 Marunouchi 2-chome",
    city: "Tokyo",
    state: "Chiyoda-ku",
    zip_code: "100-0005",
    country: "Japan",
    contact_name: "Takashi Yamamoto",
    contact_email: "t.yamamoto@nst.co.jp",
    contact_phone: "+81 3-5555-0199",
    payment_terms: "Net 45",
    default_currency: "JPY",
    lead_time_days: 21,
    preferred_shipping_method: "Ocean Freight",
    minimum_order_quantity: 10000,
    materials_supplied: ["Stainless Steel", "Tool Steel", "High-Speed Steel", "Spring Steel"],
    active_status: true,
    rating: 4.9,
    created_at: "2024-01-20T10:15:00Z",
  },
  {
    id: "SUP-2024-003",
    name: "ThyssenKrupp Materials",
    address: "ThyssenKrupp Allee 1",
    city: "Essen",
    state: "North Rhine-Westphalia",
    zip_code: "45143",
    country: "Germany",
    contact_name: "Klaus Weber",
    contact_email: "k.weber@thyssenkrupp.de",
    contact_phone: "+49 201-555-0177",
    payment_terms: "Net 60",
    default_currency: "EUR",
    lead_time_days: 18,
    preferred_shipping_method: "Rail Freight",
    minimum_order_quantity: 7500,
    materials_supplied: ["Electrical Steel", "Carbon Steel", "Automotive Steel", "Construction Steel"],
    active_status: true,
    rating: 4.7,
    created_at: "2024-02-01T09:45:00Z",
  },
  {
    id: "SUP-2024-004",
    name: "Melbourne Steel Works",
    address: "45 Industrial Drive",
    city: "Melbourne",
    state: "Victoria",
    zip_code: "3000",
    country: "Australia",
    contact_name: "Sarah Thompson",
    contact_email: "s.thompson@melbsteel.com.au",
    contact_phone: "+61 3-5555-0144",
    payment_terms: "Net 15",
    default_currency: "AUD",
    lead_time_days: 10,
    preferred_shipping_method: "Road Freight",
    minimum_order_quantity: 2500,
    materials_supplied: ["Reinforcing Steel", "Structural Steel", "Steel Tubing", "Wire Products"],
    active_status: true,
    rating: 4.5,
    created_at: "2024-02-10T07:30:00Z",
  },
  {
    id: "SUP-2024-005",
    name: "POSCO Trading",
    address: "892 Daechi-dong",
    city: "Seoul",
    state: "Gangnam-gu",
    zip_code: "06194",
    country: "South Korea",
    contact_name: "Jin-ho Park",
    contact_email: "jinho.park@posco.com",
    contact_phone: "+82 2-5555-0166",
    payment_terms: "Net 30",
    default_currency: "KRW",
    lead_time_days: 16,
    preferred_shipping_method: "Ocean Freight",
    minimum_order_quantity: 8000,
    materials_supplied: ["Automotive Steel", "API Steel", "Stainless Steel", "Electrical Steel"],
    active_status: true,
    rating: 4.9,
    created_at: "2024-02-15T11:20:00Z",
  },
  {
    id: "SUP-2024-006",
    name: "Tata Steel Europe",
    address: "30 Millbank",
    city: "London",
    state: "Greater London",
    zip_code: "SW1P 4WY",
    country: "United Kingdom",
    contact_name: "James Wilson",
    contact_email: "j.wilson@tatasteeleurope.com",
    contact_phone: "+44 20-5555-0188",
    payment_terms: "Net 45",
    default_currency: "GBP",
    lead_time_days: 15,
    preferred_shipping_method: "Sea Freight",
    minimum_order_quantity: 6000,
    materials_supplied: ["Construction Steel", "Railway Steel", "Packaging Steel", "Engineering Steel"],
    active_status: true,
    rating: 4.6,
    created_at: "2024-02-20T14:45:00Z",
  },
];

export const getInventoryItem = (id: number): InventoryItem | undefined => {
  return getInventory().find((item) => item.id === id);
};

export const getInventory = (): InventoryItem[] => [
  {
    id: 101,
    materialType: MaterialType.Steel,
    grade: "ASTM A36",
    dimensions: {
      thickness: "0.5",
      width: "48",
      length: "96",
    },
    unitOfMeasure: Units.Pounds,
    totalStock: 5000,
    availableStock: 2000,
    allocatedStock: 3000,
    reorderStatus: "Good",
    warehouseLocation: {
      warehouse: "Chicago Storage",
      zone: "A",
      bin: "Shelf 3",
    },
    batches: [
      {
        id: 1,
        batchNumber: "1234567890",
        heatNumber: "1234567890",
        millCertification: "s3://certs/a36_batch_123.pdf",
        createdAt: "2024-01-01",
        totalStock: 5000,
        availableStock: 2000,
        allocatedStock: 3000,
        supplierId: "1234567890",
        purchaseOrderId: "1234567890",
        qualityIssues: false,
      },
    ],
  },
  {
    id: 102,
    materialType: MaterialType.Aluminum,
    grade: "6061-T6",
    dimensions: {
      thickness: "0.25",
      width: "48",
      length: "120",
    },
    unitOfMeasure: Units.Pounds,
    totalStock: 3000,
    availableStock: 1000,
    allocatedStock: 2000,
    reorderStatus: "Low Stock",
    warehouseLocation: {
      warehouse: "Dallas Storage",
      zone: "B",
      bin: "Shelf 1",
    },
    batches: [
      {
        id: 1,
        batchNumber: "1234567890",
        heatNumber: "1234567890",
        millCertification: "s3://certs/a36_batch_123.pdf",
        createdAt: "2024-01-01",
        totalStock: 5000,
        availableStock: 2000,
        allocatedStock: 3000,
        supplierId: "1234567890",
        purchaseOrderId: "1234567890",
        qualityIssues: false,
      },
    ],
  },
  {
    id: 103,
    materialType: MaterialType.StainlessSteel,
    grade: "304",
    dimensions: {
      thickness: "0.125",
      width: "60",
      length: "144",
    },
    unitOfMeasure: Units.Pounds,
    totalStock: 7000,
    availableStock: 4000,
    allocatedStock: 3000,
    reorderStatus: "Good",
    warehouseLocation: {
      warehouse: "Los Angeles Hub",
      zone: "C",
      bin: "Row 2",
    },
    batches: [
      {
        id: 1,
        batchNumber: "1234567890",
        heatNumber: "1234567890",
        millCertification: "s3://certs/a36_batch_123.pdf",
        createdAt: "2024-01-01",
        totalStock: 5000,
        availableStock: 2000,
        allocatedStock: 3000,
        supplierId: "1234567890",
        purchaseOrderId: "1234567890",
        qualityIssues: false,
      },
    ],
  },
  {
    id: 104,
    materialType: MaterialType.Copper,
    grade: "C110",
    dimensions: {
      thickness: "0.375",
      width: "36",
      length: "96",
    },
    unitOfMeasure: Units.Pounds,
    totalStock: 2500,
    availableStock: 500,
    allocatedStock: 2000,
    reorderStatus: "Critical",
    warehouseLocation: {
      warehouse: "Houston Distribution",
      zone: "D",
      bin: "Shelf 5",
    },
    batches: [
      {
        id: 1,
        batchNumber: "1234567890",
        heatNumber: "1234567890",
        millCertification: "s3://certs/a36_batch_123.pdf",
        createdAt: "2024-01-01",
        totalStock: 5000,
        availableStock: 2000,
        allocatedStock: 3000,
        supplierId: "1234567890",
        purchaseOrderId: "1234567890",
        qualityIssues: false,
      },
    ],
  },
];

export const getRFQ = (id: string): RFQ | undefined => {
  return getRFQs().find((rfq) => rfq.rfqId === id);
};

export const getRFQs = (): RFQ[] => [
  {
    rfqId: "RFQ-20240315-001",
    source: "Manual",
    customer: {
      id: "CUST-456",
      name: "United Metals",
      contactName: "Sarah Johnson",
      contactEmail: "sarah.j@unitedmetals.com",
      contactPhone: "+1-555-789-1234",
    },
    receivedDate: "2024-03-15T14:20:00Z",
    materials: [
      {
        lineItemId: "L-003",
        materialType: MaterialType.Steel,
        grade: "ASTM A36",
        dimensions: { thickness: 0.5, width: 48, length: 96 },
        quantity: 15,
        unitOfMeasure: Units.Sheets,
        requiredDate: "2024-04-05",
        status: "Available",
      },
    ],
    itemsRequested: 1,
    status: "In Progress",
    createdAt: "2024-03-15T14:20:00Z",
  },
  {
    rfqId: "RFQ-20240315-002",
    source: "Manual",
    customer: {
      id: "CUST-456",
      name: "United Metals",
      contactName: "Sarah Johnson",
      contactEmail: "sarah.j@unitedmetals.com",
      contactPhone: "+1-555-789-1234",
    },
    receivedDate: "2024-03-15T14:20:00Z",
    materials: [
      {
        lineItemId: "L-003",
        materialType: MaterialType.Steel,
        grade: "ASTM A36",
        dimensions: { thickness: 0.5, width: 48, length: 96 },
        quantity: 15,
        unitOfMeasure: Units.Sheets,
        requiredDate: "2024-04-05",
        status: "Available",
      },
    ],
    itemsRequested: 1,
    status: "Rejected",
    createdAt: "2024-03-15T14:20:00Z",
  },
  {
    rfqId: "RFQ-20240315-003",
    source: "Uploaded",
    customer: {
      id: "CUST-456",
      name: "United Metals",
      contactName: "Sarah Johnson",
      contactEmail: "sarah.j@unitedmetals.com",
      contactPhone: "+1-555-789-1234",
    },
    materials: [],
    receivedDate: "2024-03-15T14:20:00Z",
    extractedData: {
      source: "Uploaded",
      fileUrl: "s3://rfqs/uploaded/rfq-123.pdf",
      extractionConfidence: 0.95,
      materials: [
        {
          lineItemId: "L-003",
          materialType: MaterialType.Steel,
          grade: "ASTM A36",
          dimensions: { thickness: 0.5, width: 48, length: 96 },
          quantity: 15,
          unitOfMeasure: Units.Sheets,
          requiredDate: "2024-04-05",
          status: "Pending",
        },
      ],
    },
    itemsRequested: 1,
    status: "Pending",
    createdAt: "2024-03-15T14:20:00Z",
  },
];

export const getQuotes = (): Quote[] => [
  {
    id: "QUOTE-20240315-001",
    rfqId: "RFQ-20240315-002",
    customer: {
      id: "CUST-789",
      name: "Acme Metals Ltd.",
      contactName: "John Doe",
      contactEmail: "john.doe@acmemetals.com",
      contactPhone: "+1-555-123-4567",
    },
    quoteDate: "2024-03-15T14:20:00Z",
    expirationDate: "2024-03-30T23:59:59Z",
    status: "Pending Approval",
    items: [
      {
        lineItemId: "L-001",
        materialType: MaterialType.Steel,
        grade: "ASTM A36",
        dimensions: { thickness: 0.5, width: 48, length: 96 },
        quantity: 10,
        unitOfMeasure: Units.Sheets,
        basePrice: 120.0,
        finalPrice: 120.0,
        totalPrice: 1200.0,
        stockAvailability: "Available",
      },
      {
        lineItemId: "L-002",
        materialType: MaterialType.Aluminum,
        grade: "6061-T6",
        dimensions: { thickness: 0.25, width: 48 },
        quantity: 5000,
        unitOfMeasure: Units.Pounds,
        basePrice: 2.5,
        finalPrice: 2.5,
        totalPrice: 12500.0,
        stockAvailability: "Needs Sourcing",
      },
    ],
    subtotal: 13700.0,
    taxRate: 5.0,
    taxAmount: 685.0,
    totalPrice: 14385.0,
    currency: "USD",
    notes: "Pricing valid for 15 days. Subject to availability.",
    createdAt: "2024-03-15T14:20:00Z",
  },

  {
    id: "QUOTE-20240315-002",
    rfqId: "RFQ-20240315-002",
    customer: {
      id: "CUST-789",
      name: "Acme Metals Ltd.",
      contactName: "John Doe",
      contactEmail: "john.doe@acmemetals.com",
      contactPhone: "+1-555-123-4567",
    },
    quoteDate: "2024-03-15T14:20:00Z",
    expirationDate: "2024-03-30T23:59:59Z",
    status: "Approved",
    items: [
      {
        lineItemId: "L-001",
        materialType: MaterialType.Steel,
        grade: "ASTM A36",
        dimensions: { thickness: 0.5, width: 48, length: 96 },
        quantity: 10,
        unitOfMeasure: Units.Sheets,
        stockAvailability: "Available",
        basePrice: 120.0,
        finalPrice: 120.0,
        totalPrice: 1200.0,
      },
    ],
    subtotal: 13700.0,
    taxRate: 5.0,
    taxAmount: 685.0,
    totalPrice: 14385.0,
    currency: "USD",
    notes: "Pricing valid for 15 days. Subject to availability.",
    createdAt: "2024-03-15T14:20:00Z",
  },
];

export const getQuote = (id: string): Quote | undefined => {
  return getQuotes().find((quote) => quote.id === id);
};

const basePrices: Record<string, number> = {
  "Steel-ASTM A36": 55.0,
  "Steel-1018 Cold Rolled": 60.0,
  "Aluminum-6061-T6": 80.0,
  "Aluminum-5052-H32": 85.0,
  "Stainless Steel-304": 120.0,
  "Stainless Steel-316L": 140.0,
  "Copper-C110": 200.0,
};

// Density (lbs per cubic inch)
const materialDensities: Record<string, number> = {
  Steel: 0.283,
  Aluminum: 0.098,
  "Stainless Steel": 0.29,
  Copper: 0.323,
};

// Calculate the price of a material based on the base price, density, and quantity
export const calculateMaterialPrice = (
  materialType: MaterialType,
  grade: string,
  thickness: number,
  width: number,
  quantity: number,
  unit: Units,
  length?: number // Optional for coils
): number => {
  const key = `${materialType}-${grade}`;
  const basePricePerCWT = basePrices[key] || 50; // Default price if missing
  const density = materialDensities[materialType] || 0.283; // Default density

  // Calculate volume (cubic inches)
  const volume = thickness * width * (length || 1); // Length is 1 for coils
  const weightLbs = volume * density; // Convert volume to weight
  const weightCWT = weightLbs / 100; // Convert to hundredweight

  // Base Material Cost
  let materialCost = weightCWT * basePricePerCWT;

  // Processing Fee
  const processingFee = 25.0;

  // Bulk Discount (5% off for orders over 10 tons)
  if (unit === Units.Tons && quantity >= 10) {
    materialCost *= 0.95;
  }

  // Total Price
  return (materialCost + processingFee) * quantity;
};

export const getSalesOrder = (id: string): SalesOrder | undefined => {
  return getSalesOrders().find((order) => order.orderId === id);
};

export const getSalesOrders = (): SalesOrder[] => [
  {
    orderId: "SO-20240316-001",
    quoteId: "QUOTE-20240315-001",
    customer: {
      id: "CUST-789",
      name: "Acme Metals Ltd.",
      contactName: "John Doe",
      contactEmail: "john.doe@acmemetals.com",
      contactPhone: "+1-555-123-4567",
    },
    orderDate: "2024-03-15T14:20:00Z",
    status: "Pending",
    items: [
      {
        lineItemId: "L-001",
        materialType: MaterialType.Steel,
        grade: "ASTM A36",
        dimensions: { thickness: 0.5, width: 48, length: 96 },
        quantity: 10,
        unitOfMeasure: Units.Sheets,
        stockAvailability: "Available",
        basePrice: 120.0,
        finalPrice: 120.0,
        totalPrice: 1200.0,
        allocatedBatches: [
          {
            batchId: "B-001",
            allocatedQuantity: 10,
          },
        ],
      },
    ],
    totalPrice: 1200.0,
    currency: "USD",
    createdAt: "2024-03-15T14:20:00Z",
  },
];

export const getInvoice = (id: string): Invoice | undefined => {
  return getInvoices().find((invoice) => invoice.invoiceId === id);
};

export const getInvoices = (): Invoice[] => [
  {
    invoiceId: "INV-20240316-001",
    orderId: "SO-20240316-001",
    customer: {
      id: "CUST-789",
      name: "Acme Metals Ltd.",
      contactName: "John Doe",
      contactEmail: "john.doe@acmemetals.com",
      contactPhone: "+1-555-123-4567",
    },
    invoiceDate: "2024-03-15T14:20:00Z",
    dueDate: "2024-03-30T23:59:59Z",
    status: "Pending",
    items: [
      {
        lineItemId: "L-001",
        materialType: MaterialType.Steel,
        grade: "ASTM A36",
        dimensions: {
          thickness: 0.5,
          width: 48,
          length: 96,
        },
        quantity: 10,
        unitOfMeasure: Units.Sheets,
        unitPrice: 120.0,
        totalPrice: 1200.0,
      },
    ],
    subtotal: 1200.0,
    taxRate: 5.0,
    taxAmount: 60.0,
    totalPrice: 1260.0,
    currency: "USD",
    payments: [],
    createdAt: "2024-03-15T14:20:00Z",
  },
];

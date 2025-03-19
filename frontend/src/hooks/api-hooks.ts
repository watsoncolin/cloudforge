import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { UseQueryOptions, UseMutationOptions } from "@tanstack/react-query";
import { api } from "@/api/client";
import type {
  CustomerDto,
  CreateCustomerDto,
  SupplierDto,
  CreateSupplierDto,
  CancelablePromise,
  UpdateSupplierDto,
  PurchaseOrderDto,
  CreatePurchaseOrderDto,
  UpdatePurchaseOrderDto,
  ReceivePurchaseOrderDto,
  InventoryDto,
  BatchDetailsResponseDto,
  UpdateBatchLocationDto,
  RFQDto,
  CreateRFQDto,
  UpdateRFQDto,
  QuoteDto,
  OrderDto,
} from "@/api/generated";

// Query keys for caching and invalidation
export const queryKeys = {
  customers: {
    all: ["customers"] as const,
    detail: (id: string) => ["customers", id] as const,
  },
  suppliers: {
    all: ["suppliers"] as const,
    detail: (id: string) => ["suppliers", id] as const,
  },
  inventory: {
    all: ["inventory"] as const,
    detail: (id: string) => ["inventory", id] as const,
    batch: {
      detail: (id: string, batchId: string) => ["inventory", id, "batch", batchId] as const,
    },
  },
  quotes: {
    all: ["quotes"] as const,
    detail: (id: string) => ["quotes", id] as const,
  },
  purchaseOrders: {
    all: ["purchaseOrders"] as const,
    detail: (id: string) => ["purchaseOrders", id] as const,
  },
  rfqs: {
    all: ["rfqs"] as const,
    detail: (id: string) => ["rfqs", id] as const,
    customer: (customerId: string) => ["rfqs", "customer", customerId] as const,
  },
  orders: {
    all: ["orders"] as const,
    detail: (id: string) => ["orders", id] as const,
    customer: (customerId: string) => ["orders", "customer", customerId] as const,
  },
} as const;

// Re-export types
export type { CustomerDto, CreateCustomerDto, SupplierDto, CreateSupplierDto, InventoryDto };

// Error type
export interface ApiError {
  message: string;
  error: string;
  statusCode: number;
}

// Error handling helper
const handleApiError = (error: unknown) => {
  if (error instanceof Error) {
    throw error;
  }
  throw new Error("An unexpected error occurred");
};

// Helper to convert CancelablePromise to Promise
const toPromise = <T>(cancelablePromise: CancelablePromise<T>): Promise<T> => {
  return new Promise((resolve, reject) => {
    cancelablePromise.then(resolve).catch(reject);
  });
};

// Customer hooks
export function useCustomers(options?: Omit<UseQueryOptions<CustomerDto[], ApiError>, "queryKey" | "queryFn">) {
  return useQuery<CustomerDto[], ApiError>({
    queryKey: queryKeys.customers.all,
    queryFn: () => toPromise(api.customers.customersControllerGetAllCustomers()),
    ...options,
  });
}

export function useCustomer(
  id: string,
  options?: Omit<UseQueryOptions<CustomerDto, ApiError>, "queryKey" | "queryFn">
) {
  return useQuery<CustomerDto, ApiError>({
    queryKey: queryKeys.customers.detail(id),
    queryFn: () => toPromise(api.customers.customersControllerGetCustomerById(id)),
    ...options,
  });
}

export function useCreateCustomer(
  options?: Omit<UseMutationOptions<CustomerDto, ApiError, CreateCustomerDto>, "mutationFn">
) {
  const queryClient = useQueryClient();

  return useMutation<CustomerDto, ApiError, CreateCustomerDto>({
    mutationFn: (data) => toPromise(api.customers.customersControllerCreateCustomer(data)).catch(handleApiError),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.customers.all });
    },
    retry: false,
    ...options,
  });
}

export function useUpdateCustomer(
  options?: Omit<UseMutationOptions<CustomerDto, ApiError, { id: string; data: CreateCustomerDto }>, "mutationFn">
) {
  const queryClient = useQueryClient();

  return useMutation<CustomerDto, ApiError, { id: string; data: CreateCustomerDto }>({
    mutationFn: ({ id, data }) => toPromise(api.customers.customersControllerUpdateCustomer(id, data)),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.customers.detail(id) });
      queryClient.invalidateQueries({ queryKey: queryKeys.customers.all });
    },
    retry: false,
    ...options,
  });
}

export function useDeleteCustomer(options?: Omit<UseMutationOptions<void, ApiError, string>, "mutationFn">) {
  const queryClient = useQueryClient();

  return useMutation<void, ApiError, string>({
    mutationFn: (id) => toPromise(api.customers.customersControllerDeleteCustomer(id)),
    onSuccess: (_, id) => {
      queryClient.removeQueries({ queryKey: queryKeys.customers.detail(id) });
      queryClient.invalidateQueries({ queryKey: queryKeys.customers.all });
    },
    ...options,
  });
}

// Supplier hooks
export function useSuppliers(options?: Omit<UseQueryOptions<SupplierDto[], Error>, "queryKey" | "queryFn">) {
  return useQuery({
    queryKey: queryKeys.suppliers.all,
    queryFn: () => api.suppliers.suppliersControllerFindAll().catch(handleApiError),
    ...options,
  });
}

export function useSupplier(id: string, options?: Omit<UseQueryOptions<SupplierDto, Error>, "queryKey" | "queryFn">) {
  return useQuery({
    queryKey: queryKeys.suppliers.detail(id),
    queryFn: () => api.suppliers.suppliersControllerFindOne(id).catch(handleApiError),
    ...options,
  });
}

export function useCreateSupplier(
  options?: Omit<UseMutationOptions<SupplierDto, Error, CreateSupplierDto>, "mutationFn">
) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateSupplierDto) => api.suppliers.suppliersControllerCreate(data).catch(handleApiError),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.suppliers.all });
    },
    retry: false,
    ...options,
  });
}

export function useUpdateSupplier(
  options?: Omit<UseMutationOptions<SupplierDto, ApiError, { id: string; data: UpdateSupplierDto }>, "mutationFn">
) {
  const queryClient = useQueryClient();
  return useMutation<SupplierDto, ApiError, { id: string; data: UpdateSupplierDto }>({
    mutationFn: ({ id, data }) => toPromise(api.suppliers.suppliersControllerUpdate(id, data)),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.suppliers.detail(id) });
      queryClient.invalidateQueries({ queryKey: queryKeys.suppliers.all });
    },
    retry: false,
    ...options,
  });
}

export function useDeleteSupplier(options?: Omit<UseMutationOptions<void, Error, string>, "mutationFn">) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => api.suppliers.suppliersControllerRemove(id).catch(handleApiError),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.suppliers.all });
    },
    ...options,
  });
}

// Purchase order hooks
export function usePurchaseOrders(options?: Omit<UseQueryOptions<PurchaseOrderDto[], Error>, "queryKey" | "queryFn">) {
  return useQuery({
    queryKey: queryKeys.purchaseOrders.all,
    queryFn: () => api.purchaseOrders.purchaseOrdersControllerFindAll().catch(handleApiError),
    ...options,
  });
}

export function usePurchaseOrder(
  id: string,
  options?: Omit<UseQueryOptions<PurchaseOrderDto, Error>, "queryKey" | "queryFn">
) {
  return useQuery({
    queryKey: queryKeys.purchaseOrders.detail(id),
    queryFn: () => api.purchaseOrders.purchaseOrdersControllerFindOne(id).catch(handleApiError),
    ...options,
  });
}

export function useCreatePurchaseOrder(
  options?: Omit<UseMutationOptions<PurchaseOrderDto, Error, CreatePurchaseOrderDto>, "mutationFn">
) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreatePurchaseOrderDto) =>
      api.purchaseOrders.purchaseOrdersControllerCreate(data).catch(handleApiError),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.purchaseOrders.all });
    },
    retry: false,
    ...options,
  });
}

export function useUpdatePurchaseOrder(
  options?: Omit<
    UseMutationOptions<PurchaseOrderDto, Error, { id: string; data: UpdatePurchaseOrderDto }>,
    "mutationFn"
  >
) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => api.purchaseOrders.purchaseOrdersControllerUpdate(id, data).catch(handleApiError),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.purchaseOrders.all });
    },
    retry: false,
    ...options,
  });
}

export function useApprovePurchaseOrder(options?: Omit<UseMutationOptions<void, Error, string>, "mutationFn">) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => api.purchaseOrders.purchaseOrdersControllerApprove(id).catch(handleApiError),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.purchaseOrders.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.purchaseOrders.detail(id) });
    },
    ...options,
  });
}

export function useMarkShippedPurchaseOrder(options?: Omit<UseMutationOptions<void, Error, string>, "mutationFn">) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => api.purchaseOrders.purchaseOrdersControllerMarkShipped(id).catch(handleApiError),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.purchaseOrders.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.purchaseOrders.detail(id) });
    },
    ...options,
  });
}

export function useReceivePurchaseOrder(
  options?: Omit<UseMutationOptions<void, Error, { id: string; data: ReceivePurchaseOrderDto }>, "mutationFn">
) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) =>
      api.purchaseOrders.purchaseOrdersControllerMarkReceived(id, data).catch(handleApiError),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.purchaseOrders.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.purchaseOrders.detail(id) });
    },
    ...options,
  });
}

export function useInventory(options?: Omit<UseQueryOptions<InventoryDto[], ApiError>, "queryKey" | "queryFn">) {
  return useQuery({
    queryKey: queryKeys.inventory.all,
    queryFn: () => toPromise(api.inventory.inventoryControllerGetAllInventory()),
    ...options,
  });
}

export function useInventoryById(
  id: string,
  options?: Omit<UseQueryOptions<InventoryDto, ApiError>, "queryKey" | "queryFn">
) {
  return useQuery<InventoryDto, ApiError>({
    queryKey: queryKeys.inventory.detail(id),
    queryFn: () => toPromise(api.inventory.inventoryControllerGetInventoryById(id)),
    ...options,
  });
}

export function useInventoryBatchById(
  id: string,
  batchId: string,
  options?: Omit<UseQueryOptions<BatchDetailsResponseDto, ApiError>, "queryKey" | "queryFn">
) {
  return useQuery<BatchDetailsResponseDto, ApiError>({
    queryKey: queryKeys.inventory.batch.detail(id, batchId),
    queryFn: () => toPromise(api.inventory.inventoryBatchControllerGetBatchById(id, batchId)),
    ...options,
  });
}

export function useUpdateBatchLocation(
  options?: Omit<
    UseMutationOptions<BatchDetailsResponseDto, Error, { id: string; batchId: string; data: UpdateBatchLocationDto }>,
    "mutationFn"
  >
) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, batchId, data }) =>
      api.inventory.inventoryBatchControllerUpdateBatchLocation(id, batchId, data).catch(handleApiError),
    onSuccess: (_, { id, batchId }) => {
      console.log("id", id);
      console.log("batchId", batchId);
      queryClient.invalidateQueries({ queryKey: queryKeys.inventory.batch.detail(id, batchId) });
      queryClient.invalidateQueries({ queryKey: queryKeys.inventory.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.inventory.detail(id) });
    },
    ...options,
  });
}

// RFQ hooks
export function useRFQs(options?: Omit<UseQueryOptions<RFQDto[], ApiError>, "queryKey" | "queryFn">) {
  return useQuery({
    queryKey: queryKeys.rfqs.all,
    queryFn: () => toPromise(api.rfQs.rfqControllerGetAllRfqs()),
    ...options,
  });
}

export function useRFQById(id: string, options?: Omit<UseQueryOptions<RFQDto, ApiError>, "queryKey" | "queryFn">) {
  return useQuery<RFQDto, ApiError>({
    queryKey: queryKeys.rfqs.detail(id),
    queryFn: () => toPromise(api.rfQs.rfqControllerGetRfqById(id)),
    ...options,
  });
}

export function useCreateRFQ(options?: Omit<UseMutationOptions<RFQDto, ApiError, CreateRFQDto>, "mutationFn">) {
  return useMutation({
    mutationFn: (data: CreateRFQDto) => toPromise(api.rfQs.rfqControllerCreateRfq(data)),
    ...options,
  });
}

export function useUpdateRFQ(
  options?: Omit<UseMutationOptions<RFQDto, ApiError, { id: string; data: UpdateRFQDto }>, "mutationFn">
) {
  return useMutation({
    mutationFn: ({ id, data }) => toPromise(api.rfQs.rfqControllerUpdateRfq(id, data)),
    ...options,
  });
}

export function useDeleteRFQ(options?: Omit<UseMutationOptions<void, ApiError, string>, "mutationFn">) {
  return useMutation({
    mutationFn: (id: string) => toPromise(api.rfQs.rfqControllerDeleteRfq(id)),
    ...options,
  });
}

export function useConvertToQuote(options?: Omit<UseMutationOptions<QuoteDto, ApiError, string>, "mutationFn">) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => toPromise(api.rfQs.rfqControllerConvertToQuote(id)),
    ...options,
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.rfqs.detail(id) });
      queryClient.invalidateQueries({ queryKey: queryKeys.rfqs.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.quotes.all });
    },
    retry: false,
  });
}

// Quote hooks
export function useQuotes(options?: Omit<UseQueryOptions<QuoteDto[], ApiError>, "queryKey" | "queryFn">) {
  return useQuery({
    queryKey: queryKeys.quotes.all,
    queryFn: () => toPromise(api.quotes.quoteControllerGetAllQuotes()),
    ...options,
  });
}

export function useQuoteById(id: string, options?: Omit<UseQueryOptions<QuoteDto, ApiError>, "queryKey" | "queryFn">) {
  return useQuery<QuoteDto, ApiError>({
    queryKey: queryKeys.quotes.detail(id),
    queryFn: () => toPromise(api.quotes.quoteControllerGetQuoteById(id)),
    ...options,
  });
}

export function useConvertToOrder(options?: Omit<UseMutationOptions<OrderDto, ApiError, string>, "mutationFn">) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => toPromise(api.quotes.quoteControllerConvertToOrder(id)),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.quotes.detail(id) });
      queryClient.invalidateQueries({ queryKey: queryKeys.quotes.all });
    },
    ...options,
    retry: false,
  });
}

// Order hooks
export function useOrders(options?: Omit<UseQueryOptions<OrderDto[], ApiError>, "queryKey" | "queryFn">) {
  return useQuery({
    queryKey: queryKeys.orders.all,
    queryFn: () => toPromise(api.orders.orderControllerGetAllOrders()),
    ...options,
  });
}

export function useOrderById(id: string, options?: Omit<UseQueryOptions<OrderDto, ApiError>, "queryKey" | "queryFn">) {
  return useQuery<OrderDto, ApiError>({
    queryKey: queryKeys.orders.detail(id),
    queryFn: () => toPromise(api.orders.orderControllerGetOrderById(id)),
    ...options,
  });
}

export function useOrdersForCustomer(
  customerId: string,
  options?: Omit<UseQueryOptions<OrderDto[], ApiError>, "queryKey" | "queryFn">
) {
  return useQuery({
    queryKey: queryKeys.orders.customer(customerId),
    queryFn: () => toPromise(api.orders.orderControllerGetAllOrdersForCustomer(customerId)),
    ...options,
  });
}

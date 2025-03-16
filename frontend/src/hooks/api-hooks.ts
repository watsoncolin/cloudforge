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
  },
  quotes: {
    all: ["quotes"] as const,
    detail: (id: string) => ["quotes", id] as const,
  },
} as const;

// Re-export types
export type { CustomerDto, CreateCustomerDto, SupplierDto, CreateSupplierDto };

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

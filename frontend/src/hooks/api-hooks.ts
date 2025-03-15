import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { UseQueryOptions, UseMutationOptions } from "@tanstack/react-query";
import { api } from "@/api/client";
import type { CustomerDto, CreateCustomerDto, CancelablePromise } from "@/api/generated";

// Query keys for caching and invalidation
export const queryKeys = {
  customers: {
    all: ["customers"] as const,
    detail: (id: string) => ["customers", id] as const,
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
export type { CustomerDto, CreateCustomerDto };

// Error type
export interface ApiError {
  message: string;
  statusCode: number;
}

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
    mutationFn: (data) => toPromise(api.customers.customersControllerCreateCustomer(data)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.customers.all });
    },
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

import { Suspense } from "react";
import type { Metadata } from "next";
import { CustomersList } from "./customers-list";
import { api } from "@/api/client";
import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query";
import { queryKeys } from "@/hooks/api-hooks";

export const metadata: Metadata = {
  title: "Customers",
};

export default async function CustomersPage() {
  const queryClient = new QueryClient();

  // Prefetch the customers query on the server
  await queryClient.prefetchQuery({
    queryKey: queryKeys.customers.all,
    queryFn: () => api.customers.customersControllerGetAllCustomers().then((res) => res),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense
        fallback={
          <div className="flex items-center justify-center h-full">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
          </div>
        }
      >
        <CustomersList />
      </Suspense>
    </HydrationBoundary>
  );
}

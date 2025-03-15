import { Suspense } from "react";
import type { Metadata } from "next";
import { CustomerDetails } from "./customer-details";
import { api } from "@/api/client";
import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query";
import { queryKeys } from "@/hooks/api-hooks";

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  try {
    const customer = await api.customers.customersControllerGetCustomerById(params.id);
    return {
      title: `Customer: ${customer.name}`,
    };
  } catch {
    return {
      title: "Customer Not Found",
    };
  }
}

export default async function CustomerPage({ params }: { params: { id: string } }) {
  const queryClient = new QueryClient();

  // Prefetch the customer data on the server
  await queryClient.prefetchQuery({
    queryKey: queryKeys.customers.detail(params.id),
    queryFn: () => api.customers.customersControllerGetCustomerById(params.id),
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
        <CustomerDetails id={params.id} />
      </Suspense>
    </HydrationBoundary>
  );
}

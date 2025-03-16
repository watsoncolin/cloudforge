import { Suspense } from "react";
import type { Metadata } from "next";
import { api } from "@/api/client";
import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query";
import { queryKeys } from "@/hooks/api-hooks";
import { PurchaseOrderDetails } from "./purchase-order-details";

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  try {
    const supplier = await api.suppliers.suppliersControllerFindOne(params.id);
    return {
      title: `Supplier: ${supplier.name}`,
    };
  } catch {
    return {
      title: "Supplier Not Found",
    };
  }
}

export default async function SupplierPage({ params }: { params: { id: string } }) {
  const queryClient = new QueryClient();

  // Prefetch the supplier data on the server
  await queryClient.prefetchQuery({
    queryKey: queryKeys.suppliers.detail(params.id),
    queryFn: () => api.suppliers.suppliersControllerFindOne(params.id),
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
        <PurchaseOrderDetails id={params.id} />
      </Suspense>
    </HydrationBoundary>
  );
}

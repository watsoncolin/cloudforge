import { Suspense } from "react";
import type { Metadata } from "next";
import { api } from "@/api/client";
import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query";
import { queryKeys } from "@/hooks/api-hooks";
import { SupplierDetails } from "./supplier-details";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  try {
    const supplier = await api.suppliers.suppliersControllerFindOne(id);
    return {
      title: `Supplier: ${supplier.name}`,
    };
  } catch {
    return {
      title: "Supplier Not Found",
    };
  }
}

export default async function SupplierPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const queryClient = new QueryClient();

  // Prefetch the supplier data on the server
  await queryClient.prefetchQuery({
    queryKey: queryKeys.suppliers.detail(id),
    queryFn: () => api.suppliers.suppliersControllerFindOne(id),
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
        <SupplierDetails id={id} />
      </Suspense>
    </HydrationBoundary>
  );
}

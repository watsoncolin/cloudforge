import { Suspense } from "react";
import type { Metadata } from "next";
import { api } from "@/api/client";
import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query";
import { queryKeys } from "@/hooks/api-hooks";
import { PurchaseOrderDetails } from "./purchase-order-details";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  try {
    const purchaseOrder = await api.purchaseOrders.purchaseOrdersControllerFindOne(id);
    return {
      title: `Purchase Order: ${purchaseOrder.id}`,
    };
  } catch {
    return {
      title: "Purchase Order Not Found",
    };
  }
}

export default async function PurchaseOrderPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const queryClient = new QueryClient();

  // Prefetch the supplier data on the server
  await queryClient.prefetchQuery({
    queryKey: queryKeys.purchaseOrders.detail(id),
    queryFn: () => api.purchaseOrders.purchaseOrdersControllerFindOne(id),
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
        <PurchaseOrderDetails id={id} />
      </Suspense>
    </HydrationBoundary>
  );
}

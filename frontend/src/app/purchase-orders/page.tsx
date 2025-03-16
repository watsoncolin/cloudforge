import { Suspense } from "react";
import type { Metadata } from "next";
import { api } from "@/api/client";
import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query";
import { queryKeys } from "@/hooks/api-hooks";
import { PurchaseOrdersList } from "./purchase-order-list";

export const metadata: Metadata = {
  title: "Purchase Orders",
};

export default async function PurchaseOrdersPage() {
  const queryClient = new QueryClient();

  // Prefetch the suppliers query on the server
  await queryClient.prefetchQuery({
    queryKey: queryKeys.purchaseOrders.all,
    queryFn: () => api.purchaseOrders.purchaseOrdersControllerFindAll().then((res) => res),
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
        <PurchaseOrdersList />
      </Suspense>
    </HydrationBoundary>
  );
}

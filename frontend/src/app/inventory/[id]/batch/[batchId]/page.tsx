import { Suspense } from "react";
import type { Metadata } from "next";
import { api } from "@/api/client";
import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query";
import { queryKeys } from "@/hooks/api-hooks";
import BatchDetails from "./batch-details";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string; batchId: string }>;
}): Promise<Metadata> {
  try {
    const { id, batchId } = await params;
    const batchDetails = await api.inventory.inventoryBatchControllerGetBatchById(id, batchId);

    const { inventory, batch } = batchDetails;

    return {
      title: `Batch: ${batch.batchNumber} - Inventory: ${inventory.materialType} ${inventory.grade} ${inventory.dimensions.thickness}x${inventory.dimensions.width}x${inventory.dimensions.length}`,
    };
  } catch {
    return {
      title: "Batch Not Found",
    };
  }
}

export default async function BatchPage({ params }: { params: Promise<{ id: string; batchId: string }> }) {
  const queryClient = new QueryClient();

  const { id, batchId } = await params;

  await queryClient.prefetchQuery({
    queryKey: queryKeys.inventory.batch.detail(id, batchId),
    queryFn: () => api.inventory.inventoryBatchControllerGetBatchById(id, batchId),
  });

  await queryClient.prefetchQuery({
    queryKey: queryKeys.inventory.detail(id),
    queryFn: () => api.inventory.inventoryControllerGetInventoryById(id),
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
        <BatchDetails id={id} batchId={batchId} />
      </Suspense>
    </HydrationBoundary>
  );
}

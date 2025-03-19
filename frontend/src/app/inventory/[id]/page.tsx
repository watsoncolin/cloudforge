import { Suspense } from "react";
import type { Metadata } from "next";
import { api } from "@/api/client";
import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query";
import { queryKeys } from "@/hooks/api-hooks";
import InventoryDetails from "./inventory-details";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  try {
    const { id } = await params;
    const inventory = await api.inventory.inventoryControllerGetInventoryById(id);
    return {
      title: `Inventory: ${inventory.materialType} ${inventory.grade} ${inventory.dimensions.thickness}x${inventory.dimensions.width}x${inventory.dimensions.length}`,
    };
  } catch {
    return {
      title: "Inventory Not Found",
    };
  }
}

export default async function InventoryPage({ params }: { params: Promise<{ id: string }> }) {
  const queryClient = new QueryClient();

  const { id } = await params;

  // Prefetch the customer data on the server
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
        <InventoryDetails id={id} />
      </Suspense>
    </HydrationBoundary>
  );
}

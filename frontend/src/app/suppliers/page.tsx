import { Suspense } from "react";
import type { Metadata } from "next";
import { api } from "@/api/client";
import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query";
import { queryKeys } from "@/hooks/api-hooks";
import { SuppliersList } from "./suppliers-list";

export const metadata: Metadata = {
  title: "Suppliers",
};

export default async function SuppliersPage() {
  const queryClient = new QueryClient();

  // Prefetch the suppliers query on the server
  await queryClient.prefetchQuery({
    queryKey: queryKeys.suppliers.all,
    queryFn: () => api.suppliers.suppliersControllerFindAll().then((res) => res),
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
        <SuppliersList />
      </Suspense>
    </HydrationBoundary>
  );
}

import { Suspense } from "react";
import type { Metadata } from "next";
import { api } from "@/api/client";
import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query";
import { queryKeys } from "@/hooks/api-hooks";
import { RFQList } from "./rfq-list";

export const metadata: Metadata = {
  title: "Request for Quotes",
};

export default async function RFQPage() {
  const queryClient = new QueryClient();

  // Prefetch the customers query on the server
  await queryClient.prefetchQuery({
    queryKey: queryKeys.rfqs.all,
    queryFn: () => api.rfQs.rfqControllerGetAllRfqs().then((res) => res),
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
        <RFQList />
      </Suspense>
    </HydrationBoundary>
  );
}

import { Suspense } from "react";
import type { Metadata } from "next";
import { api } from "@/api/client";
import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query";
import { queryKeys } from "@/hooks/api-hooks";
import { QuoteList } from "./quote-list";

export const metadata: Metadata = {
  title: "Quotes",
};

export default async function QuotePage() {
  const queryClient = new QueryClient();

  // Prefetch the customers query on the server
  await queryClient.prefetchQuery({
    queryKey: queryKeys.quotes.all,
    queryFn: () => api.quotes.quoteControllerGetAllQuotes().then((res) => res),
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
        <QuoteList />
      </Suspense>
    </HydrationBoundary>
  );
}

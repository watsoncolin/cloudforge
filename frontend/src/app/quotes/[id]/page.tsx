import { Suspense } from "react";
import type { Metadata } from "next";
import { api } from "@/api/client";
import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query";
import { queryKeys } from "@/hooks/api-hooks";
import { QuoteDetails } from "./quote-details";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  try {
    const { id } = await params;
    const quote = await api.quotes.quoteControllerGetQuoteById(id);
    return {
      title: `Quote: ${quote.id}`,
    };
  } catch {
    return {
      title: "Quote Not Found",
    };
  }
}

export default async function QuotePage({ params }: { params: Promise<{ id: string }> }) {
  const queryClient = new QueryClient();
  const { id } = await params;

  // Prefetch the supplier data on the server
  await queryClient.prefetchQuery({
    queryKey: queryKeys.quotes.detail(id),
    queryFn: () => api.quotes.quoteControllerGetQuoteById(id),
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
        <QuoteDetails id={id} />
      </Suspense>
    </HydrationBoundary>
  );
}

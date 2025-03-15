"use client";

import { useState } from "react";
import { Subheading } from "@/components/catalyst-ui/heading";
import { Divider } from "@/components/catalyst-ui/divider";
import { DescriptionList, DescriptionTerm, DescriptionDetails } from "@/components/catalyst-ui/description-list";
import { Link } from "@/components/catalyst-ui/link";
import { PaperClipIcon, ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/20/solid";
import type { RFQExtractedData } from "@/domain/rfq";

interface ExtractedDataSectionProps {
  extractedData: RFQExtractedData;
}

export function ExtractedDataSection({ extractedData }: ExtractedDataSectionProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="mt-12">
      <button onClick={() => setIsExpanded(!isExpanded)} className="flex w-full items-center justify-between">
        <Subheading>AI Extracted Data</Subheading>
        {isExpanded ? (
          <ChevronUpIcon className="size-5 text-zinc-400" />
        ) : (
          <ChevronDownIcon className="size-5 text-zinc-400" />
        )}
      </button>
      {isExpanded && (
        <>
          <Divider className="mt-4" />
          <DescriptionList>
            <DescriptionTerm>
              <span className="flex items-center gap-2">
                <PaperClipIcon className="size-4 shrink-0 text-zinc-400 dark:text-zinc-500" />
                Source
              </span>
            </DescriptionTerm>
            <DescriptionDetails>
              <Link href={extractedData.fileUrl || ""}>{extractedData.fileUrl}</Link>
            </DescriptionDetails>
            <DescriptionTerm>AI Confidence</DescriptionTerm>
            <DescriptionDetails>{extractedData.extractionConfidence * 100}%</DescriptionDetails>
          </DescriptionList>
        </>
      )}
    </div>
  );
}

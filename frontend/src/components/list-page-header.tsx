import { Heading } from "./catalyst-ui/heading";
import { InputGroup, Input } from "./catalyst-ui/input";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

interface ListPageHeaderProps {
  title: string;
  searchPlaceholder?: string;
  button?: React.ReactNode;
}

export function ListPageHeader({ title, searchPlaceholder, button }: ListPageHeaderProps) {
  return (
    <div className="flex items-end justify-between gap-4">
      <Heading>
        {title}
        <div className="mt-4 flex max-w-xl gap-4">
          <div className="flex-1">
            <InputGroup>
              <MagnifyingGlassIcon />
              <Input name="search" placeholder={searchPlaceholder || `Search ${title}`} />
            </InputGroup>
          </div>
        </div>
      </Heading>
      {button}
    </div>
  );
}

"use client";

import { Input } from "@/components/catalyst-ui/input";
import { Listbox, ListboxLabel, ListboxOption } from "@/components/catalyst-ui/listbox";
import { useState } from "react";

export function Address() {
  const countries: {
    code: string;
    name: string;
  }[] = [
    {
      code: "US",
      name: "United States",
    },
    {
      code: "CA",
      name: "Canada",
    },
    {
      code: "MX",
      name: "Mexico",
    },
  ];
  const [country, setCountry] = useState(countries[0]);

  return (
    <div className="grid grid-cols-2 gap-6">
      <Input
        aria-label="Street Address"
        name="address"
        placeholder="Street Address"
        defaultValue="147 Catalyst Ave"
        className="col-span-2"
      />
      <Input aria-label="City" name="city" placeholder="City" defaultValue="Toronto" className="col-span-2" />

      <Input aria-label="Postal code" name="postal_code" placeholder="Postal Code" defaultValue="A1A 1A1" />
      <Listbox
        aria-label="Country"
        name="country"
        placeholder="Country"
        by="code"
        value={country}
        onChange={(country) => setCountry(country)}
        className="col-span-2"
      >
        {countries.map((country) => (
          <ListboxOption key={country.code} value={country}>
            <ListboxLabel>{country.name}</ListboxLabel>
          </ListboxOption>
        ))}
      </Listbox>
    </div>
  );
}

export class UpdateCustomerCommand {
  constructor(
    public readonly id: string,
    public readonly data: {
      name?: string;
      contactName?: string;
      contactEmail?: string;
      contactPhone?: string;
      address?: string;
      city?: string;
      country?: string;
      stateProvince?: string;
      zipCode?: string;
      paymentTerms?: string;
    },
  ) {}
}

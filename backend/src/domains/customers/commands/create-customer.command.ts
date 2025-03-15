export class CreateCustomerCommand {
  constructor(
    public readonly name: string,
    public readonly contactName: string,
    public readonly contactEmail: string,
    public readonly contactPhone: string,
    public readonly address: string,
    public readonly city: string,
    public readonly country: string,
    public readonly stateProvince: string,
    public readonly zipCode: string,
    public readonly paymentTerms: string,
  ) {}
}

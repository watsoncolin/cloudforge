export interface Customer {
  id: string;
  name: string;
  contact: Contact;
  address: Address;
}

export interface Address {
  street: string;
  city: string;
  province: string;
  postalCode: string;
  country: string;
}

export interface Contact {
  name: string;
  email: string;
  phone: string;
}

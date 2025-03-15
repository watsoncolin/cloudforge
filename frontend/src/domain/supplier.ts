export interface Supplier {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  zip_code: string;
  country: string;
  contact_name: string;
  contact_email: string;
  contact_phone: string;
  payment_terms: string;
  default_currency: string;
  lead_time_days: number;
  preferred_shipping_method: string;
  minimum_order_quantity: number;
  materials_supplied: string[];
  active_status: boolean;
  rating: number;
  created_at: string;
}

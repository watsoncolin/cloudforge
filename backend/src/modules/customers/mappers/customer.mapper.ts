import { CustomerEntity } from '../entities/customer.entity';
import { Customer } from 'src/domain/customer/customer';
// maps from domain to entity
export class CustomerMapper {
  toDomain(entity: CustomerEntity): Customer {
    return {
      id: entity.id,
      name: entity.name,
      contact: {
        name: entity.contactName,
        email: entity.contactEmail,
        phone: entity.contactPhone,
      },
      address: {
        street: entity.address,
        city: entity.city,
        stateProvince: entity.stateProvince,
        postalCode: entity.postalCode,
        country: entity.country,
      },
      paymentTerm: entity.paymentTerm,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }
  toEntity(customer: Customer): CustomerEntity {
    return {
      id: customer.id,
      name: customer.name,
      contactName: customer.contact.name,
      contactEmail: customer.contact.email,
      contactPhone: customer.contact.phone,
      address: customer.address.street,
      city: customer.address.city,
      stateProvince: customer.address.stateProvince,
      postalCode: customer.address.postalCode,
      country: customer.address.country,
      paymentTerm: customer.paymentTerm,
      createdAt: customer.createdAt,
      updatedAt: customer.updatedAt,
    };
  }
}

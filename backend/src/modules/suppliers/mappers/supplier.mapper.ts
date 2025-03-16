import { Supplier } from 'src/domain/supplier/supplier';
import { SupplierEntity } from '../entities/supplier.entity';

// maps from domain to entity
export class SupplierMapper {
  toDomain(entity: SupplierEntity): Supplier {
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
      isActive: entity.isActive,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      materials: entity.materials,
    };
  }
  toEntity(supplier: Supplier): SupplierEntity {
    return {
      id: supplier.id,
      name: supplier.name,
      contactName: supplier.contact.name,
      contactEmail: supplier.contact.email,
      contactPhone: supplier.contact.phone,
      address: supplier.address.street,
      city: supplier.address.city,
      stateProvince: supplier.address.stateProvince,
      postalCode: supplier.address.postalCode,
      country: supplier.address.country,
      paymentTerm: supplier.paymentTerm,
      isActive: supplier.isActive,
      createdAt: supplier.createdAt,
      updatedAt: supplier.updatedAt,
      materials: supplier.materials,
    };
  }
}

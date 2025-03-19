/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseHttpRequest } from './core/BaseHttpRequest';
import type { OpenAPIConfig } from './core/OpenAPI';
import { FetchHttpRequest } from './core/FetchHttpRequest';
import { AuthService } from './services/AuthService';
import { CustomersService } from './services/CustomersService';
import { InventoryService } from './services/InventoryService';
import { OrdersService } from './services/OrdersService';
import { PurchaseOrdersService } from './services/PurchaseOrdersService';
import { QuotesService } from './services/QuotesService';
import { RfQsService } from './services/RfQsService';
import { SuppliersService } from './services/SuppliersService';
type HttpRequestConstructor = new (config: OpenAPIConfig) => BaseHttpRequest;
export class ApiClient {
  public readonly auth: AuthService;
  public readonly customers: CustomersService;
  public readonly inventory: InventoryService;
  public readonly orders: OrdersService;
  public readonly purchaseOrders: PurchaseOrdersService;
  public readonly quotes: QuotesService;
  public readonly rfQs: RfQsService;
  public readonly suppliers: SuppliersService;
  public readonly request: BaseHttpRequest;
  constructor(config?: Partial<OpenAPIConfig>, HttpRequest: HttpRequestConstructor = FetchHttpRequest) {
    this.request = new HttpRequest({
      BASE: config?.BASE ?? 'http://localhost:3001',
      VERSION: config?.VERSION ?? '1.0',
      WITH_CREDENTIALS: config?.WITH_CREDENTIALS ?? false,
      CREDENTIALS: config?.CREDENTIALS ?? 'include',
      TOKEN: config?.TOKEN,
      USERNAME: config?.USERNAME,
      PASSWORD: config?.PASSWORD,
      HEADERS: config?.HEADERS,
      ENCODE_PATH: config?.ENCODE_PATH,
    });
    this.auth = new AuthService(this.request);
    this.customers = new CustomersService(this.request);
    this.inventory = new InventoryService(this.request);
    this.orders = new OrdersService(this.request);
    this.purchaseOrders = new PurchaseOrdersService(this.request);
    this.quotes = new QuotesService(this.request);
    this.rfQs = new RfQsService(this.request);
    this.suppliers = new SuppliersService(this.request);
  }
}


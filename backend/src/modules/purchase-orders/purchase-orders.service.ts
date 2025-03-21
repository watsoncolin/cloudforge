import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreatePurchaseOrderDto } from './dto/create-purchase-order.dto';
import { PurchaseOrder } from 'src/domain/purchase-order/purchase-order';
import { UpdatePurchaseOrderCommand } from './commands/update-purchase-order/update-purchase-order.command';
import { DeletePurchaseOrderCommand } from './commands/delete-purchase-order/delete-purchase-order.command';
import { UpdatePurchaseOrderDto } from './dto/update-purchase-order.dto';
import { GetAllPurchaseOrdersQuery } from './queries/get-all-purchase-orders/get-all-purchase-orders.query';
import { GetPurchaseOrderByIdQuery } from './queries/get-purchase-order-by-id/get-purchase-order-by-id.query';
import { CreatePurchaseOrderCommand } from './commands/create-purchase-order/create-purchase-order.command';
import { ApprovePurchaseOrderCommand } from './commands/approve-purchase-order/approve-purchase-order.command';
import { MarkShippedPurchaseOrderCommand } from './commands/mark-shipped-purchase-order/mark-shipped-purchase-order.command';
import { ReceivedPurchaseOrderCommand } from './commands/received-purchase-order/received-purchase-order.command';
import { ReceivePurchaseOrderDto } from './dto/receive-purchase-order.dto';
@Injectable()
export class PurchaseOrdersService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  create(
    createPurchaseOrderDto: CreatePurchaseOrderDto,
  ): Promise<PurchaseOrder> {
    return this.commandBus.execute(
      new CreatePurchaseOrderCommand(createPurchaseOrderDto),
    );
  }

  findAll(): Promise<PurchaseOrder[]> {
    return this.queryBus.execute(new GetAllPurchaseOrdersQuery());
  }

  findOne(id: string): Promise<PurchaseOrder> {
    return this.queryBus.execute(new GetPurchaseOrderByIdQuery(id));
  }

  update(
    id: string,
    updatePurchaseOrderDto: Partial<UpdatePurchaseOrderDto>,
  ): Promise<PurchaseOrder> {
    return this.commandBus.execute(
      new UpdatePurchaseOrderCommand(id, updatePurchaseOrderDto),
    );
  }

  remove(id: string): Promise<void> {
    return this.commandBus.execute(new DeletePurchaseOrderCommand(id));
  }

  approve(id: string): Promise<PurchaseOrder> {
    return this.commandBus.execute(new ApprovePurchaseOrderCommand(id));
  }

  markShipped(id: string): Promise<PurchaseOrder> {
    return this.commandBus.execute(new MarkShippedPurchaseOrderCommand(id));
  }

  markReceived(
    id: string,
    receivePurchaseOrderDto: ReceivePurchaseOrderDto,
  ): Promise<PurchaseOrder> {
    return this.commandBus.execute(
      new ReceivedPurchaseOrderCommand(id, receivePurchaseOrderDto),
    );
  }
}

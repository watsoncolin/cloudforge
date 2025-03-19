import { Injectable } from '@nestjs/common';
import { ICommand, ofType } from '@nestjs/cqrs';

import { Saga } from '@nestjs/cqrs';
import { map, Observable } from 'rxjs';
import { PurchaseOrderItemReceivedEvent } from 'src/events/purchase-order-item-received.event';
import { AddItemsToInventoryCommand } from './commands/add-items-to-inventory/add-items-to-inventory.command';

@Injectable()
export class PurchaseOrderSaga {
  @Saga()
  onPurchaseOrderReceivedEvent = (
    events$: Observable<any>,
  ): Observable<ICommand> => {
    return events$.pipe(
      ofType(PurchaseOrderItemReceivedEvent),
      map(
        (event) =>
          new AddItemsToInventoryCommand(
            event.purchaseOrderItem,
            event.warehouseLocation,
            event.heatNumber,
            event.millCertUrl,
            event.batchNumber,
          ),
      ),
    );
  };
}

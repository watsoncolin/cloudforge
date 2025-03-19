import { Injectable } from '@nestjs/common';
import { ICommand, ofType } from '@nestjs/cqrs';

import { Saga } from '@nestjs/cqrs';
import { map, Observable } from 'rxjs';
import { InventoryBatchAddedEvent } from 'src/events/inventory-batch-added.event';
import { AddInventoryEventFromBatchCommand } from './commands/add-inventory-event-from-batch/add-inventory-event-from-batch.command';

@Injectable()
export class InventorySaga {
  @Saga()
  onInventoryBatchAddedEvent = (
    events$: Observable<any>,
  ): Observable<ICommand> => {
    return events$.pipe(
      ofType(InventoryBatchAddedEvent),
      map(
        (event) =>
          new AddInventoryEventFromBatchCommand(event.batch, event.inventoryId),
      ),
    );
  };
}

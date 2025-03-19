import { Quote } from 'src/domain/quote/quote';

export class ConvertToOrderCommand {
  constructor(public readonly quote: Quote) {}
}

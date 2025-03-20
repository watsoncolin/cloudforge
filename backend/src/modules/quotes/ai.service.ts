import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Quote } from 'src/domain/quote/quote';
import { GetQuoteByIdQuery } from './queries/get-quote-by-id/get-quote-by-id.query';
import { GetAllQuotesQuery } from './queries/get-all-quotes/get-all-quotes.query';
import { GetAllQuotesForCustomerQuery } from './queries/get-all-quotes-for-customer/get-all-quotes-for-customer.query';
import { ConvertToOrderCommand } from 'src/modules/orders/commands/convert-to-order/convert-to-order.command';
import { Order } from 'src/domain/order/order';
import { QuoteStatus } from 'src/enums';
import { UpdateQuoteStatusCommand } from './commands/update-quote-status/update-quote-status.command';
import { OpenAI } from 'openai';
import { RFQ } from 'src/domain/quote/rfq';
@Injectable()
export class AIService {
  private openai: OpenAI;

  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  async generateQuote(text: string): Promise<Partial<RFQ>> {
    const prompt = `Please analyze the following text and generate a structured RFQ (Request for Quote) object. The RFQ is relevant to the metals industry. The response should be a valid JSON object with the following structure:

{
  "customerId": "string",
  "items": [
    {
      "materialType": "steel" | "steep_coil" | "aluminum" | "copper" | "stainless_steel" | "other",
      "processingType": "hot_rolled" | "cold_rolled" | "hot_rolled_coil" | "cold_rolled_coil" | "hot_rolled_sheet" | "cold_rolled_sheet" | "hot_rolled_plate" | "cold_rolled_plate" | "hot_rolled_bar" | "cold_rolled_bar" | "other",
      "grade": "string",
      "dimensions": {
        "length": number,
        "width": number,
        "thickness": number
      },
      "unitOfMeasure": "string",
      "quantity": number,
      "price": number,
      "total": number
    }
  ],
  "status": "PENDING",
  "source": "AI",
  "notes": "string"
}

Please extract the relevant information from the following text and format it according to the structure above. If any information is missing, omit it or set it to null. The response should be a valid JSON object only, with no additional text.

Text to analyze:
${text}`;

    const response = await this.openai.chat.completions.create({
      model: 'gpt-4-turbo-preview',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.3,
      response_format: { type: 'json_object' },
    });

    const rfq = JSON.parse(response.choices[0].message.content);
    return rfq;
  }
}

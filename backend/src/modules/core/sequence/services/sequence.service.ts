import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SequenceEntity } from '../entities/sequence.entity';

@Injectable()
export class SequenceService {
  constructor(
    @InjectRepository(SequenceEntity)
    private readonly sequenceRepository: Repository<SequenceEntity>,
  ) {}

  async getNextSequenceNumber(prefix: string): Promise<string> {
    const currentYear = new Date().getFullYear();

    // Find or create sequence for current year
    let sequence = await this.sequenceRepository.findOne({
      where: { name: prefix, year: currentYear },
    });

    if (!sequence) {
      sequence = await this.sequenceRepository.save({
        name: prefix,
        year: currentYear,
        currentValue: 0,
      });
    }

    // Increment sequence
    sequence.currentValue += 1;
    await this.sequenceRepository.save(sequence);

    // Format: PREFIX-YYYY-XXXX (e.g., PO-2024-0001)
    return `${prefix}-${currentYear}-${sequence.currentValue.toString().padStart(4, '0')}`;
  }
}

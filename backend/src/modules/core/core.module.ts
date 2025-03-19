import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SequenceService } from './sequence/services/sequence.service';
import { SequenceEntity } from './sequence/entities/sequence.entity';

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([SequenceEntity])],
  providers: [SequenceService],
  exports: [SequenceService],
})
export class CoreModule {}

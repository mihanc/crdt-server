import { Module } from '@nestjs/common';
import { YjsGateway } from '../../gateways/yjs.gateway';
import { EventsService } from './services/events.service';
import { DbModule } from '../db.module';
import { RoomsService } from '../rooms/services/rooms.service';

@Module({
  imports: [DbModule],
  providers: [YjsGateway, EventsService, RoomsService],
  exports: [EventsService],
})
export class EventsModule {}

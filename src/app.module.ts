import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventsModule } from './modules/events/events.module';
import { MongooseModule } from '@nestjs/mongoose';
import { RoomsModule } from './modules/rooms/rooms.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/', {
      dbName: 'crdt',
    }),
    EventsModule,
    RoomsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

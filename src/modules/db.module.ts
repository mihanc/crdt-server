import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Room, RoomSchema } from '../schemas/room.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Room.name, schema: RoomSchema }]),
  ],
  exports: [
    MongooseModule.forFeature([{ name: Room.name, schema: RoomSchema }]),
  ],
})
export class DbModule {}

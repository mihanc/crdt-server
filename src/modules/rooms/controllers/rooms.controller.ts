import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateRoom, GetRoom } from '../interface/root.interface';
import { RoomsService } from '../services/rooms.service';
import { Room } from '../../../schemas/room.schema';

@Controller('rooms')
export class RoomsController {
  constructor(private readonly roomService: RoomsService) {}

  @Post()
  public create(@Body() body: CreateRoom): Promise<Room> {
    return this.roomService.create(body);
  }

  @Get(':id')
  public getRoom(@Param() param: GetRoom): Promise<Room> {
    return this.roomService.getRoom(param);
  }

  @Get()
  public getRooms(): Promise<Room[]> {
    return this.roomService.getRooms();
  }
}

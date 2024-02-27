import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Room } from '../../../schemas/room.schema';
import { CreateRoom, GetRoom, UpdateRoom } from '../interface/root.interface';

@Injectable()
export class RoomsService {
  constructor(@InjectModel(Room.name) private roomModel: Model<Room>) {}

  async create(body: CreateRoom): Promise<Room> {
    const createdRoom = new this.roomModel(body);
    return await createdRoom.save();
  }

  async getRoom(param: GetRoom): Promise<Room> {
    return this.roomModel.findOne({ _id: param.id });
  }

  async getRooms(): Promise<Room[]> {
    return this.roomModel.find();
  }

  async updateRoom(param: UpdateRoom): Promise<void> {
    await this.roomModel.findOneAndUpdate(
      { name: param.name },
      {
        name: param.name,
        yDoc: param.yDoc,
      },
      { new: true },
    );
  }
}

import { Injectable, OnModuleInit } from '@nestjs/common';
import * as Y from 'yjs';
import { setPersistence } from 'y-websocket/bin/utils';
import { RoomsService } from '../../rooms/services/rooms.service';
import { throttle } from '../../../utils/throttle';

@Injectable()
export class EventsService implements OnModuleInit {
  constructor(private readonly roomsService: RoomsService) {}

  public onModuleInit() {
    this.init();
  }

  private init(): void {
    setPersistence({
      bindState: async (docName: string, ydoc: Y.Doc) => {
        const updateHandler = async (update, origin, doc, transaction) => {
          if (origin !== this) {
            //ToDo: Figure out how to prevent cursor event from firing
            const isCursor = [...transaction.changed].some(
              (ch: Map<any, Set<string>>) => {
                return ch[1].has('user-cursor');
              },
            );
            if (!isCursor) {
              await this.roomsService.updateRoom({
                name: docName,
                yDoc: Y.encodeStateAsUpdate(ydoc),
              });
            }
          }
        };
        const throttledUpdateHandler = throttle(updateHandler, 1000);
        ydoc.on('update', throttledUpdateHandler);
      },
      writeState: async (docName: string, ydoc: Y.Doc) => {
        await this.roomsService.updateRoom({
          name: docName,
          yDoc: Y.encodeStateAsUpdate(ydoc),
        });
        return new Promise((resolve) => {
          console.log(`${docName} granularity deleted`);
          resolve('');
        });
      },
    });
  }
}

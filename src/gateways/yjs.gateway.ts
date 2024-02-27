import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Request } from 'express';
import { Server } from 'ws';
import { docs, setupWSConnection } from 'y-websocket/bin/utils';

@WebSocketGateway({ path: '/yjs' })
export class YjsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  public handleConnection(connection: WebSocket, request: Request): void {
    const fullUrl = new URL(request.url, `http://${request.headers.host}`);
    const docName = fullUrl.searchParams.get('roomId');

    // We can handle authentication of user like below
    // const token = getCookie(request?.headers?.cookie, 'auth_token');
    // const ERROR_CODE_WEBSOCKET_AUTH_FAILED = 4000;
    // if (!token) {
    //   connection.close(ERROR_CODE_WEBSOCKET_AUTH_FAILED);
    // } else {
    //   const signedJwt = this.authService.verifyToken(token);
    //   if (!signedJwt) connection.close(ERROR_CODE_WEBSOCKET_AUTH_FAILED);
    //   else {
    //     const docName = getCookie(request?.headers?.cookie, 'roomName');
    //     setupWSConnection(connection, request, { ...(docName && { docName }) });
    //   }
    // }

    setupWSConnection(connection, request, { ...(docName && { docName }) });
  }

  public handleDisconnect(): void {
    console.log('ws disconnected');
  }
}

setInterval(() => {
  let conns = 0;
  docs.forEach((doc) => {
    conns += doc.conns.size;
  });
  console.log({ conns, docs: docs.size });
}, 5000);

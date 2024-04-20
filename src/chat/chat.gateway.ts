import { WebSocketGateway, SubscribeMessage, MessageBody, OnGatewayDisconnect, OnGatewayConnection, WebSocketServer, OnGatewayInit } from '@nestjs/websockets';
import { ChatService } from './chat.service';
import { Server, Socket } from 'socket.io';
import { MessageDto } from './dto/message.dto';

@WebSocketGateway()
export class ChatGateway implements OnGatewayInit,  OnGatewayConnection, OnGatewayDisconnect{
  @WebSocketServer() server: Server;
  constructor(private readonly chatService: ChatService) {}

  handleConnection(client: Socket, ...args: any[]) {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }
 
  afterInit(server: Server) {
    console.log(`WebSocket server initialized`);
    //Выполняем действия
  }
  

  @SubscribeMessage('sendMessage')
  async handleSendMessage(client: Socket, messageDto: MessageDto) {
    const msg = await this.chatService.createMessage(messageDto);
    this.server.emit('newMessage', msg);
  }
}

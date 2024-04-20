
import { OnModuleInit } from '@nestjs/common';
import { ChatService } from './chat.service';
import { MessageDto } from './dto/message.dto';
import { WebSocket } from 'ws';

export class ChatGateway implements OnModuleInit {
  constructor(private readonly chatService: ChatService) { }

  onModuleInit() {
    const server = new WebSocket.Server({ port: 3000 });
    let clients = [];

    server.on('connection', function connection(client) {
      console.log('Новое соединение установлено');

      client.on('message', async (message) => {
        const messageDto = JSON.parse(message) as MessageDto;

        if (messageDto.onConnect) {
          clients.push({ clientId: messageDto.sender_id, clientHandle: client })
          client.send("Успешно подконнектился");
          return;
        }

        const current = clients.find(c => c.clientId == messageDto.receiver_id);

        if (current && !current.onConnect)
          current.clientHandle.send(messageDto.text);
      });

      client.on('close', () => {
        const c = clients.find(c => c.clientHandle == client);

        if (c)
          clients.splice(clients.indexOf(c), 1);
      });
    });
  }
}

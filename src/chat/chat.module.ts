import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatGateway } from './chat.gateway';
import { messageProvider } from './providers/message.provider';

@Module({
  providers: [ChatGateway, ChatService, ...messageProvider],
})
export class ChatModule {}

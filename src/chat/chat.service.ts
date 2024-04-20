import { Inject, Injectable } from '@nestjs/common';
import { Message } from './entities/chat.entity';
import constants from 'src/common/constants';
import { MessageDto } from './dto/message.dto';


@Injectable()
export class ChatService {
  constructor(
      @Inject(constants.MESSAGES_REPOSITORY)
      private messagesRepository: typeof Message,
  
  ) {}

  async createMessage(messageDto: MessageDto): Promise<Message> {
    const message = new this.messagesRepository({
   ...messageDto});
    return message.save();
  }

  async getMessages(): Promise<Message[]> {
    return this.messagesRepository.findAll();
  }
}

import CreateUserDto from "src/user/dto/create-user.dto";
import QueueUser from "./models/queue-user.model";
import * as crypto from 'crypto'
import { EmailWorker } from "./smtp";

let confirmationQueue: QueueUser[] = [];

function generateRandom() {
  return Math.floor(Math.random() * 900000 + 100000);
}

export async function createConfirmationUser(user: CreateUserDto): Promise<boolean> {
  try {
    const code = generateRandom().toString();
    const u = crypto.createHash('sha1').update(user.email).digest('hex');
    const c = crypto.createHash('sha1').update(code).digest('hex');
    const checkSum = u + c;
    await new EmailWorker().sendEmail(user.email, u, c);
    confirmationQueue.push({ checkSum, UserData: user });

    return true;
  } catch {
    return false;
  }
}

export function checkConfirm(u, c) {
  const queueUser = confirmationQueue.find(qu => qu.checkSum == u + c);

  if (queueUser)
    confirmationQueue = confirmationQueue.filter(qu => qu.checkSum != u + c);

  return queueUser;
}
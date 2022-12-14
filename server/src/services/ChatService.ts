import { PrivateMessage } from '../models/PrivateMessage'
import { HttpException } from '../utils/HttpException'

interface ServiceResult {
  error?: HttpException
  messages?: Message[]
}

interface Message {
  messageText: string,
  senderUsername: string,
  time: string,
}


export class ChatService {
  static calculateChatRoomId(usernameA: string, usernameB: string): string {
    if (usernameA < usernameB) {
      return usernameA + usernameB
    } else {
      return usernameB + usernameA
    }
  }

  getMessages = async (username: string, friendUsername: string): Promise<ServiceResult> => {
    try {
      const chatRoomId = ChatService.calculateChatRoomId(username, friendUsername)
      const rawMessages = await PrivateMessage.find({
        chatRoomId: chatRoomId
      })

      // console.log(rawMessages)

      // const processedMessages = rawMessages.map((rawMessage, index) => {
      //   return {
      //     "messageText": rawMessage.message,
      //     "senderUsername": rawMessage.senderUsername
      //   }
      // })

      return {
        messages: rawMessages
      }
    } catch (err) {
      return {
        error: new HttpException(500, 'Access Database Error')
      }
    }


  }

  sendMessages = async (username: string, friendUsername: string, message: Message): Promise<ServiceResult> => {
    try {
      const chatRoomId = ChatService.calculateChatRoomId(username, friendUsername)
      const privateMessage = new PrivateMessage({
        chatRoomId: chatRoomId,
        messageText: message.messageText,
        senderUsername: message.senderUsername,
        time: message.time
      })

      console.log(privateMessage)
      privateMessage.save()
      // TODO: check return type
      return {}

    } catch (err) {
      return {
        error: new HttpException(500, 'Access Database Error')
      }
    }
  }
}

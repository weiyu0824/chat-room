import { Router, Response, Request, NextFunction } from 'express'
import { Controller } from '../interfaces/Controller'
import { jwtMiddleware } from '../middlewares/JwtMiddleware'
import { ChatService } from '../services/ChatService'
import { InvalidAPIError } from '../utils/HttpException'



const chatService = new ChatService()

export class ChatController implements Controller {
  public path = '/chat'
  public router = Router()

  constructor() {
    this.initRouter()
  }
  private initRouter() {
    this.router.get('/:friendUsername', jwtMiddleware, this.getPrivateMessage)
    this.router.post('/private', jwtMiddleware, this.sendPrivateMessage)
    this.router.post('/group')
  }

  getPrivateMessage = async (req: Request, res: Response, next: NextFunction) => {
    // get token and page id here
    const username = req.body.verifiedName
    const friendUsername = req.params.friendUsername
    if (friendUsername === undefined){
      next(new InvalidAPIError())
    } else {
      console.log(username)
      console.log(friendUsername)
      const serviceResult = await chatService.getMessages(username, friendUsername)

      if (!serviceResult.error) {
        res.send(serviceResult)
      } else {
        next(serviceResult.error)
      }
    }
  }

  sendPrivateMessage = async (req: Request, res: Response, next: NextFunction) => {
    console.log("Send private message")
    const username = req.body.verifiedName
    const friendUsername = req.body.friendUsername
    const message = req.body.message

    const serviceResult = await chatService.sendMessages(username, friendUsername, message)

    if (!serviceResult.error) {
      res.send(serviceResult)
    } else {
      next(serviceResult.error)
    }
  
  }
}

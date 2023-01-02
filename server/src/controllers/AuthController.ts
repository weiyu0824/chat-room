import { Router, Response, Request, NextFunction } from 'express'
import { Controller } from '../interfaces/Controller'
import { AuthService } from '../services/AuthService'
import { validateToken, refreshMiddleware } from '../middlewares/TokenValidation'
import App from '../App'

const authService = new AuthService()

export class AuthController implements Controller {
  public path = '/auth'
  public router = Router()

  constructor() {
    this.initRouter()
  }

  private initRouter() {
    this.router.post('/login', this.login)
    this.router.post('/register', this.register)
    this.router.delete('/logout', validateToken, this.logout)
    this.router.get('/refresh', refreshMiddleware, this.refresh)
  }

  private login = async (req: Request, res: Response, next: NextFunction) => {
    const email = req.body.email
    const password = req.body.password
    console.log('login', email, password)

    const serviceResult = await authService.login(email, password)

    if (!serviceResult.error) {
      // res.cookie('access_token', 'Bearer ' + serviceResult.accessToken)
      // res.cookie('refresh_token', 'Bearer ' + serviceResult.refreshToken)
      res.send(serviceResult)
    } else {
      next(serviceResult.error)
    }
  }

  private register = async (req: Request, res: Response, next: NextFunction) => {
    const email: string = req.body.email
    const name: string = req.body.name
    const username: string = req.body.username
    const password: string = req.body.password
    console.log('register', email, name, username, password)

    const serviceResult = await authService.register(email, name, username, password)

    if (!serviceResult.error) {
      res.send(serviceResult)
    } else {
      next(serviceResult.error)
    }
  }

  private logout = (req: Request, res: Response, next: NextFunction) => {
    const verifiedName: string = req.body.verifiedName
    console.log('logout', verifiedName)

    const serviceResult = authService.logout(verifiedName)
    if (!serviceResult.error) {
      res.send(serviceResult)
    } else {
      next(serviceResult.error)
    }
  }

  private refresh = (req: Request, res: Response, next: NextFunction) => {
    const verifiedName: string = req.body.verifiedName
    const serviceResult = authService.refresh(verifiedName)
    console.log(serviceResult)
    if (!serviceResult.error) {
      res.send(serviceResult)
    } else {
      next(serviceResult.error)
    }
  }

}

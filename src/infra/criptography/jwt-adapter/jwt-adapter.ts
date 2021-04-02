import { Encrypter } from '../../../data/protocols/criptography/encrypter'
import jwt from 'jsonwebtoken'
import { Decrypter } from '../../../data/protocols/criptography/decrypter'

export class JwtAdapter implements Encrypter, Decrypter {
  constructor (private readonly secret: string) { }

  async encrypt (value: any): Promise<string> {
    const accessToken = jwt.sign({ id: value }, this.secret)

    return await new Promise(resolve => resolve(accessToken))
  }

  async decrypt (token: any): Promise<string> {
    const value: any = await jwt.verify(token, this.secret)
    return value
  }
}

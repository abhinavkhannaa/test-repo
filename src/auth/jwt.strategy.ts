import { Injectable,UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import {ExtractJwt, Strategy} from 'passport-jwt';
import { AuthService } from "./auth.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
constructor (private readonly authService : AuthService) {
    super({
        jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: 'SeCrEt',
    });

}
  async validate(payload: any){
    const user = await this.authService.validateUser(payload.username, payload.password);
    if(!user){
        throw new UnauthorizedException();
    }
    return user;
  }
}
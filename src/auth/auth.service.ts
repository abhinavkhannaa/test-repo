import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService{
    private readonly users =[];
    constructor(private readonly jwtService: JwtService) {}

    async createUser(username: string, password:string ): Promise <void>{
        const hashedPassword = await bcrypt.hash(password,10);
        this.users.push({username,password:hashedPassword});
    }

    async validateUser(username: string, password: string): Promise<any> {
        const user = this.users.find((u) => u.username === username);
        if (user && await bcrypt.compare(password, user.password)) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }
    

    async login(user : any) : Promise<{access_token:string , user_data : any}>{
        const payload = {user: user.username , sub: user.id};
        return {
            access_token : this.jwtService.sign(payload),
            user_data : payload
            
        };
    }
}
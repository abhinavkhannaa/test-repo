import { Controller,Get,Put,Post,Delete,Body,Param,UseGuards,Req
 } from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport';
 import { AuthService } from 'src/auth/auth.service';

@Controller('users')
export class UsersController {
    constructor(private authService: AuthService) {}
    private users =[];


    @Post('signup')
    async userSignUp(@Body() newUser : {username:string,password:string}){
        try{
        await this.authService.createUser(newUser.username, newUser.password);
        const user = await this.authService.validateUser(newUser.username,newUser.password);
        if(!user){
            return {message : 'Unable to sign up , user one  '}
        }
        const details = await this.authService.login(user);
        return {details};
    }catch(error){
        console.error('Error occurred during user signup:', error);
        return { message: 'Unable to sign up' };
    }
    }
    @Post()
    @UseGuards(AuthGuard('jwt'))
    createUser(@Body() user){ 
        this.users.push(user);
        return user;
    }
    @Get(':id')
    @UseGuards(AuthGuard('jwt'))
    getUser(@Param('id') id){
        return this.users.find(user=>user.id === id);
    }

    @Put(':id')
    @UseGuards(AuthGuard('jwt'))
    updateUser(@Param('id') id, @Body() user){
            const index = this.users.findIndex(u =>u.id === id);
            if(index !== -1){
                this.users[index] = user;
                return user;
            }
            return 'User not found';
    }

    @Delete(':id')
    @UseGuards(AuthGuard('jwt'))
    deleteUser(@Param('id') id){
        this.users = this.users.filter(user => user.id !== id);
        return 'User deleted successfully';
    }

}

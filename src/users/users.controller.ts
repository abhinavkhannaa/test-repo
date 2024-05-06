import { Controller,Get,Put,Post,Delete,Body,Param } from '@nestjs/common';

@Controller('users')
export class UsersController {
    private users =[];

    @Post()
    createUser(@Body() user){ 
        this.users.push(user);
        return user;
    }
    @Get(':id')
    getUser(@Param('id') id){
        return this.users.find(user=>user.id === id);
    }

    @Put(':id')
    updateUser(@Param('id') id, @Body() user){
            const index = this.users.findIndex(u =>u.id === id);
            if(index !== -1){
                this.users[index] = user;
                return user;
            }
            return 'User not found';
    }

    @Delete(':id')
    deleteUser(@Param('id') id){
        this.users = this.users.filter(user => user.id !== id);
        return 'User deleted successfully';
    }

}

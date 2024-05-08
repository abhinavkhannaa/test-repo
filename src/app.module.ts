import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersController } from './users/users.controller';
import { AuthService } from './auth/auth.service';
import { JwtStrategy } from './auth/jwt.strategy';

@Module({
  imports: [
    JwtModule.register({
      secret: 'SeCrEt', // You can replace this with your actual secret key
      signOptions: { expiresIn: '1h' }, // You can adjust the expiration time
    }),
  ],
  controllers: [AppController, UsersController],
  providers: [AppService, AuthService,JwtStrategy],
})
export class AppModule {}
